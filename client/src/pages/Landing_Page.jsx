import React from "react";
import Navbar from "../components/Landing_Page/Sections/Navbar.jsx";
import Hero from "../components/Landing_Page/Sections/Hero";
import Features from "../components/Landing_Page/Sections/Features";
import HowItWorks from "../components/Landing_Page/Sections/HowItWorks";
import DemoGallery from "../components/Landing_Page/Sections/DemoGallery";
import Testimonials from "../components/Landing_Page/Sections/Testimonials";
import Pricing from "../components/Landing_Page/Sections/Pricing";
import Footer from "../components/Landing_Page/Sections/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="demo">
          <DemoGallery />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
