"use client"

import { Button } from "@/components/ui/button"
import { Ruler } from "lucide-react"

export interface SizeSelectorProps {
  sizes: string[]
  selectedSize?: string
  onSelect: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider">Size</h3>
        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center uppercase tracking-wide">
          <Ruler className="h-3 w-3 mr-1" />
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map(size => (
          <Button 
            key={size} 
            variant={size === selectedSize ? "default" : "outline"} 
            className="rounded-none font-medium"
            onClick={() => onSelect(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}
