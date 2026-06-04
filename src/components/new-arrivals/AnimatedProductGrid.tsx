"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ProductCard } from "@/components/product/ProductCard"
import type { Product } from "@/components/product/ProductCarousel"

interface AnimatedProductGridProps {
  initialProducts: Product[]
  apiUrl: string
}

export function AnimatedProductGrid({ initialProducts, apiUrl }: AnimatedProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Standard intersection observer for infinite scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [hasMore, loading, page])

  const loadMoreProducts = async () => {
    setLoading(true)
    const nextPage = page + 1
    
    try {
      // Assuming backend supports page/limit for pagination
      const res = await fetch(`${apiUrl}/products?isNewArrival=true&limit=12&page=${nextPage}`)
      if (res.ok) {
        const json = await res.json()
        const newProducts = (json.data?.products || []).map((p: any) => {
          const primaryImage = p.images?.find((img: any) => img.isPrimary)?.imageUrl || p.images?.[0]?.imageUrl || ''
          const hoverImage = p.images?.find((img: any) => !img.isPrimary)?.imageUrl || primaryImage
          const firstVariant = p.variants?.[0]
          const salePrice = firstVariant?.salePrice
          const price = salePrice || firstVariant?.price || 0
          const originalPrice = salePrice ? firstVariant?.price : undefined
          return {
            id: p._id, name: p.name, price, originalPrice, 
            image: primaryImage, hoverImage, isNew: p.isNewArrival, href: `/product/${p.slug}`
          }
        })

        if (newProducts.length === 0) {
          setHasMore(false)
        } else {
          setProducts(prev => [...prev, ...newProducts])
          setPage(nextPage)
        }
      } else {
        setHasMore(false)
      }
    } catch {
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="flex-1">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div key={`${product.id}-${page}`} variants={item} layout>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && Array.from({ length: 4 }).map((_, i) => (
          <motion.div 
            key={`skeleton-${i}`} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3"
          >
            <div className="aspect-[3/4] w-full bg-muted animate-pulse rounded-none" />
            <div className="h-4 w-2/3 bg-muted animate-pulse" />
            <div className="h-4 w-1/3 bg-muted animate-pulse" />
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="h-24 flex items-center justify-center mt-8">
          {loading && <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm uppercase tracking-widest">
          You've seen everything
        </div>
      )}
    </div>
  )
}
