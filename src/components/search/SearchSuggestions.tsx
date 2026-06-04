"use client"

import { Button } from "@/components/ui/button"

export interface SearchSuggestionsProps {
  suggestions: string[]
  onSelect: (term: string) => void
}

export function SearchSuggestions({ suggestions, onSelect }: SearchSuggestionsProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Popular Searches</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((term) => (
          <Button 
            key={term} 
            variant="outline" 
            className="rounded-full text-xs hover:bg-foreground hover:text-background transition-colors"
            onClick={() => onSelect(term)}
          >
            {term}
          </Button>
        ))}
      </div>
    </div>
  )
}
