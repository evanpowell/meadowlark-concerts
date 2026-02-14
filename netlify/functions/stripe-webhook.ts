import type { Handler } from "@netlify/functions";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const sig = event.headers["stripe-signature"];
  if (!sig) {
    return { statusCode: 400, body: "Missing stripe-signature header" };
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return { statusCode: 400, body: "Webhook signature verification failed" };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const { concertSlug, concertName, streamPassword } = session.metadata || {};

    if (customerEmail && concertSlug && streamPassword) {
      const watchUrl = `https://meadowlarkconcerts.com/watch/${concertSlug}`;

      try {
        await resend.emails.send({
          from: "Meadowlark Concerts <onboarding@resend.dev>",
          to: customerEmail,
          subject: `Your Virtual Ticket: ${concertName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2d5a3f;">Thank You for Your Support!</h1>

              <p>You're all set to watch <strong>${concertName}</strong> from wherever you are.</p>

              <div style="background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <h2 style="margin-top: 0; color: #2d5a3f;">How to Watch</h2>
                <p><strong>Watch Page:</strong><br>
                <a href="${watchUrl}">${watchUrl}</a></p>

                <p><strong>Access Code:</strong><br>
                <code style="background: #fff; padding: 4px 8px; border-radius: 4px; font-size: 18px;">${streamPassword}</code></p>
              </div>

              <p>The stream will be available on the day of the concert. Visit the watch page and enter your access code when prompted.</p>

              <p>If you have any questions, just reply to this email.</p>

              <p style="color: #666; margin-top: 32px;">
                With gratitude,<br>
                Meadowlark Concerts
              </p>
            </div>
          `,
        });
        console.log(`Email sent to ${customerEmail} for ${concertName}`);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the webhook - payment was still successful
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
