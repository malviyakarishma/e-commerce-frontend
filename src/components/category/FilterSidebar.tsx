"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FilterSidebarProps {
  categories: { label: string; href: string }[]
  prices: { label: string; href: string }[]
  sizes: string[]
}

export function FilterSidebar({ categories, prices, sizes }: FilterSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <Accordion multiple defaultValue={["category", "price", "size"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="uppercase text-xs tracking-wider">Category</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link href={cat.href} className="hover:text-foreground transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger className="uppercase text-xs tracking-wider">Price</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {prices.map((price) => (
                <li key={price.label}>
                  <Link href={price.href} className="hover:text-foreground transition-colors">
                    {price.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="size">
          <AccordionTrigger className="uppercase text-xs tracking-wider">Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button key={size} variant="outline" className="h-8 w-10 text-xs hover:bg-foreground hover:text-background transition-colors">
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
