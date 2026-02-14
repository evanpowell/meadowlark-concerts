import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const sessionId = event.queryStringParameters?.session_id;

  if (!sessionId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing session_id" }),
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Payment not completed" }),
      };
    }

    const { concertSlug, concertName, streamPassword } = session.metadata || {};

    return {
      statusCode: 200,
      body: JSON.stringify({
        concertSlug,
        concertName,
        streamPassword,
      }),
    };
  } catch (error) {
    console.error("Get session error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve session" }),
    };
  }
};
