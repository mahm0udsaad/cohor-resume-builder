import cron from "node-cron";
import prisma from "@/lib/prisma";

// Utility to get PayMob auth token
async function getPayMobAuthToken() {
  try {
    const response = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.PAYMOB_API_KEY,
      }),
    });

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error getting PayMob auth token:", error);
    throw error;
  }
}

// Utility to suspend PayMob subscription
async function suspendPayMobSubscription(subscriptionId, authToken) {
  try {
    const response = await fetch(
      `https://accept.paymob.com/api/acceptance/subscriptions/${subscriptionId}/suspend`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error suspending subscription ${subscriptionId}:`, error);
    throw error;
  }
}

// Main monitoring function
async function monitorInactiveSubscriptions() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    // Get all active subscriptions with their users and resumes
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        status: "active",
      },
      include: {
        user: {
          include: {
            resumes: {
              select: {
                modifiedAt: true,
              },
            },
          },
        },
      },
    });

    const authToken = await getPayMobAuthToken();

    for (const subscription of activeSubscriptions) {
      // Check if user has any resumes modified in the last 30 days
      const hasRecentActivity = subscription.user.resumes.some(
        (resume) => resume.modifiedAt > thirtyDaysAgo,
      );

      if (!hasRecentActivity) {
        // Suspend PayMob subscription
        await suspendPayMobSubscription(subscription.transactionId, authToken);

        // Update subscription status in database
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: "inactive", // Changed from 'suspended' to 'inactive'
            metadataStr: JSON.stringify({
              ...JSON.parse(subscription.metadataStr),
              suspendedAt: new Date().toISOString(),
              suspendReason: "Inactivity for 30 days",
              planStatus: "inactive", // Adding plan status indicator
            }),
          },
        });

        console.log(
          `Suspended subscription ${subscription.id} for user ${subscription.userId} due to inactivity`,
        );
      }
    }

    console.log("Subscription monitoring completed successfully");
    return { success: true, message: "Monitoring completed" };
  } catch (error) {
    console.error("Error in subscription monitoring:", error);
    return { success: false, error: error.message };
  }
}

// Setup cron job to run at midnight every day
export function startSubscriptionMonitor() {
  console.log("Starting subscription monitor cron job...");

  cron.schedule("0 0 * * *", async () => {
    console.log("Running subscription monitoring...", new Date().toISOString());
    try {
      await monitorInactiveSubscriptions();
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
}
