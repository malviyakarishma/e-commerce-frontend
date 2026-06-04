"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const showcaseItems = [
  {
    id: 1,
    title: "Minimalist Chronograph",
    originalPrice: 299,
    price: 149,
    discount: 50,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    category: "Accessories"
  },
  {
    id: 2,
    title: "Premium Leather Jacket",
    originalPrice: 450,
    price: 270,
    discount: 40,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    category: "Men's Outerwear"
  },
  {
    id: 3,
    title: "Designer Sunglasses",
    originalPrice: 180,
    price: 63,
    discount: 65,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    category: "Eyewear"
  }
];

export default function DiscountShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2 block">Steal Deals</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black">Deepest Price Drops</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-neutral-100 rounded-xl overflow-hidden shadow-lg transition-transform duration-500 ease-out group-hover:-translate-y-4 group-hover:shadow-2xl">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Animated Percentage Badge */}
                <motion.div 
                  className="absolute top-4 left-4 bg-red-600 text-white font-black text-xl px-4 py-2 rounded-full shadow-lg z-10 origin-top-left"
                  animate={{ 
                    scale: hoveredId === item.id ? [1, 1.2, 1] : 1,
                    rotate: hoveredId === item.id ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  -{item.discount}%
                </motion.div>

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={hoveredId === item.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-neutral-300 text-sm font-medium mb-1 uppercase tracking-wider">{item.category}</p>
                    <h3 className="text-white text-2xl font-bold mb-3">{item.title}</h3>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-red-400 text-3xl font-black">${item.price}</span>
                      <span className="text-neutral-400 line-through text-lg font-medium">${item.originalPrice}</span>
                    </div>
                    <button className="w-full bg-white text-black font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-neutral-200 transition-colors">
                      Quick Add
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
