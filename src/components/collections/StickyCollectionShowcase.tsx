"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: "essentials",
    title: "Essentials",
    subtitle: "The Foundation of Every Wardrobe",
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=1600",
    color: "bg-stone-900",
  },
  {
    id: "streetwear",
    title: "Streetwear",
    subtitle: "Urban Utility Meets Modern Luxury",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1600",
    color: "bg-slate-900",
  },
  {
    id: "summer",
    title: "Summer Edit",
    subtitle: "Lightweight Fabrics for Sun-Drenched Days",
    image: "https://images.unsplash.com/photo-1509631179647-0c37cb87a1a4?auto=format&fit=crop&q=80&w=1600",
    color: "bg-amber-900",
  },
  {
    id: "workwear",
    title: "Workwear",
    subtitle: "Reimagined Tailoring for the Modern Office",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1600",
    color: "bg-zinc-900",
  }
]

export function StickyCollectionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="showcase" ref={containerRef} className="relative bg-background">
      {/* We don't use absolute h-screen per item, instead we use a classic sticky stacking technique */}
      <div className="relative flex flex-col gap-0">
        {collections.map((collection, index) => {
          return (
            <Card
              key={collection.id}
              collection={collection}
              index={index}
              totalCards={collections.length}
            />
          )
        })}
      </div>
    </section>
  )
}

function Card({ collection, index, totalCards }: { collection: any, index: number, totalCards: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  })

  const { scrollYProgress: scrollYProgressExit } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  })

  // Entrance animations
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  // Exit animations (when the next card scrolls over this one)
  // We only scale down if it's not the last card
  const exitScale = useTransform(scrollYProgressExit, [0, 1], [1, index === totalCards - 1 ? 1 : 0.9])
  const exitOpacity = useTransform(scrollYProgressExit, [0, 1], [1, index === totalCards - 1 ? 1 : 0.5])

  return (
    <div
      ref={cardRef}
      className="sticky top-16 h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 md:p-8"
      style={{ zIndex: index }}
    >
      <motion.div
        style={{
          scale: scrollYProgressExit.get() > 0 ? exitScale : scale,
          opacity: exitOpacity,
        }}
        className={`relative h-full w-full max-w-7xl overflow-hidden rounded-2xl ${collection.color} shadow-2xl origin-top`}
      >
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          className="object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105 hover:opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-8 md:p-16 text-white">
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase"
            >
              {collection.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="text-lg md:text-xl font-light tracking-wide max-w-xl text-white/90">
              {collection.subtitle}
            </p>

            <Button size="lg" className="rounded-none bg-white text-black hover:bg-white/90 uppercase tracking-widest font-semibold px-8 h-14 w-max group">
              <Link href={`/collections/${collection.id}`}>
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
