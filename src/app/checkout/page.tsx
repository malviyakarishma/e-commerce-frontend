"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Check } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const steps = ["Information", "Shipping", "Payment", "Review"]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <Link href="/" className="inline-block mb-8">
          <span className="text-2xl font-bold tracking-tighter uppercase">LUMIÈRE</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Checkout Form */}
          <div className="flex-1 max-w-2xl">
            {/* Progress */}
            <nav className="flex items-center text-xs text-muted-foreground uppercase tracking-wider mb-8 overflow-x-auto pb-2">
              <Link href="/cart" className="hover:text-foreground">Cart</Link>
              <ChevronRight className="h-3 w-3 mx-2 flex-shrink-0" />
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center">
                  <span className={idx === currentStep ? "text-foreground font-medium" : idx < currentStep ? "text-foreground" : ""}>
                    {step}
                  </span>
                  {idx < steps.length - 1 && <ChevronRight className="h-3 w-3 mx-2 flex-shrink-0" />}
                </div>
              ))}
            </nav>

            <div className="bg-background border p-6 md:p-8 rounded-none shadow-sm">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold uppercase tracking-wide">Contact Information</h2>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="rounded-none h-12" />
                  </div>
                  <div className="pt-4 space-y-6">
                    <h2 className="text-xl font-semibold uppercase tracking-wide">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" className="rounded-none h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" className="rounded-none h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" className="rounded-none h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" className="rounded-none h-12" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" className="rounded-none h-12" defaultValue="United States" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" className="rounded-none h-12" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold uppercase tracking-wide">Shipping Method</h2>
                  <div className="border rounded-none divide-y">
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full border border-input" />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                      </div>
                      <span className="font-semibold">$15.00</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold uppercase tracking-wide">Payment</h2>
                  <p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
                  
                  <div className="border rounded-none p-4 space-y-4">
                    <div className="flex items-center gap-4 border-b pb-4">
                      <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="cc-num">Card Number</Label>
                        <Input id="cc-num" placeholder="0000 0000 0000 0000" className="rounded-none h-12" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cc-exp">Expiration Date (MM/YY)</Label>
                          <Input id="cc-exp" placeholder="MM / YY" className="rounded-none h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cc-cvc">Security Code</Label>
                          <Input id="cc-cvc" placeholder="CVC" className="rounded-none h-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cc-name">Name on Card</Label>
                        <Input id="cc-name" className="rounded-none h-12" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 text-center py-12">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight">Order Confirmed</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for your purchase. We've received your order and will contact you as soon as your package is shipped.
                  </p>
                  <p className="font-medium mt-4">Order #LUM-849201</p>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between pt-6 border-t">
                {currentStep < 3 ? (
                  <>
                    <button onClick={handleBack} className="text-sm font-medium hover:underline flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      {currentStep === 0 ? "Return to cart" : "Back"}
                    </button>
                    <Button onClick={handleNext} className="rounded-none uppercase tracking-widest font-semibold px-8 h-12">
                      {currentStep === 2 ? "Pay Now" : "Continue"}
                    </Button>
                  </>
                ) : (
                  <Link 
                    href="/" 
                    className={cn(buttonVariants({ variant: "default" }), "flex items-center justify-center rounded-none uppercase tracking-widest font-semibold px-8 h-12 w-fit mx-auto")}
                  >
                    Continue Shopping
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-background border p-6 rounded-none sticky top-24">
              <h3 className="font-semibold uppercase tracking-wider mb-6 pb-4 border-b">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {/* Dummy Item 1 */}
                <div className="flex gap-4">
                  <div className="relative w-16 h-20 bg-muted">
                    <Image src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=150" alt="Item" fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-[10px] font-bold text-background">
                      1
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-medium text-sm leading-tight">Oversized Wool Blazer</p>
                    <p className="text-xs text-muted-foreground mt-1">Charcoal / M</p>
                  </div>
                  <div className="font-medium text-sm flex items-center">
                    $249.99
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm border-t pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$249.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{currentStep >= 1 ? "Free" : "Calculated at next step"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium">$20.00</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-semibold uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold">${currentStep >= 1 ? "269.99" : "249.99"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
