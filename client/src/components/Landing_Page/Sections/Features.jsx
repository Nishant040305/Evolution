import React from "react";
import { motion } from "framer-motion";
import {
  MousePointerClick,
  Users,
  LineChart,
  Globe,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Drag-and-Drop Builder",
    description:
      "Create stunning websites with our intuitive drag-and-drop interface. No coding skills required.",
    icon: MousePointerClick,
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with your team in real-time. Share, edit, and review changes instantly.",
    icon: Users,
  },
  {
    title: "SEO Tools & Analytics",
    description:
      "Built-in SEO optimization tools and detailed analytics to help your website perform better.",
    icon: LineChart,
  },
  {
    title: "Hosting and Domain Support",
    description:
      "One-click deployment with reliable hosting and easy domain management included.",
    icon: Globe,
  },
];

function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Powerful Features for Modern Websites
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Everything you need to create professional websites quickly and
            efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative p-6 overflow-hidden transition-shadow duration-300 border rounded-lg group hover:shadow-lg">
                <div className="inline-block p-3 mb-4 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <ArrowRight className="absolute w-5 h-5 transition-all duration-300 transform translate-x-4 opacity-0 bottom-4 right-4 group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
