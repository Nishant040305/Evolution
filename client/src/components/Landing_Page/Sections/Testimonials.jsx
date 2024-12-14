import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    company: "Design Studio",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    content:
      "Evolution has transformed how we create websites. The intuitive interface and powerful features make it a game-changer.",
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "TechStart",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    content:
      "The collaboration features are incredible. Our team can work together seamlessly, making the design process much more efficient.",
  },
  {
    name: "Emily Davis",
    role: "Marketing Manager",
    company: "Growth Co",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    content:
      "From concept to launch, Evolution made it possible to create our website without any coding knowledge. Absolutely recommended!",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center">Loved by Creators</h2>
      <p className="mb-8 text-center text-gray-600">
        See what our users have to say about Evolution
      </p>
      <div className="flex justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white rounded-lg shadow-md"
          >
            <Quote className="w-8 h-8 mb-4 text-blue-500" />
            <p className="text-gray-700">{testimonial.content}</p>
            <div className="flex items-center mt-6">
              <div className="mr-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
