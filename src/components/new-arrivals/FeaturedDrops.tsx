"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredItems = [
  {
    id: "f1",
    title: "Structured Blazer",
    price: "$295",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
    altImage: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=800",
    href: "/product/structured-blazer"
  },
  {
    id: "f2",
    title: "Silk Slip Dress",
    price: "$185",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    altImage: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800",
    href: "/product/silk-slip-dress"
  },
  {
    id: "f3",
    title: "Pleated Trousers",
    price: "$145",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
    altImage: "https://images.unsplash.com/photo-1509631179647-0c37cb87a1a4?auto=format&fit=crop&q=80&w=800",
    href: "/product/pleated-trousers"
  }
]


export function FeaturedDrops() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <h2 className="text-3xl font-bold tracking-tight uppercase md:text-5xl">
            Featured Drops
          </h2>
          <Link 
            href="/women/new-arrivals" 
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop the edit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-4 lg:gap-8">
          {/* Main Large Item */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative md:col-span-7 lg:col-span-8 overflow-hidden aspect-[4/5] md:aspect-[16/10] bg-muted"
          >
            <Image
              src={featuredItems[0].image}
              alt={featuredItems[0].title}
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <Image
              src={featuredItems[0].altImage}
              alt={featuredItems[0].title}
              fill
              className="object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 md:p-10 text-white z-10 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
              <h3 className="text-2xl font-semibold tracking-wide uppercase mb-2">{featuredItems[0].title}</h3>
              <p className="text-lg font-light mb-6">{featuredItems[0].price}</p>
              
              <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                <Button 
                  className="rounded-none bg-white text-black hover:bg-white/90 uppercase tracking-widest font-semibold px-8 py-6 w-max opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"
                  onClick={(e) => { e.preventDefault(); /* Would trigger cart drawer here */ }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Quick Add
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Secondary Stacked Items */}
          <div className="flex flex-col gap-8 md:col-span-5 lg:col-span-4 md:gap-4 lg:gap-8">
            {featuredItems.slice(1).map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative aspect-square md:aspect-auto md:flex-1 overflow-hidden bg-muted"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <Image
                  src={item.altImage}
                  alt={item.title}
                  fill
                  className="object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-0 left-0 p-6 text-white z-10 w-full translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-lg font-semibold tracking-wide uppercase mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-light">{item.price}</p>
                    <button className="opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 hover:text-white/70">
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
