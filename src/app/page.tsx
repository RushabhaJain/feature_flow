import Image from "next/image";
import ButtonLogin from "@/components/ButtonLogin";
import FAQListItem from "@/components/FAQListItem";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const pricingFeatureList = [
    "Collect Customer Feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];
  return (
    <main>
      {/*  Header */}
      <section className="bg-base-200">
        <div className="flex justify-between items-center max-w-5xl mx-auto py-2">
          <div className="font-bold">
            🤯 Feature<span className="font-light">Flow</span>
          </div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <ButtonLogin session={session} />
        </div>
      </section>
      {/* Hero */}
      <section
        className="px-8 py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start"
        id="pricing"
      >
        <Image
          src="/productDemo.jpeg"
          alt="Product Demo"
          width={384}
          height={384}
          className="rounded-xl"
        />
        <div className="max-lg:text-center flex-1">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Collect customer feedback to build better products
          </h1>
          <p className="opacity-90 mb-12">
            Create a feedback board in minutes, prioritize features, and build
            products your customers will love.
          </p>
          <ButtonLogin session={session} />
        </div>
      </section>
      {/* Pricing */}
      <section className="bg-base-200 px-8 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary uppercase text-sm font-medium mb-4">
            Pricing
          </p>
          <h2 className="text-3xl font-extrabold mb-12">
            A pricing that adapts to your needs
          </h2>
          <div className="p-8 bg-base-100 rounded-3xl w-96 mx-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <p className="text-4xl font-black">$19</p>
              <p className="uppercase text-sm font-medium opacity-60">/month</p>
            </div>
            <ul className="space-y-2">
              {pricingFeatureList.map((pricingFeature) => (
                <li className="flex gap-2 items-center" key={pricingFeature}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {pricingFeature}
                </li>
              ))}
            </ul>
            <ButtonLogin extrastyle="w-full" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200 px-8 py-32" id="faq">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-center">
            <p className="text-primary uppercase text-sm font-medium mb-4">
              FAQ
            </p>
            <h2 className="text-3xl font-extrabold mb-12">
              Frequenty Asked Questions
            </h2>
          </div>
          <ul className="max-w-lg mx-auto">
            {[
              {
                question: "What do I get exactly?",
                answer: "Lorem Ipsum",
              },
              {
                question: "Can I get a refund?",
                answer: "Lorem Ipsum",
              },
              {
                question: "I have another question",
                answer: "Lorem Ipsum",
              },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
