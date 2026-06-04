"use client"

import Link from "next/link"
import Image from "next/image"
import { X, Plus, Minus } from "lucide-react"
import { type CartItem as ICartItem } from "@/hooks/useStore"

export interface CartItemProps {
  item: ICartItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onClose?: () => void
}

export function CartItem({ item, onUpdateQuantity, onRemove, onClose }: CartItemProps) {
  return (
    <div className="flex gap-4">
      <div className="relative w-24 h-32 bg-muted flex-shrink-0">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <Link 
            href={`/product/${item.name.toLowerCase().replace(/ /g, "-")}`} 
            onClick={onClose} 
            className="font-medium text-sm leading-tight hover:underline"
          >
            {item.name}
          </Link>
          <button 
            onClick={() => onRemove(item.id)} 
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-xs text-muted-foreground mb-4">
          {item.color && <span>{item.color}</span>}
          {item.color && item.size && <span> | </span>}
          {item.size && <span>{item.size}</span>}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border">
            <button 
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
              className="p-1 hover:bg-muted transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
              className="p-1 hover:bg-muted transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="font-semibold text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
