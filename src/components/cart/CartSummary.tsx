"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface CartSummaryProps {
  subtotal: number
  onClose?: () => void
  onCheckout?: () => void
}

export function CartSummary({ subtotal, onClose, onCheckout }: CartSummaryProps) {
  return (
    <div className="border-t p-6 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium uppercase tracking-wider">Subtotal</span>
        <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Taxes and shipping calculated at checkout.
      </p>
      <Button 
        onClick={onCheckout}
        className="w-full rounded-none h-14 text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 group"
      >
        Checkout
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Button>
      {onClose && (
        <div className="mt-4 text-center">
          <button 
            onClick={onClose} 
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 tracking-wide uppercase"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}
