// app/api/paymob-intention/route.js
import axios from "axios";

export async function POST(request) {
  try {
    // Parse the request body
    const {
      amount,
      plan,
      currency,
      userEmail,
      userFirstName,
      userLastName,
      return_url,
    } = await request.json();

    // Validate required fields
    if (!amount || !userEmail || !userFirstName) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Prepare intention data
    const intentionData = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency: currency || "SAR",
      payment_methods: [5981],
      items: [
        {
          name: `Subscription Plan: ${plan}`,
          amount: Math.round(amount * 100),
          description: `Subscription plan payment for ${plan}`,
          quantity: 1,
        },
      ],
      billing_data: {
        apartment: "NA",
        first_name: userFirstName,
        last_name: userLastName || "User",
        street: "NA",
        building: "NA",
        phone_number: "+966500000000", // Default Saudi phone number
        city: "NA",
        country: "SA",
        email: userEmail,
        floor: "NA",
        state: "NA",
      },
      extras: {
        plan_type: plan,
      },
    };

    // Make API call using Axios
    const response = await axios.post(
      "https://ksa.paymob.com/v1/intention/",
      intentionData,
      {
        headers: {
          Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // Extract payment key and other required information
    const paymentKeys = response.data.payment_keys?.[0];

    if (!paymentKeys) {
      throw new Error("No payment keys received from PayMob");
    }

    // Return successful response matching client-side expectations
    return new Response(
      JSON.stringify({
        payment_key: paymentKeys.key,
        client_secret: response.data.client_secret,
        api_key: paymentKeys.key, // Adding api_key to match client-side expectation
        id: response.data.id,
        public_key: process.env.PAYMOB_PUBLIC_KEY,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // Log the full error for debugging
    console.error("PayMob Intention Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // Return error response
    return new Response(
      JSON.stringify({
        message: "Failed to initialize payment",
        details: error.response?.data || error.message,
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
