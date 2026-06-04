"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, ShoppingBag, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/useStore"
import { cn } from "@/lib/utils"
import { LikeButton } from "@/components/common/LikeButton"
import { useAuth } from "@/context/AuthContext"

export interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    hoverImage: string
    isNew?: boolean
    href: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart)
  const { user, token, setAuthModalOpen } = useAuth()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!user) {
      setAuthModalOpen(true)
      return
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: "M", 
      color: "Default"
    }

    // Optimistic UI update
    addToCart(cartItem)

    // Sync with DB
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const itemToSave = { ...cartItem, id: Math.random().toString(36).substring(7) } // assign temporary ID
      await fetch(`${apiUrl}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(itemToSave)
      })
    } catch (err) {
      console.error("Failed to add to cart in DB", err)
    }
  }

  return (
    <div className="group relative flex flex-col gap-3">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={product.hoverImage || product.image}
          alt={`${product.name} alternate view`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10">
          <LikeButton
            product={product}
            className="h-8 w-8 bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background [&_svg]:h-4 [&_svg]:w-4"
          />
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault()
              useStore.getState().toggleCompare({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }}
          >
            <ArrowLeftRight className={cn("h-4 w-4", useStore.getState().isInCompare(product.id) && "text-primary")} />
            <span className="sr-only">Compare</span>
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-10">
          <Button
            className="w-full rounded-none uppercase font-semibold tracking-wide"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <Link href={product.href} className="flex flex-col gap-1">
        <h3 className="text-sm font-medium leading-none truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm font-semibold">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </Link>
    </div>
  )
}
