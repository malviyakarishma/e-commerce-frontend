"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function LimitedTimeCountdown() {
  const [progress, setProgress] = useState(85); // e.g., 85% claimed
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-red-600 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto bg-black text-white p-10 md:p-16 rounded-3xl shadow-2xl text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Final <span className="text-red-500">Hours</span>
            </h2>
            <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl mx-auto font-light">
              Our biggest sale of the year is ending. Stock is running out fast. Once these pieces are gone, they will never be restocked.
            </p>

            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest mb-3">
                <span className="text-neutral-400">Total Stock</span>
                <span className="text-red-500">{progress}% Claimed</span>
              </div>
              <div className="h-4 bg-neutral-900 rounded-full overflow-hidden p-1">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </div>

            <button className="bg-white text-black font-black uppercase text-xl px-12 py-5 rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Secure Your Size
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
