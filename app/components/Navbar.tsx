"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-primary">
            FOOD<span className="text-foreground">HUB</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#order" className="font-semibold hover:text-primary transition-colors">
            Order Food
          </Link>
          <Link href="#kitchens" className="font-semibold hover:text-primary transition-colors">
            Kitchens
          </Link>
          <Link href="#register" className="font-semibold hover:text-primary transition-colors">
            Partner with us
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block font-bold hover:text-primary transition-colors">
            Sign In
          </button>
          <button className="btn-primary !py-2 !px-6 text-sm">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
