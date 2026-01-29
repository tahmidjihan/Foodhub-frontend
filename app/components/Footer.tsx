import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <span className="text-3xl font-black tracking-tighter text-primary">
              FOOD<span className="text-white">HUB</span>
            </span>
            <p className="mt-6 text-zinc-400 max-w-xs leading-relaxed">
              We connect local food lovers with premium kitchens and providers. 
              Quality food, delivered fast, every single time.
            </p>
            <div className="flex gap-4 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer">
                  <div className="w-4 h-4 rounded-sm bg-white/20"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><a href="#" className="hover:text-primary transition-colors">Find Food</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Near Me</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Popular Kitchens</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Offers & Coupons</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">Join Us</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><a href="#" className="hover:text-primary transition-colors">Register a Kitchen</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Become a Driver</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carrier</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Media Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">Newsletter</h4>
            <p className="text-zinc-400 mb-6">Receive recipes and discounts directly in your inbox.</p>
            <div className="flex bg-zinc-800 rounded-full p-2 border border-zinc-700">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-transparent px-4 flex-grow outline-none text-sm"
              />
              <button className="bg-primary text-white py-2 px-6 rounded-full font-bold text-sm">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
          <p>© 2026 FoodHub Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
