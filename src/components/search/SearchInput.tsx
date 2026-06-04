"use client"

import { Search as SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface SearchInputProps {
  query: string
  onQueryChange: (query: string) => void
  onClear: () => void
}

export function SearchInput({ query, onQueryChange, onClear }: SearchInputProps) {
  return (
    <div className="flex items-center border-b px-4 py-4">
      <SearchIcon className="h-5 w-5 text-muted-foreground mr-3" />
      <Input 
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search for products, categories..." 
        className="flex-1 border-0 shadow-none focus-visible:ring-0 text-lg h-12 rounded-none px-0"
        autoFocus
      />
      {query && (
        <Button variant="ghost" size="icon" onClick={onClear} className="h-8 w-8 ml-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}
