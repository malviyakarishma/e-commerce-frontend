"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  { id: 101, name: "Oversized Cotton Tee", originalPrice: 45, price: 29, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: 102, name: "Vintage Wash Jeans", originalPrice: 120, price: 89, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" },
  { id: 103, name: "Wool Blend Coat", originalPrice: 299, price: 179, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80" },
  { id: 104, name: "Chunky Knit Sweater", originalPrice: 85, price: 55, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80" },
  { id: 105, name: "Leather Ankle Boots", originalPrice: 180, price: 110, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80" },
  { id: 106, name: "Canvas Tote Bag", originalPrice: 65, price: 39, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80" },
  { id: 107, name: "Silk Scarf", originalPrice: 55, price: 35, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80" },
  { id: 108, name: "Aviator Sunglasses", originalPrice: 140, price: 85, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80" },
];

export default function SaleAnimatedGrid() {
  return (
    <section className="py-24 bg-neutral-50 relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-2">All Sale Items</h2>
            <p className="text-neutral-600">Premium quality. Exceptional prices.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <select className="bg-white border border-neutral-300 text-neutral-700 py-2 px-4 rounded-lg focus:outline-none focus:border-red-500">
              <option>Sort By: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, index) => {
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] mb-4 bg-neutral-200 overflow-hidden rounded-lg">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Hover Quick Add */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <button className="w-full bg-white/95 backdrop-blur-sm text-black font-bold uppercase py-3 rounded hover:bg-black hover:text-white transition-colors">
                      Quick Add
                    </button>
                  </div>

                  {/* Animated Badge on viewport enter */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: (index % 4) * 0.1 + 0.3 }}
                    className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10"
                  >
                    -{discountPercent}%
                  </motion.div>
                </div>
                
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-black mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-red-600 font-bold">${product.price}</span>
                    <span className="text-neutral-500 line-through text-sm">${product.originalPrice}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
}
