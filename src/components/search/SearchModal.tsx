"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { SearchInput } from "./SearchInput"
import { SearchSuggestions } from "./SearchSuggestions"
import Link from "next/link"
import Image from "next/image"

const popularSearches = [
  "Dresses",
  "Blazers",
  "Summer Collection",
  "Trench Coat",
  "Wide Leg Trousers"
]

export interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 rounded-none overflow-hidden" aria-describedby="search-description">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription id="search-description" className="sr-only">
          Search for products, categories, or collections.
        </DialogDescription>
        
        <SearchInput 
          query={query} 
          onQueryChange={setQuery} 
          onClear={() => setQuery("")} 
        />
        
        <div className="p-6">
          {!query ? (
            <SearchSuggestions 
              suggestions={popularSearches} 
              onSelect={setQuery} 
            />
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Results for &quot;{query}&quot;</h3>
              {/* Dummy Results */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Link key={i} href="#" className="flex items-center gap-4 group p-2 hover:bg-muted transition-colors rounded-md" onClick={() => onOpenChange(false)}>
                    <div className="relative h-16 w-12 bg-neutral-200 overflow-hidden flex-shrink-0">
                      <Image src={`https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=100`} alt="Result" fill sizes="48px" className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm group-hover:underline underline-offset-2">Oversized Wool Blazer</p>
                      <p className="text-xs text-muted-foreground">$249.99</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
