import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingParticles from "../FloatingParticles";

const tiers = [
  {
    name: "Free",
    id: "Free",
    href: "checkout",
    price: "$0.00/month",
    amount: 0,
    description:
      "The essentials to provide your best work for clients.",
    features: [
      "5 Credits",
      "1 User",
      "Basic Support",
    ],
    mostPopular: false,
  },
  {
    name: "Basic",
    id: "Basic",
    href: "checkout",
    price: "$20/month",
    amount: 20,
    description:
      "A plan that scales with your rapidly growing business.",
    features: [
      "50 Credits",
      "5 Users",
      "Priority Support",
      "Content generation history",
    ],
    mostPopular: true,
  },
  {
    name: "Premium",
    id: "Premium",
    href: "checkout",
    price: "$50/month",
    amount: 50,
    description:
      "Dedicated support and infrastructure for your company.",
    features: [
      "100 Credits",
      "10 Users",
      "Priority Support",
      "Content generation history",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

export default function Plans() {
  const [
    selectedPlan,
    setSelectedPlan,
  ] = useState(null);
  const navigate = useNavigate();
  console.log(selectedPlan);
  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    if (plan?.id === "Free") {
      navigate("/free-plan");
    } else {
      navigate(
        `/checkout/${plan?.id}?amount=${plan?.amount}`
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden pt-20 pb-8 px-4 sm:pt-24 sm:pb-12">
      {/* Floating Particles */}
      <FloatingParticles />
      {/* Blurred Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse z-0"
        style={{ animationDelay: "1s" }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-blue-400 via-slate-400 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent mb-4 animate-gradient-wave">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing plans for teams
            of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Choose an affordable plan
          that’s packed with the best
          features for engaging your
          audience, creating customer
          loyalty, and driving sales.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "bg-white/20 border-4 border-transparent bg-clip-padding ring-2 ring-blue-500 scale-105 shadow-2xl"
                  : "bg-white/20 border border-white/30 shadow-xl",
                "rounded-3xl p-8 xl:p-10 transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col items-center text-center backdrop-blur-lg"
              )}
              onClick={() =>
                handleSelect(tier)
              }>
              <div className="flex items-center justify-between gap-x-4 w-full mb-2">
                <h3
                  id={tier.id}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-slate-400 to-cyan-400 bg-clip-text text-transparent">
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-gradient-to-r from-blue-500 to-slate-600 px-3 py-1 text-xs font-semibold leading-5 text-white shadow-md animate-bounce">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-2 text-base leading-6 text-gray-300">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1 justify-center">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {tier.price}
                </span>
              </p>
              <button
                aria-describedby={
                  tier.id
                }
                className={classNames(
                  tier.mostPopular
                    ? "bg-gradient-to-r from-blue-500 to-slate-600 text-white shadow-lg hover:from-blue-600 hover:to-slate-700"
                    : "bg-white/10 text-white hover:bg-white/20",
                  "mt-6 w-full rounded-xl py-3 px-6 text-center text-base font-semibold leading-6 transition-all duration-300"
                )}>
                Buy plan
              </button>
              <ul className="mt-8 space-y-3 text-base leading-6 text-gray-300 xl:mt-10 w-full">
                {tier.features.map(
                  (feature) => (
                    <li
                      key={feature}
                      className="flex gap-x-3 items-center">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-white"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
