import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { amount, concertSlug, concertName, streamPassword } = JSON.parse(event.body || "{}");

    // Validate minimum amount ($10 = 1000 cents)
    if (!amount || amount < 1000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Minimum amount is $10" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Virtual Ticket: ${concertName}`,
              description: "Live stream access for Meadowlark House Concert",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${event.headers.origin}/virtual-ticket-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin}/virtual-ticket/${concertSlug}`,
      metadata: {
        concertSlug,
        concertName,
        streamPassword,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create checkout session" }),
    };
  }
};
