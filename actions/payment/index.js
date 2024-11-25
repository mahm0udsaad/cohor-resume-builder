// app/subscription/page.js (for server components in Next.js)
"use server";

import { redirect } from "next/navigation";

export async function getPaymentToken() {
  const res = await fetch(
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

  const data = await res.json();
  return data.token;
}

export async function createOrder(token, price) {
  const res = await fetch(
    "https://accept.paymobsolutions.com/api/ecommerce/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_token: token,
        amount: price,
        currency: "SAR",
        integration_id: process.env.PAYMOB_INTEGRATION_ID,
      }),
    },
  );

  const data = await res.json();
  return data;
}
