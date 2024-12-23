import { auth } from "@/auth";
import { connectToMongo } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      successUrl: string;
      cancelUrl: string;
    };

    if (!body.successUrl || !body.cancelUrl) {
      return NextResponse.json(
        {
          error: "Success and cancel URLs are required",
        },
        {
          status: 400,
        }
      );
    }

    await connectToMongo();
    const session = await auth();
    const user = await User.findById(session?.user?.id);

    const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "");
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
      line_items: [
        {
          price: process.env.PRODUCT_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      client_reference_id: user._id.toString(),
    });
    return NextResponse.json({ url: stripeCheckoutSession.url });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
