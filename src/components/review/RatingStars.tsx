"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = "md",
  interactive = false,
  onRatingChange 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6"
  }

  return (
    <div className="flex">
      {Array.from({ length: maxRating }).map((_, i) => {
        const isFilled = i < rating
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(i + 1)}
            className={cn(
              "focus:outline-none",
              interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
            )}
          >
            <Star 
              className={cn(
                sizeClasses[size], 
                isFilled ? 'fill-primary text-primary' : 'fill-muted text-muted'
              )} 
            />
          </button>
        )
      })}
    </div>
  )
}
