"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const featuredLooks = [
  { id: 1, height: "h-[500px]", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", title: "Look 01", products: "Blazer + Slip Dress" },
  { id: 2, height: "h-[350px]", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600", title: "Look 02", products: "Oversized Knit" },
  { id: 3, height: "h-[450px]", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600", title: "Look 03", products: "Tailored Trousers" },
  { id: 4, height: "h-[600px]", image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=600", title: "Look 04", products: "Evening Edit" },
  { id: 5, height: "h-[400px]", image: "https://images.unsplash.com/photo-1509631179647-0c37cb87a1a4?auto=format&fit=crop&q=80&w=600", title: "Look 05", products: "Summer Basics" },
  { id: 6, height: "h-[550px]", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600", title: "Look 06", products: "Weekend Uniform" },
]

export function MasonryFeaturedLooks() {
  // Split array into columns for masonry layout
  const col1 = [featuredLooks[0], featuredLooks[3]]
  const col2 = [featuredLooks[1], featuredLooks[4]]
  const col3 = [featuredLooks[2], featuredLooks[5]]

  const Column = ({ items, delayOffset }: { items: typeof featuredLooks, delayOffset: number }) => (
    <div className="flex flex-col gap-6">
      {items.map((look, i) => (
        <motion.div
          key={look.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: delayOffset + (i * 0.2) }}
          className={`group relative overflow-hidden bg-muted w-full ${look.height}`}
        >
          <Image
            src={look.image}
            alt={look.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white opacity-0 transform translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">{look.title}</h3>
            <p className="text-sm font-light tracking-wide mb-6">{look.products}</p>
            <Link 
              href={`/product/look-${look.id}`}
              className="flex items-center gap-2 border border-white px-6 py-2 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Shop the look <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section id="featured" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight uppercase md:text-5xl mb-4">
            Featured Looks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Curated outfits from our latest collections. Find your next signature look.
          </p>
        </div>

        {/* Masonry Grid via Flex Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Column items={col1} delayOffset={0} />
          <Column items={col2} delayOffset={0.2} />
          <Column items={col3} delayOffset={0.4} />
        </div>
      </div>
    </section>
  )
}
