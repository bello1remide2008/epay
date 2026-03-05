import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import epay2 from "./epay2.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex items-center gap-2 justify-between pl-4 pr-10 py-6 bg-white shadow-md">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.img
            src={epay2}
            alt="Epay Logo"
            className="w-9 h-9 rounded-full border-2 border-red-500 object-cover"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />

          <motion.h1
            className="text-3xl font-bold text-red-500"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            E-pay
          </motion.h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
          <li className="hover:text-red-500 cursor-pointer">Home</li>
          <li 
          onClick={() => navigate("/about-us")}
          className="hover:text-red-500 cursor-pointer">About</li>
          <li className="hover:text-red-500 cursor-pointer">Contact</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-red-500"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white transform transition-transform duration-300 md:hidden z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 text-red-500 text-3xl"
        >
          ✕
        </button>

        {/* Menu Items */}
        <ul className="flex flex-col items-center justify-center h-full gap-8 text-gray-700 text-xl font-medium">
          <li onClick={() => setOpen(false)} className="hover:text-red-500 cursor-pointer">Home</li>
          <li onClick={() => navigate("/about-us")}
           className="hover:text-red-500 cursor-pointer">About</li>
          <li onClick={() => setOpen(false)} className="hover:text-red-500 cursor-pointer">Contact</li>

          {/* Buttons Side by Side */}
          <div className="flex gap-4 mt-6 w-3/4">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 border border-red-500 text-red-500 py-2 rounded-full font-semibold"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="flex-1 bg-red-500 text-white py-2 rounded-full font-semibold"
            >
              Sign Up
            </button>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;