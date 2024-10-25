export const initializePayment = async (paymentData, returnUrl) => {
  try {
    const res = await fetch("/api/paymob-intention", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...paymentData,
        // Encode the return URL in the integration_metadata
        integration_metadata: {
          return_url: returnUrl,
        },
      }),
    });

    if (!res.ok) throw new Error("Failed to initialize payment");
    return await res.json();
  } catch (error) {
    console.error("Payment initialization error:", error);
    throw error;
  }
};
