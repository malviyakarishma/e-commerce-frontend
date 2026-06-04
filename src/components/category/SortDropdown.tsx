"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price Low To High" },
  { id: "price-desc", label: "Price High To Low" },
  { id: "best-selling", label: "Best Selling" },
]

export interface SortDropdownProps {
  onSortChange?: (sortId: string) => void
}

export function SortDropdown({ onSortChange }: SortDropdownProps) {
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0])

  const handleSort = (option: typeof SORT_OPTIONS[0]) => {
    setSelectedSort(option)
    onSortChange?.(option.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-full md:w-auto uppercase tracking-wide text-xs justify-between min-w-[180px]" />}>
          {selectedSort.label}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem 
            key={option.id}
            onClick={() => handleSort(option)}
            className="flex items-center justify-between text-xs uppercase tracking-wider cursor-pointer"
          >
            {option.label}
            {selectedSort.id === option.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
