import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Design with Drag-and-Drop",
    description:
      "Simply drag elements onto your canvas and arrange them exactly how you want.",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Customize Styles",
    description:
      "Personalize every aspect of your design with our intuitive style controls.",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Publish in One Click",
    description: "Go live instantly with our one-click publishing system.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            How Evolution Works
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Create beautiful websites in three simple steps
          </p>
        </motion.div>

        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-16`}
            >
              <div className="flex-1 text-center md:text-left">
                <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                <p className="mb-6 text-muted-foreground">{step.description}</p>
                <ArrowRight className="hidden w-8 h-8 md:inline-block text-primary" />
              </div>
              <div className="flex-1 h-[300px] w-full">
                <img
                  src={step.image}
                  alt={step.title}
                  className="object-cover w-full h-full rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
