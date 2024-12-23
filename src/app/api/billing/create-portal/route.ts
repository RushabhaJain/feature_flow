import { auth } from "@/auth";
import { connectToMongo } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      returnUrl: string;
    };

    if (!body.returnUrl) {
      return NextResponse.json(
        {
          error: "Return URL is required",
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
    const stripeCustomerPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: user.customerId,
        return_url: body.returnUrl,
      });
    return NextResponse.json({ url: stripeCustomerPortalSession.url });
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
