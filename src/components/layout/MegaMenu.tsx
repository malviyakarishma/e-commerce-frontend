"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const womenCategories = [
  { title: "Dresses", href: "/women/dresses" },
  { title: "Tops", href: "/women/tops" },
  { title: "Shirts", href: "/women/shirts" },
  { title: "T-Shirts", href: "/women/t-shirts" },
  { title: "Pants", href: "/women/pants" },
  { title: "Jeans", href: "/women/jeans" },
  { title: "Skirts", href: "/women/skirts" },
  { title: "Shorts", href: "/women/shorts" },
  { title: "Jackets", href: "/women/jackets" },
  { title: "Blazers", href: "/women/blazers" },
  { title: "Knitwear", href: "/women/knitwear" },
]

const womenCollections = [
  { title: "Summer", href: "/collections/summer" },
  { title: "Winter", href: "/collections/winter" },
  { title: "Office", href: "/collections/office" },
  { title: "Casual", href: "/collections/casual" },
  { title: "Party", href: "/collections/party" },
]

const womenTrending = [
  { title: "Best Sellers", href: "/trending/best-sellers" },
  { title: "Most Loved", href: "/trending/most-loved" },
  { title: "Recently Added", href: "/trending/new" },
]

export function MegaMenu() {
  return (
    <NavigationMenu className="hidden lg:flex z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm font-medium tracking-wide uppercase hover:bg-transparent data-[state=open]:bg-transparent">
            Women
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[800px] p-6 md:w-[1000px] lg:w-[1200px]">
              <div className="grid grid-cols-4 gap-8">
                {/* Categories */}
                <div className="col-span-1">
                  <h4 className="font-semibold tracking-wide uppercase mb-4 text-sm border-b pb-2">Clothing</h4>
                  <ul className="flex flex-col space-y-2">
                    {womenCategories.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink render={<Link href={item.href} />} className="text-muted-foreground hover:text-foreground text-sm transition-colors block py-1">
                          {item.title}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Collections & Trending */}
                <div className="col-span-1 flex flex-col gap-8">
                  <div>
                    <h4 className="font-semibold tracking-wide uppercase mb-4 text-sm border-b pb-2">Collections</h4>
                    <ul className="flex flex-col space-y-2">
                      {womenCollections.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink render={<Link href={item.href} />} className="text-muted-foreground hover:text-foreground text-sm transition-colors block py-1">
                            {item.title}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold tracking-wide uppercase mb-4 text-sm border-b pb-2">Trending</h4>
                    <ul className="flex flex-col space-y-2">
                      {womenTrending.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink render={<Link href={item.href} />} className="text-muted-foreground hover:text-foreground text-sm transition-colors block py-1">
                            {item.title}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Promotional Images */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="relative group overflow-hidden bg-muted rounded-md h-full min-h-[300px]">
                    {/* Placeholder for promotional image */}
                    <div className="absolute inset-0 bg-neutral-200/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="text-muted-foreground">Promo 1</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="bg-background/90 backdrop-blur-sm p-4 text-center">
                        <h5 className="font-semibold uppercase tracking-wider text-sm">Summer Sale</h5>
                        <p className="text-xs text-muted-foreground mt-1">Up to 50% Off</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden bg-muted rounded-md h-full min-h-[300px]">
                    {/* Placeholder for promotional image */}
                    <div className="absolute inset-0 bg-neutral-200/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="text-muted-foreground">Promo 2</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="bg-background/90 backdrop-blur-sm p-4 text-center">
                        <h5 className="font-semibold uppercase tracking-wider text-sm">New Arrivals</h5>
                        <p className="text-xs text-muted-foreground mt-1">Shop The Look</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            render={<Link href="/new-arrivals" />}
            className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium tracking-wide uppercase hover:bg-transparent")}
          >
            New Arrivals
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            render={<Link href="/collections" />}
            className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium tracking-wide uppercase hover:bg-transparent")}
          >
            Collections
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            render={<Link href="/sale" />}
            className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium tracking-wide uppercase text-destructive hover:bg-transparent hover:text-destructive/80")}
          >
            Sale
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
