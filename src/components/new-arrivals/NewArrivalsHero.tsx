"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function NewArrivalsHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 w-full h-full origin-bottom"
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="New Arrivals Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-4 overflow-hidden"
        >
          <span className="inline-block text-sm font-semibold tracking-[0.3em] uppercase text-white/80">
            Chapter IV
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="text-5xl font-bold tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-9xl mix-blend-overlay"
          >
            New Arrivals
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-lg font-light tracking-wide text-white/90 sm:text-xl"
        >
          Discover the latest silhouettes redefining modern elegance. 
          Curated pieces designed for effortless sophistication.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-white/60" />
        </motion.div>
      </motion.div>
    </div>
  )
}
