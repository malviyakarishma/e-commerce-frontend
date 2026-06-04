import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="h-24 w-24 text-red-500" />
        </div>

        <h1 className="text-4xl font-bold tracking-tighter uppercase">Checkout Cancelled</h1>

        <p className="text-muted-foreground">
          Your checkout process was interrupted and your order has not been placed. Your cart is still waiting for you.
        </p>

        <div className="pt-8 flex flex-col gap-4">
          <Button render={<Link href="/" />} size="lg" className="rounded-none uppercase tracking-widest font-semibold h-14 w-full">
            Return to Store
          </Button>
        </div>
      </div>
    </div>
  )
}
