import React from "react";

const foods = [
  { name: "Truffle Pasta", kitchen: "The Italian Corner", price: "$24.00", rating: "4.9", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800" },
  { name: "Double Wagyu Burger", kitchen: "Burger Bar HQ", price: "$18.50", rating: "4.8", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800" },
  { name: "Omakase Sushi Set", kitchen: "Tokyo Zen", price: "$45.00", rating: "5.0", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800" },
  { name: "Quinoa Power Bowl", kitchen: "Green Leaf", price: "$16.00", rating: "4.7", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800" },
];

const FeatureGrid = () => {
  return (
    <section id="order" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Deliciously Selected</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2">Popular Dishes</h2>
          </div>
          <div className="flex gap-2">
             <button className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 font-bold hover:border-primary transition-colors">Trending</button>
             <button className="px-6 py-2 rounded-full bg-dark text-white font-bold">Newest</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foods.map((food, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-64 mb-6 rounded-[2rem] overflow-hidden card-hover">
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1">
                   <span className="text-yellow-500">★</span>
                   <span className="text-xs font-bold text-dark">{food.rating}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <button className="w-full btn-primary !py-2">Add to Cart</button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{food.name}</h3>
                  <p className="text-zinc-500 text-sm">{food.kitchen}</p>
                </div>
                <p className="text-xl font-black text-primary">{food.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
