"use client"

import { useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { TrendingUp, Users, ShoppingBag } from "lucide-react"

// Animated Counter component
function Counter({ value, label, icon: Icon }: { value: number, label: string, icon: any }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000 // 2 seconds
    const increment = value / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-background/50 backdrop-blur-sm border">
      <Icon className="h-6 w-6 mb-4 text-muted-foreground" />
      <span className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{count.toLocaleString()}</span>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
    </div>
  )
}

export function SocialProofTicker() {
  const controls = useAnimationControls()
  const tickerItems = [
    "#SummerElegance", "Trending Now", "Limited Quantities", 
    "Editor's Pick", "Staff Favorite", "Selling Fast", 
    "Just In", "Viral Look", "Wardrobe Essential"
  ]

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    })
  }, [controls])

  return (
    <section className="border-y bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <Counter value={1248} label="Active Shoppers" icon={Users} />
          <Counter value={89} label="New Styles Added" icon={ShoppingBag} />
          <Counter value={5420} label="Items Sold Today" icon={TrendingUp} />
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="border-t bg-black text-white overflow-hidden py-4 flex whitespace-nowrap">
        <motion.div 
          animate={controls}
          className="flex gap-16 min-w-full"
        >
          {/* Double the items to ensure seamless looping */}
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="text-white/30">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
