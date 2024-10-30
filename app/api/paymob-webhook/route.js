import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

// Subscription plan configurations
const SUBSCRIPTION_PLANS = {
  PRO: {
    amountCents: 999,
    name: "pro",
    durationDays: 30,
    features: ["Advanced Themes", "50+ Templates", "No Watermark"],
  },
  PRO_PLUS: {
    amountCents: 1999,
    name: "proPlus",
    durationDays: 30,
    features: [
      "Advanced Themes",
      "100+ Templates",
      "AI Suggestions",
      "No Watermark",
    ],
  },
};

// Helper to get plan by amount
const getPlanByAmount = (amountCents) => {
  return Object.values(SUBSCRIPTION_PLANS).find(
    (plan) => plan.amountCents === amountCents,
  );
};

// Helper function to validate billing data
const validateBillingData = (billingData) => {
  const requiredFields = ["email", "first_name", "last_name", "phone_number"];

  return requiredFields.every((field) => billingData?.[field]);
};

// Helper function to verify HMAC signature
const verifySignature = (rawBody, signature) => {
  // Ensure PAYMOB_HMAC_SECRET is available
  if (!process.env.PAYMOB_HMAC_SECRET) {
    throw new Error("PAYMOB_HMAC_SECRET not configured");
  }

  // Parse and stringify the JSON body to ensure consistent formatting
  const normalizedBody = JSON.stringify(JSON.parse(rawBody.trim()));

  // Calculate HMAC using the secret and normalized body
  const calculatedHmac = crypto
    .createHmac("sha512", process.env.PAYMOB_HMAC_SECRET.trim())
    .update(normalizedBody)
    .digest("hex");

  // Compare the calculated HMAC with the received HMAC securely
  return crypto.timingSafeEqual(
    Buffer.from(signature.toLowerCase()),
    Buffer.from(calculatedHmac.toLowerCase()),
  );
};

// Helper to validate transaction data
const validateTransaction = (transaction) => {
  return (
    transaction.success === true &&
    !transaction.is_refunded &&
    !transaction.is_void &&
    !transaction.error_occured &&
    transaction.currency === "EGP"
  );
};

// Helper to get readable payment method
const getPaymentMethod = (sourceData) => {
  if (!sourceData) return "unknown";
  return `${sourceData.type || "unknown"}-${sourceData.sub_type || "unknown"}`;
};

// Helper to format transaction metadata
const formatTransactionMetadata = (order, sourceData, transactionData) => {
  return {
    merchantOrderId: order.merchant_order_id,
    paymentType: sourceData?.type,
    cardSubType: sourceData?.sub_type,
    cardLastFourDigits: sourceData?.pan,
    transactionNo: transactionData?.transaction_no,
    receiptNo: transactionData?.receipt_no,
    authorizationCode: transactionData?.authorize_id,
    acsEci: transactionData?.acs_eci,
    cardType: transactionData?.card_type,
  };
};

export async function POST(req) {
  try {
    // Get HMAC from URL
    const { searchParams } = new URL(req.url);
    const hmacSignature = searchParams.get("hmac");

    if (!hmacSignature) {
      return NextResponse.json(
        { error: "Missing HMAC signature" },
        { status: 401 },
      );
    }

    // Get raw body
    const rawBody = await req.text();

    // Verify signature
    if (!verifySignature(rawBody, hmacSignature)) {
      return NextResponse.json(
        { error: "Invalid HMAC signature" },
        { status: 401 },
      );
    }

    // Parse webhook data
    const webhookData = JSON.parse(rawBody);
    const { type, obj } = webhookData;

    // Log webhook data for debugging
    console.log("Received webhook data:", {
      type,
      transactionId: obj?.id,
      amount: obj?.amount_cents,
      success: obj?.success,
      email: obj?.payment_key_claims?.billing_data?.email,
    });

    // Validate webhook type
    if (type !== "TRANSACTION") {
      return NextResponse.json(
        { error: "Unsupported webhook type" },
        { status: 400 },
      );
    }

    // Extract relevant data
    const {
      id: transactionId,
      amount_cents,
      success,
      order,
      payment_key_claims,
      created_at,
      source_data,
      data: transactionData,
    } = obj;

    // Validate transaction
    if (!validateTransaction(obj)) {
      return NextResponse.json(
        {
          message: "Transaction validation failed",
          details: {
            success: obj.success,
            is_refunded: obj.is_refunded,
            is_void: obj.is_void,
            error_occured: obj.error_occured,
          },
        },
        { status: 200 },
      );
    }

    // Validate billing data
    if (!validateBillingData(payment_key_claims?.billing_data)) {
      return NextResponse.json(
        { error: "Invalid billing data" },
        { status: 400 },
      );
    }

    // Get subscription plan
    const plan = getPlanByAmount(amount_cents);
    if (!plan) {
      return NextResponse.json(
        {
          error: "Invalid subscription amount",
          details: {
            receivedAmount: amount_cents,
            availablePlans: Object.values(SUBSCRIPTION_PLANS).map((p) => ({
              name: p.name,
              amount: p.amountCents,
            })),
          },
        },
        { status: 400 },
      );
    }

    // Get user email from billing data
    const { email } = payment_key_claims.billing_data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found", email },
        { status: 404 },
      );
    }

    // Calculate subscription end date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    // Process subscription in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create payment record
      const payment = await tx.payment.create({
        data: {
          userId: user.id,
          transactionId: transactionId.toString(),
          orderId: order.id.toString(),
          amount: amount_cents / 100,
          currency: obj.currency,
          paymentMethod: getPaymentMethod(source_data),
          status: "completed",
          paymentDate: new Date(created_at),
          metadata: formatTransactionMetadata(
            order,
            source_data,
            transactionData,
          ),
        },
      });

      // Create subscription record
      const subscription = await tx.subscription.create({
        data: {
          userId: user.id,
          paymentId: payment.id,
          plan: plan.name,
          status: "active",
          startDate: new Date(),
          endDate,
          features: plan.features,
          metadata: {
            paymentAmount: amount_cents / 100,
            planType: plan.name,
            durationDays: plan.durationDays,
          },
        },
      });

      // Update user's plan
      await tx.user.update({
        where: { id: user.id },
        data: {
          plan: plan.name,
          planExpiryDate: endDate,
        },
      });

      return { payment, subscription };
    });

    // Return success response
    return NextResponse.json(
      {
        status: "success",
        message: "Payment processed successfully",
        data: {
          paymentId: result.payment.id,
          subscriptionId: result.subscription.id,
          plan: plan.name,
          features: plan.features,
          expiryDate: endDate,
          amount: amount_cents / 100,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PayMob webhook error:", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
