"use client"

import { Star } from "lucide-react"

export interface ProductInfoProps {
  title: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  description: string
}

export function ProductInfo({ title, price, originalPrice, rating, reviewCount, description }: ProductInfoProps) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">{title}</h1>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-2xl font-medium text-foreground">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center text-muted-foreground border-l pl-4 border-border">
          <div className="flex text-primary">
            {[1, 2, 3, 4, 5].map(i => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i <= rating ? 'fill-primary' : 'fill-muted text-muted'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-xs uppercase tracking-wide underline hover:text-foreground cursor-pointer transition-colors">
            {reviewCount} Reviews
          </span>
        </div>
      </div>

      <div className="text-muted-foreground mb-8 text-sm leading-relaxed">
        {description}
      </div>
    </>
  )
}
