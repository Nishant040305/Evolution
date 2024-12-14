import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-500 via-indigo-700 to-black opacity-60 blur-lg animate-pulse-slow"></div>
      <div className="absolute -top-1/3 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-600 to-transparent opacity-40 animate-slow-spin"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-green-600 to-transparent opacity-30 animate-slow-spin-reverse"></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
      <AnimatedBackground />
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
        >
          Bring Your Vision to Life with Evolution
          <span className="block text-white">No Code Required!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-8 text-xl text-gray-300 md:text-2xl"
        >
          Empower your creativity with a professional, customizable, and
          collaborative website builder.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex justify-center"
        >
          <div className="absolute w-40 h-40 transition-all duration-500 ease-in-out scale-75 rounded-full opacity-0 bg-gradient-to-r from-purple-400 to-indigo-500 group-hover:opacity-100 group-hover:scale-100"></div>
          <Link
            to="/login"
            className="relative z-10 flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-300 ease-in-out rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
