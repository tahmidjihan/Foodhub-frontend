import React from "react";

const categories = [
  { name: "Pizza", icon: "🍕", count: "120+ Places" },
  { name: "Burgers", icon: "🍔", count: "80+ Places" },
  { name: "Sushi", icon: "🍣", count: "45+ Places" },
  { name: "Healthy", icon: "🥗", count: "60+ Places" },
  { name: "Desserts", icon: "🍰", count: "30+ Places" },
  { name: "Drinks", icon: "🥤", count: "25+ Places" },
  { name: "Tacos", icon: "🌮", count: "40+ Places" },
  { name: "Pasta", icon: "🍝", count: "55+ Places" },
];

const Categories = () => {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-dark/50">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Browse by Category</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
          </div>
          <button className="text-primary font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center card-hover cursor-pointer border border-transparent hover:border-primary/20"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-dark dark:text-white">{cat.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
