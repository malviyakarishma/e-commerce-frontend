"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const FloatingElement = ({ children, delay = 0, yOffset = 20, xOffset = 20 }: { children: React.ReactNode, delay?: number, yOffset?: number, xOffset?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -yOffset, 0],
      x: [0, xOffset, 0, -xOffset, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className="absolute pointer-events-none"
  >
    {children}
  </motion.div>
);

export default function SaleHeroBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 25,
    seconds: 60
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
    }
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black opacity-80 z-0"></div>
      
      {/* Floating Elements */}
      <FloatingElement delay={0} yOffset={30} xOffset={15}>
        <div className="top-20 left-[10%] text-6xl font-black text-red-500/20 blur-[2px]">%</div>
      </FloatingElement>
      <FloatingElement delay={2} yOffset={40} xOffset={-20}>
        <div className="bottom-40 right-[15%] text-8xl font-black text-red-600/10 blur-[4px]">SALE</div>
      </FloatingElement>
      <FloatingElement delay={1} yOffset={-25} xOffset={25}>
        <div className="top-1/3 right-[10%] text-4xl font-black text-red-500/30 blur-[1px]">50% OFF</div>
      </FloatingElement>

      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block py-1 px-3 border border-red-500 text-red-500 rounded-full text-sm font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            End of Season
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-7xl md:text-9xl font-black tracking-tighter mb-4 uppercase"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            The Big
          </span>
          <span className="block text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">
            Clearance
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-12"
        >
          Up to <strong className="text-white">70% off</strong> on premium collections. Once it's gone, it's gone.
        </motion.p>

        {/* Dynamic Countdown */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 md:gap-8 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="relative w-20 h-24 md:w-24 md:h-32 bg-gray-900 rounded-lg border border-gray-800 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent"></div>
                <motion.span 
                  key={value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-6xl font-bold font-mono"
                >
                  {value.toString().padStart(2, '0')}
                </motion.span>
                {/* Horizontal dividing line for classic flip-clock feel */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/50"></div>
              </div>
              <span className="mt-3 text-sm font-medium text-gray-500 uppercase tracking-widest">{unit}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <button className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-red-600 px-12 font-medium text-neutral-50 duration-300 hover:w-[220px]">
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="text-lg font-bold uppercase tracking-wider">Shop The Sale</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
