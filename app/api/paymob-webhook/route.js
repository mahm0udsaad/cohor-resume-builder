import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getPlanFromAmount } from "@/actions/resumes/plans";

// Helper function to validate billing data
const validateBillingData = (billingData) => {
  const requiredFields = ["email", "first_name", "last_name", "phone_number"];

  return requiredFields.every((field) => billingData?.[field]);
};

// Helper function to verify HMAC signature
const verifySignature = (rawBody, signature) => {
  if (!process.env.PAYMOB_HMAC_SECRET) {
    throw new Error("PAYMOB_HMAC_SECRET not configured");
  }

  try {
    const data = JSON.parse(rawBody);
    const obj = data.obj;
    const hmacString = [
      obj.amount_cents, // "1199"
      obj.created_at, // "2024-11-25T13:44:11.820913+03:00"
      obj.currency, // "SAR"
      obj.error_occured, // true
      obj.has_parent_transaction, // false
      obj.id, // "37645"
      obj.integration_id, // "7140"
      obj.is_3d_secure, // false
      obj.is_auth, // false
      obj.is_capture, // false
      obj.is_refunded, // false
      obj.is_standalone_payment, // true
      obj.is_voided, // false
      obj.order.id, // "67601"
      obj.owner, // "5311"
      obj.pending, // false
      obj.source_data?.pan || "", // "2346"
      obj.source_data?.sub_type || "", // "MasterCard"
      obj.source_data?.type || "", // "card"
      obj.success, // false
    ].join("");

    // Fixed HMAC string construction
    const fixedHmacString = [
      obj.amount_cents,
      obj.created_at,
      obj.currency,
      obj.error_occured.toString(), // Convert boolean to string
      obj.has_parent_transaction.toString(), // Convert boolean to string
      obj.id,
      obj.integration_id,
      obj.is_3d_secure.toString(), // Convert boolean to string
      obj.is_auth.toString(), // Convert boolean to string
      obj.is_capture.toString(), // Convert boolean to string
      obj.is_refunded.toString(), // Convert boolean to string
      obj.is_standalone_payment.toString(), // Convert boolean to string
      obj.is_voided.toString(), // Convert boolean to string
      obj.order.id,
      obj.owner,
      obj.pending.toString(), // Convert boolean to string
      obj.source_data?.pan || "",
      obj.source_data?.sub_type || "",
      obj.source_data?.type || "",
      obj.success.toString(), // Convert boolean to string
    ].join("");

    const calculatedHmac = crypto
      .createHmac("sha512", process.env.PAYMOB_HMAC_SECRET)
      .update(fixedHmacString)
      .digest("hex");

    console.log("HMAC Debug:", {
      receivedHmac: signature,
      calculatedHmac: calculatedHmac,
      stringLength: hmacString.length,
    });

    return crypto.timingSafeEqual(
      Buffer.from(signature.toLowerCase()),
      Buffer.from(calculatedHmac.toLowerCase()),
    );
  } catch (error) {
    console.error("Error during HMAC verification:", error);
    throw error;
  }
};

// Helper to validate transaction data
const validateTransaction = (transaction) => {
  return (
    transaction.success === true &&
    !transaction.is_refunded &&
    !transaction.is_void &&
    !transaction.error_occured &&
    transaction.currency === "SAR"
  );
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

    console.log(rawBody);
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
    const plan = await getPlanFromAmount(amount_cents);
    console.log("Plan", plan);
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
    console.log("User found:", user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found", email },
        { status: 404 },
      );
    }

    // Process subscription in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Delete all user's previous subscriptions
      await tx.subscription.deleteMany({
        where: { userId: user.id },
      });
      // Create subscription record
      const subscription = await tx.subscription.create({
        data: {
          userId: user.id,
          transactionId: transactionId.toString(),
          orderId: order.id.toString(),
          amount: amount_cents / 100,
          status: "active",
          plan: plan,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      // Update user's plan
      await tx.user.update({
        where: { id: user.id },
        data: {
          plan: plan,
        },
      });

      return { subscription };
    });
    console.log("Subscription created:", result.subscription);

    // Return success response
    return NextResponse.json(
      {
        status: "success",
        message: "Payment processed successfully",
        data: {
          subscriptionId: result.subscription.id,
          plan: plan,
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
