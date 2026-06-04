"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const trendingItems = [
  { id: 1, name: "Oversized Wool Coat", category: "Outerwear", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Knit Midi Dress", category: "Dresses", image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Leather Tote", category: "Accessories", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Wide Leg Denim", category: "Bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Cashmere Sweater", category: "Tops", image: "https://images.unsplash.com/photo-1434389678369-183424d5280c?auto=format&fit=crop&q=80&w=600" },
]

export function TrendingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth out the scroll progress for rotation effects
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15])

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-muted/30 perspective-[1000px]">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight uppercase md:text-5xl mb-4"
          >
            Trending This Week
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 bg-foreground/20"
          />
        </div>
      </div>

      <div className="relative w-full">
        {/* Horizontal scroll container with snapping */}
        <div 
          ref={scrollRef}
          className="flex w-full gap-6 overflow-x-auto px-4 pb-12 pt-8 snap-x snap-mandatory hide-scrollbar md:px-12 lg:px-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingItems.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ rotateX }}
              className="group relative flex-none w-[280px] md:w-[350px] aspect-[3/4] snap-center shrink-0 origin-center preserve-3d"
            >
              {/* Card wrapper for 3D hover effect */}
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:rotate-y-[-10deg] group-hover:rotate-x-[10deg] shadow-xl group-hover:shadow-2xl">
                <div className="relative h-full w-full overflow-hidden bg-background">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 280px, 350px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2 block">{item.category}</span>
                    <h3 className="text-xl font-semibold tracking-wide">{item.name}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
