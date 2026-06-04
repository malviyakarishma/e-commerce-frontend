"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { id: 'men', name: "Men's Sale", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80", color: "from-blue-900/80 to-black" },
  { id: 'women', name: "Women's Sale", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", color: "from-pink-900/80 to-black" },
  { id: 'accessories', name: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", color: "from-amber-900/80 to-black" },
  { id: 'footwear', name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", color: "from-red-900/80 to-black" },
  { id: 'best-sellers', name: "Best Sellers", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80", color: "from-gray-900/80 to-black" },
];

export default function SaleCategories() {
  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">Shop By Category</h2>
            <p className="text-xl text-neutral-600">Find exactly what you're looking for before it's gone.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <Link href={`/sale/${category.id}`}>
                <div className={`aspect-[4/5] ${index === 0 ? 'lg:aspect-[4/4.15]' : ''} w-full relative`}>
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 transition-opacity duration-300 group-hover:opacity-80`}></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                      <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                        <span className="font-medium mr-2">Up to 50% Off</span>
                        <motion.span 
                          className="inline-block"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
