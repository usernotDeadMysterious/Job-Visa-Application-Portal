import stripe from "../config/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user?._id;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: 1000, // $10
            product_data: {
              name: "Applications Pass",
              description: "Lifetime access to job and visa applications",
            },
          },
        },
      ],

      success_url: `${process.env.FRONTEND_URL}payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/secure-payment`,
      metadata: userId ? { userId } : {},
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ message: "Payment failed" });
  }
};
