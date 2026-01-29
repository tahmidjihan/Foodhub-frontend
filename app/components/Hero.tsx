import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png" // We will need to move the generated image to public/hero-bg.png
          alt="Gourmet Food"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Flavor Delivered <br />
            <span className="text-primary">To Your Door</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-lg">
            Experience the best local kitchens and gourmet providers. 
            Healthy, fresh, and delicious meals delivered in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow max-w-md">
              <input 
                type="text" 
                placeholder="Enter your delivery address..." 
                className="w-full py-4 px-6 rounded-full bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-xl"
              />
              <button className="absolute right-2 top-1.5 bg-primary text-white p-2.5 rounded-full hover:bg-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <button className="btn-primary !shadow-2xl">
              Explore Food
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-800 overflow-hidden">
                   <div className="w-full h-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">
              Join <span className="text-primary">10,000+</span> happy food lovers
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
    </section>
  );
};

export default Hero;
