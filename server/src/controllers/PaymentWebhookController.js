import stripe from "../config/stripe.js";
import { AuthUserModel } from "../models/AuthUserModel.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    console.log("🔥 STRIPE WEBHOOK HIT:", event.type);

    await AuthUserModel.findByIdAndUpdate(userId, {
      hasActiveAccess: true,
    });
  }

  res.json({ received: true });
};
