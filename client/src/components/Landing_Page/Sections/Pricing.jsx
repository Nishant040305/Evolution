// Pricing.tsx
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal projects",
    features: [
      "1 Website",
      "Basic Templates",
      "Community Support",
      "Basic Analytics",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for professionals",
    features: [
      "Unlimited Websites",
      "Premium Templates",
      "Priority Support",
      "Advanced Analytics",
      "Custom Domain",
      "Remove Evolution Branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom Templates",
      "Dedicated Support",
      "Team Collaboration",
      "API Access",
    ],
  },
];

export function Pricing() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-gray-600">Find a plan that works for you.</p>
      <div className="flex justify-center gap-8 mt-12">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`border rounded-lg p-6 w-80 ${
              plan.popular ? "border-blue-500" : "border-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {plan.popular && (
              <div className="inline-block px-3 py-1 mb-4 text-sm text-white bg-blue-500 rounded">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="my-4 text-4xl">{plan.price}</p>
            <p className="mb-6 text-gray-600">{plan.description}</p>
            <ul className="mb-6 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center mb-2">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> {feature}
                </li>
              ))}
            </ul>
            <button className="px-6 py-2 text-white bg-blue-500 rounded">
              Select
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
