"use client"

import { useEffect } from "react"
import { CheckCircle2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useStore } from "@/hooks/useStore"
import { useAuth } from "@/context/AuthContext"

export default function CheckoutSuccessPage() {
  const clearCart = useStore((state) => state.clearCart)
  const setCart = useStore((state) => state.setCart)
  const { user } = useAuth()

  useEffect(() => {
    // Clear the cart locally since the order was successful
    // The backend webhook has already cleared it in the database
    if (user) {
      setCart([])
    } else {
      clearCart()
    }
  }, [user, setCart, clearCart])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="h-24 w-24 text-green-500" />
        </div>

        <h1 className="text-4xl font-bold tracking-tighter uppercase">Order Confirmed!</h1>

        <p className="text-muted-foreground">
          Thank you for your purchase. We've received your order and will email you the receipt and tracking details shortly.
        </p>

        <div className="pt-8 flex flex-col gap-4">
          <Button render={<Link href="/" />} size="lg" className="rounded-none uppercase tracking-widest font-semibold h-14 w-full">
            Continue Shopping
          </Button>
          <Button render={<Link href="/account/orders" />} variant="outline" size="lg" className="rounded-none uppercase tracking-widest font-semibold h-14 w-full">
            View My Orders
          </Button>
        </div>
      </div>
    </div>
  )
}
