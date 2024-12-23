import { connectToMongo } from "@/lib/mongoose";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    // Step 1: Verify that webhook event is coming from Stripe
    const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "");
    const body = await req.text();
    const signature = headers().get("stripe-signature") ?? "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const { data, type } = event;
    if (type === "checkout.session.completed") {
      await connectToMongo();
      const user = await User.findById(data.object.client_reference_id);
      user.hasAccess = true;
      user.customerId = data.object.customer;
    } else if (type === "customer.subscription.deleted") {
      await connectToMongo();
      const user = await User.findOne({
        customerId: data.object.customer,
      });
      user.hasAccess = false;
      await user.save();
    }
    // Step 2:
  } catch (e: any) {
    console.log("Stripe Error: ", e?.message);
  }
  return NextResponse.json({});
}
