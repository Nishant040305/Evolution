import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-white bg-black bg-opacity-80">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text"
        >
          Evolution
        </Link>

        {/* Links */}
        <ul className="hidden space-x-8 md:flex">
          <li>
            <a href="#features" className="hover:text-teal-400">
              Features
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="hover:text-teal-400">
              How It Works
            </a>
          </li>
          <li>
            <a href="#demo" className="hover:text-teal-400">
              Demo
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-teal-400">
              Pricing
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:text-teal-400">
              Testimonials
            </a>
          </li>
        </ul>

        {/* Sign In Button */}
        <Link
          to="/login"
          className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
