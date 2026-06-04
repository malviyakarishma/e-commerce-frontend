import Image from "next/image"
import Link from "next/link"
import { Star, ChevronRight, Heart, Share2, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/common/Breadcrumbs"
import { ProductInfo } from "@/components/product/ProductInfo"
import { VariantSelector } from "@/components/product/VariantSelector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const productName = resolvedParams.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="bg-background pt-4 pb-16">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Breadcrumbs items={[
          { label: "Women", href: "/women" },
          { label: "Clothing", href: "/women/clothing" },
          { label: productName }
        ]} />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (Desktop) */}
            <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0">
              {[1, 2, 3, 4].map(i => (
                <button key={i} className={`relative aspect-[3/4] overflow-hidden bg-muted border ${i === 1 ? 'border-primary' : 'border-transparent'}`}>
                  <Image 
                    src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=200" 
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] bg-muted overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=1200" 
                alt={productName}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            
            {/* Thumbnails (Mobile) */}
            <div className="flex md:hidden gap-4 overflow-x-auto pb-2 snap-x">
              {[1, 2, 3, 4].map(i => (
                <button key={i} className={`relative w-20 aspect-[3/4] flex-shrink-0 snap-center overflow-hidden bg-muted border ${i === 1 ? 'border-primary' : 'border-transparent'}`}>
                  <Image 
                    src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=200" 
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-2/5 flex flex-col pt-4">
            <ProductInfo 
              title={productName}
              price={249.99}
              rating={4}
              reviewCount={128}
              description="Elevate your wardrobe with this impeccably tailored oversized wool blazer. Featuring sharp shoulders, a relaxed fit, and premium Italian wool blend, it's the perfect statement piece for transitioning between seasons."
            />

            <VariantSelector 
              sizes={["XS", "S", "M", "L", "XL"]}
              colors={[
                { name: "Charcoal", hex: "#27272a" },
                { name: "Stone", hex: "#e7e5e4" },
                { name: "Rust", hex: "#78350f" }
              ]}
            />

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <Button size="lg" className="w-full rounded-none h-14 text-base font-semibold uppercase tracking-widest">
                Add To Cart
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 rounded-none uppercase tracking-wide text-xs h-12">
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </Button>
                <Button variant="outline" className="flex-1 rounded-none uppercase tracking-wide text-xs h-12">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none uppercase tracking-wider text-xs px-4 pb-2">
                  Details
                </TabsTrigger>
                <TabsTrigger value="materials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none uppercase tracking-wider text-xs px-4 pb-2">
                  Materials
                </TabsTrigger>
                <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none uppercase tracking-wider text-xs px-4 pb-2">
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4 text-sm text-muted-foreground leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Oversized, relaxed fit</li>
                  <li>Single-breasted button fastening</li>
                  <li>Notched lapels</li>
                  <li>Flap pockets at waist</li>
                  <li>Fully lined</li>
                  <li>Model is 5'10" and wears size S</li>
                </ul>
              </TabsContent>
              <TabsContent value="materials" className="pt-4 text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2"><strong className="text-foreground font-medium">Outer:</strong> 60% Wool, 30% Polyester, 10% Cashmere</p>
                <p className="mb-4"><strong className="text-foreground font-medium">Lining:</strong> 100% Viscose</p>
                <p>Dry clean only. Do not tumble dry. Iron on low heat.</p>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4 text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2"><strong className="text-foreground font-medium">Standard Delivery:</strong> 3-5 business days - Free over $100</p>
                <p className="mb-4"><strong className="text-foreground font-medium">Express Delivery:</strong> 1-2 business days - $15.00</p>
                <p>Returns are accepted within 30 days of purchase for unworn items with tags attached.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
