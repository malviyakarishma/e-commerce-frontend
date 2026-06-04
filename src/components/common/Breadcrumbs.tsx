"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-xs text-muted-foreground uppercase tracking-wider overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
      <Link href="/" className="hover:text-foreground transition-colors shrink-0">
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center shrink-0">
          <ChevronRight className="h-3 w-3 mx-2 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
