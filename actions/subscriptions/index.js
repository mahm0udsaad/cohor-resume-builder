"use server";
import prisma from "@/lib/prisma";

export async function getUserSubscription(email) {
  try {
    // First find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        subscriptions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!user) {
      return null;
    }

    const subscription = user.subscriptions[0];

    if (!subscription) {
      return null;
    }

    return {
      transactionId: subscription.transactionId,
      amount: subscription.amount,
      status: subscription.status,
      paymentDate: subscription.paymentDate,
      plan: subscription.plan,
      endDate: subscription.endDate,
    };
  } catch (error) {
    console.error("Error fetching user's subscription:", error);
    return null;
  }
}

export async function checkSubscriptionStatus(userEmail) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        subscriptions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const currentSubscription = user.subscriptions[0];

    // If no subscription exists
    if (!currentSubscription) {
      return { success: false, error: "No subscription found" };
    }

    // Check if subscription has ended
    if (
      currentSubscription.endDate &&
      currentSubscription.endDate < new Date()
    ) {
      // Update the subscription status to inactive when it has expired
      const updatedSubscription = await prisma.subscription.update({
        where: {
          id: currentSubscription.id,
        },
        data: {
          status: "inActive",
        },
      });

      return {
        success: false,
        error: `Subscription ended on ${currentSubscription.endDate.toLocaleDateString()}`,
        subscription: updatedSubscription,
      };
    }

    // If subscription is active and not ended, return success
    return {
      success: true,
      subscription: currentSubscription,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error checking subscription status");
  }
}
