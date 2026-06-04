"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Eye, ShoppingBag } from "lucide-react"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage: string
  isNew?: boolean
  href: string
}

interface ProductCarouselProps {
  title: string
  products: Product[]
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight uppercase">{title}</h2>
          <Link href="/collections" className="text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
            View All
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 bg-background/90 backdrop-blur-sm border-none shadow-md hover:bg-background h-10 w-10" />
            <CarouselNext className="-right-4 bg-background/90 backdrop-blur-sm border-none shadow-md hover:bg-background h-10 w-10" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
