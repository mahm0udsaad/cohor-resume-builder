import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

// Verify PayMob webhook signature
function verifyWebhookSignature(hmac, body) {
  const crypto = require("crypto");
  const calculatedHmac = crypto
    .createHmac("sha512", process.env.PAYMOB_HMAC_SECRET)
    .update(body)
    .digest("hex");
  return hmac === calculatedHmac;
}

// Get plan duration in days
function getPlanDuration(plan) {
  switch (plan) {
    case "pro":
      return 30; // 1 month
    case "proPlus":
      return 30; // 1 month
    default:
      return 0;
  }
}

// Convert amount_cents to plan type
function getPlanFromAmount(amountCents) {
  switch (amountCents) {
    case 999: // $9.99
      return "pro";
    case 1999: // $19.99
      return "proPlus";
    default:
      return "free";
  }
}

export async function POST(req) {
  try {
    // Verify webhook signature
    const hmacHeader = headers().get("hmac");
    if (!hmacHeader) {
      return NextResponse.json(
        { error: "Missing HMAC signature" },
        { status: 401 },
      );
    }

    const body = await req.text();
    if (!verifyWebhookSignature(hmacHeader, body)) {
      return NextResponse.json(
        { error: "Invalid HMAC signature" },
        { status: 401 },
      );
    }

    const webhookData = JSON.parse(body);
    const { type, obj } = webhookData;

    // Only process successful transactions
    if (type !== "TRANSACTION" || !obj.success) {
      return NextResponse.json(
        { message: "Skipped non-successful transaction" },
        { status: 200 },
      );
    }

    const {
      amount_cents,
      order,
      payment_key_claims: { billing_data },
      created_at,
      id: transactionId,
    } = obj;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: billing_data.email },
    });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const plan = getPlanFromAmount(amount_cents);
    const planDuration = getPlanDuration(plan);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + planDuration);
    console.log(plan);
    // Create subscription record
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        transactionId: transactionId.toString(),
        orderId: order.id.toString(),
        amount: amount_cents / 100, // Convert cents to dollars
        status: "active",
        paymentDate: new Date(created_at),
        plan,
        endDate,
        features:
          plan === "proPlus"
            ? [
                "Advanced Themes",
                "100+ Templates",
                "AI Suggestions",
                "No Watermark",
              ]
            : ["Advanced Themes", "50+ Templates", "No Watermark"],
      },
    });
    console.log(subscription);
    // Update user's plan and expiry date
    await prisma.user.update({
      where: { id: user.id },
      data: {
        plan,
        planExpiryDate: endDate,
      },
    });

    return NextResponse.json(
      {
        message: "Subscription processed successfully",
        subscriptionId: subscription.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
