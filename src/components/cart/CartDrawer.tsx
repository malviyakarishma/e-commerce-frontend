"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/hooks/useStore"
import { CartItem } from "./CartItem"
import { CartSummary } from "./CartSummary"
import { useAuth } from "@/context/AuthContext"

export function CartDrawer() {
  const cart = useStore((state) => state.cart)
  const isCartOpen = useStore((state) => state.isCartOpen)
  const toggleCart = useStore((state) => state.toggleCart)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const { user, token } = useAuth()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    updateQuantity(id, quantity)
    if (user && token) {
      try {
        await fetch(`${apiUrl}/cart/items/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ quantity })
        })
      } catch (err) {
        console.error('Failed to update cart', err)
      }
    }
  }

  const handleRemoveFromCart = async (id: string) => {
    removeFromCart(id)
    if (user && token) {
      try {
        await fetch(`${apiUrl}/cart/items/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
      } catch (err) {
        console.error('Failed to remove cart item', err)
      }
    }
  }

  const handleCheckout = async () => {
    if (!user || !token) {
      toggleCart(false)
      // They should really be logged in to be in this state, but just in case
      return
    }

    try {
      const res = await fetch(`${apiUrl}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()

      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        console.error('Failed to create checkout session', data)
        alert('Checkout failed. Please try again later.')
      }
    } catch (err) {
      console.error('Error during checkout', err)
      alert('Checkout failed. Please try again later.')
    }
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
        <ShoppingBag className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              {cart.length}
            </span>
          )}
          <span className="sr-only">Cart</span>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-background border-l-0 sm:border-l">
        <SheetHeader className="p-6 border-b text-left flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold tracking-tighter uppercase">Shopping Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium mb-2 uppercase tracking-wide">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Button onClick={() => toggleCart(false)} className="rounded-none uppercase tracking-widest font-semibold px-8">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="flex flex-col gap-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                    onClose={() => toggleCart(false)}
                  />
                ))}
              </div>
            </ScrollArea>

            <CartSummary
              subtotal={subtotal}
              onClose={() => toggleCart(false)}
              onCheckout={handleCheckout}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
