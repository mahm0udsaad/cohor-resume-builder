// /api/paymob-intention/route.js
export async function POST(req) {
  const {
    amount,
    currency,
    userEmail,
    userFirstName,
    userLastName,
    return_url,
  } = await req.json();

  try {
    // Step 1: Get authentication token (same as before)
    const authResponse = await fetch(
      "https://accept.paymobsolutions.com/api/auth/tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.PAYMOB_API_KEY,
        }),
      },
    );

    const authData = await authResponse.json();
    const paymentToken = authData.token;

    // Step 2: Create order (same as before)
    const orderResponse = await fetch(
      "https://accept.paymobsolutions.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: paymentToken,
          delivery_needed: false,
          amount_cents: Math.round(amount * 100),
          currency,
          merchant_order_id: Date.now(),
        }),
      },
    );

    const orderData = await orderResponse.json();
    const orderId = orderData.id;

    // Step 3: Create payment key with return URL for 3D Secure
    const paymentKeyResponse = await fetch(
      "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: paymentToken,
          amount_cents: Math.round(amount * 100),
          currency,
          order_id: orderId,
          billing_data: {
            apartment: "803",
            building: "8028",
            city: "Cairo",
            country: "EGY",
            email: userEmail,
            floor: "8",
            first_name: userFirstName,
            last_name: userLastName,
            phone_number: "+20123456789",
            postal_code: "11511",
            state: "Cairo",
            street: "90th Street, 5th District, New Cairo",
          },
          integration_id: process.env.PAYMOB_INTEGRATION_ID,
          return_url, // Add return URL for 3D Secure
        }),
      },
    );

    const paymentKeyData = await paymentKeyResponse.json();
    const paymentKey = paymentKeyData.token;

    return new Response(JSON.stringify({ payment_key: paymentKey }), {
      status: 200,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return new Response(
      JSON.stringify({ error: "Payment processing failed" }),
      { status: 500 },
    );
  }
}
