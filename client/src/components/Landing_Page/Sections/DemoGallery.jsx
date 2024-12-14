import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const templates = [
  {
    title: "Business Pro",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Creative Portfolio",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "E-Commerce Plus",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Blog Master",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
  },
];

function DemoGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % templates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + templates.length) % templates.length);
  };

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
            Ready-to-Use Templates
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Start with professionally designed templates and customize them to
            match your brand
          </p>
        </motion.div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {templates.map((template, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-full px-4 md:w-1/2 lg:w-1/3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-background/80 group-hover:opacity-100">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">
                        <Eye className="w-4 h-4" />
                        Live Preview
                      </button>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-center">
                      {template.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted-foreground/20"
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted-foreground/20"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoGallery;
