// app/api/paymob-intention/route.js
export async function POST(req) {
  try {
    const { amount, plan, currency, userEmail, userFirstName, userLastName } =
      await req.json();

    // Step 1: Authentication Request
    const authResponse = await fetch("https://ksa.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.PAYMOB_API_KEY,
      }),
    });

    const authData = await authResponse.json();
    const token = authData.token;

    // Step 2: Order Registration
    const orderResponse = await fetch(
      "https://ksa.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: token,
          delivery_needed: false,
          amount_cents: parseFloat((amount * 100).toFixed(2)),
          currency: currency,
          items: [
            {
              name: plan,
              amount_cents: parseFloat((amount * 100).toFixed(2)),
              quantity: 1,
            },
          ],
        }),
      },
    );

    const orderData = await orderResponse.json();

    // Step 3: Payment Key Generation
    const paymentKeyResponse = await fetch(
      "https://ksa.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: parseFloat((amount * 100).toFixed(2)),
          integration_id: 7138,
          expiration: 3600,
          order_id: orderData.id,
          billing_data: {
            email: userEmail,
            first_name: userFirstName,
            last_name: userLastName,
            phone_number: "+201000000000",
            apartment: "NA",
            floor: "NA",
            street: "NA",
            building: "NA",
            shipping_method: "NA",
            postal_code: "NA",
            city: "NA",
            country: "NA",
            state: "NA",
          },
          currency: "SAR",
          lock_order_when_paid: true,
        }),
      },
    );

    const paymentKeyData = await paymentKeyResponse.json();

    return Response.json({
      payment_key: paymentKeyData.token,
      order_id: orderData.id,
    });
  } catch (error) {
    console.error("Payment intention error:", error);
    return Response.json(
      {
        error: "Failed to create payment intention",
      },
      {
        status: 500,
      },
    );
  }
}
