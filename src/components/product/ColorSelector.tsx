"use client"

import { cn } from "@/lib/utils"

export interface Color {
  name: string
  hex: string
}

export interface ColorSelectorProps {
  colors: Color[]
  selectedColor?: string
  onSelect: (color: string) => void
}

export function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">
        Color - <span className="text-muted-foreground">{selectedColor || "Select Color"}</span>
      </h3>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name)}
            className={cn(
              "w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all",
              selectedColor === color.name 
                ? "ring-1 ring-primary ring-offset-1 border-white dark:border-zinc-900" 
                : "hover:scale-110"
            )}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.name}`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}
