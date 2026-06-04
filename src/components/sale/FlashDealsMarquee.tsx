"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const flashDeals = [
  { id: 1, title: "Classic White Sneakers", price: 89, originalPrice: 150, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80" },
  { id: 2, title: "Denim Trucker Jacket", price: 110, originalPrice: 220, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80" },
  { id: 3, title: "Silk Evening Dress", price: 199, originalPrice: 400, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80" },
  { id: 4, title: "Leather Crossbody", price: 150, originalPrice: 350, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
  { id: 5, title: "Graphic Print Tee", price: 29, originalPrice: 65, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { id: 6, title: "Classic White Sneakers", price: 89, originalPrice: 150, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80" }, // Duplicated for smooth loop
  { id: 7, title: "Denim Trucker Jacket", price: 110, originalPrice: 220, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80" }, // Duplicated
];

export default function FlashDealsMarquee() {
  return (
    <section className="py-20 bg-neutral-900 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 bg-red-600/20 text-red-500 border border-red-500/30 px-6 py-2 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="font-bold uppercase tracking-widest text-sm">Flash Deals Live</span>
        </motion.div>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, 
            repeat: Infinity 
          }}
          className="flex whitespace-nowrap gap-6 px-3 w-max group-hover:[animation-play-state:paused]"
        >
          {flashDeals.map((deal, index) => (
            <div 
              key={`${deal.id}-${index}`} 
              className="w-[300px] flex-shrink-0 bg-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-700 transition-colors border border-neutral-700 cursor-pointer snap-start"
            >
              <div className="relative aspect-square w-full">
                <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                  -{Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}%
                </div>
              </div>
              <div className="p-5 flex flex-col items-start text-left">
                <h4 className="text-white font-semibold text-lg mb-2 truncate w-full">{deal.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-xl">${deal.price}</span>
                  <span className="text-neutral-500 line-through text-sm">${deal.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
           {flashDeals.map((deal, index) => (
            <div 
              key={`dup-${deal.id}-${index}`} 
              className="w-[300px] flex-shrink-0 bg-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-700 transition-colors border border-neutral-700 cursor-pointer snap-start"
            >
              <div className="relative aspect-square w-full">
                <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                  -{Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}%
                </div>
              </div>
              <div className="p-5 flex flex-col items-start text-left">
                <h4 className="text-white font-semibold text-lg mb-2 truncate w-full">{deal.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-xl">${deal.price}</span>
                  <span className="text-neutral-500 line-through text-sm">${deal.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient fades for edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
