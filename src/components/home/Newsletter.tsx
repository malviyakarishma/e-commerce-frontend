"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-24 bg-muted text-center border-y">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">
          Join the Club
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="rounded-none bg-background border-border focus-visible:ring-1 h-12"
            required
          />
          <Button type="submit" size="lg" className="rounded-none h-12 uppercase tracking-wide font-semibold">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </div>
    </section>
  )
}
