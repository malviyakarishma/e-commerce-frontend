"use client"

import { useState } from "react"
import { SizeSelector } from "./SizeSelector"
import { ColorSelector, type Color } from "./ColorSelector"

export interface VariantSelectorProps {
  sizes: string[]
  colors: Color[]
  onVariantChange?: (variant: { size?: string, color?: string }) => void
}

export function VariantSelector({ sizes, colors, onVariantChange }: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>()
  const [selectedColor, setSelectedColor] = useState<string>()

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    onVariantChange?.({ size, color: selectedColor })
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    onVariantChange?.({ size: selectedSize, color })
  }

  return (
    <div>
      {colors.length > 0 && (
        <ColorSelector 
          colors={colors} 
          selectedColor={selectedColor} 
          onSelect={handleColorChange} 
        />
      )}
      
      {sizes.length > 0 && (
        <SizeSelector 
          sizes={sizes} 
          selectedSize={selectedSize} 
          onSelect={handleSizeChange} 
        />
      )}
    </div>
  )
}
