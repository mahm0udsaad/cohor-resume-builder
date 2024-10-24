// app/api/paymob-webhook/route.js
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// Define plan amounts and their corresponding details
const PLAN_AMOUNTS = {
  999: {
    name: "pro",
    period: 30, // days
    features: ["advanced_themes", "no_watermark", "50_templates"],
  },
  1999: {
    name: "proPlus",
    period: 30, // days
    features: ["premium_themes", "ai_suggestions", "100_templates"],
  },
};

export async function POST(req) {
  try {
    const headersList = headers();
    const hmac = headersList.get("hmac");
    const data = await req.json();

    // Verify HMAC
    const calculatedHmac = calculateHmac(data);
    if (hmac !== calculatedHmac) {
      return new Response(JSON.stringify({ error: "Invalid HMAC" }), {
        status: 401,
      });
    }

    const {
      obj: {
        id: transaction_id,
        order: { id: order_id },
        amount_cents,
        success,
        is_refunded,
        has_parent_transaction,
      },
    } = data;

    // Get userId from the order's extra_description
    const userId = data.obj.order.shipping_data.extra_description;

    if (success && !is_refunded && !has_parent_transaction) {
      // Determine the plan based on the amount
      const amountKey = (amount_cents / 100).toString();
      const planDetails = PLAN_AMOUNTS[amountKey];

      if (!planDetails) {
        console.error(
          "Invalid payment amount, no matching plan:",
          amount_cents,
        );
        return new Response(
          JSON.stringify({ status: "error", message: "Invalid plan amount" }),
          {
            status: 200,
          },
        );
      }

      // Calculate subscription end date
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setDate(
        subscriptionEndDate.getDate() + planDetails.period,
      );

      // Begin transaction to update both subscription and user
      await prisma.$transaction(async (tx) => {
        // Create subscription record
        await tx.subscription.create({
          data: {
            userId,
            transactionId: transaction_id.toString(),
            orderId: order_id.toString(),
            amount: amount_cents / 100,
            status: "active",
            paymentDate: new Date(),
            plan: planDetails.name,
            endDate: subscriptionEndDate,
            features: planDetails.features,
          },
        });

        // Update user's plan
        await tx.user.update({
          where: { id: userId },
          data: {
            plan: planDetails.name,
            planExpiryDate: subscriptionEndDate,
          },
        });

        // Optionally, deactivate any previous active subscriptions
        await tx.subscription.updateMany({
          where: {
            userId,
            status: "active",
            transactionId: {
              not: transaction_id.toString(),
            },
          },
          data: {
            status: "inactive",
          },
        });
      });

      // Could add notification logic here
      // await sendSubscriptionConfirmationEmail(userId, planDetails);
    }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 200,
      },
    );
  }
}

function calculateHmac(data) {
  const crypto = require("crypto");
  const secret = process.env.PAYMOB_HMAC_SECRET;
  const dataString = typeof data === "string" ? data : JSON.stringify(data);

  return crypto.createHmac("sha512", secret).update(dataString).digest("hex");
}
