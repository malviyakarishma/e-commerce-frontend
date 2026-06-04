"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const announcements = [
  "Free Worldwide Shipping Over $100",
  "New Summer Collection Available Now",
  "Mid-Season Sale: Up to 50% Off"
]

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground relative z-50 flex h-10 items-center justify-center px-4 text-xs font-medium tracking-wide sm:text-sm">
      <div className="flex w-full max-w-7xl items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute text-center"
          >
            {announcements[currentIndex]}
          </motion.div>
        </AnimatePresence>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-0 hover:opacity-70 transition-opacity"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
