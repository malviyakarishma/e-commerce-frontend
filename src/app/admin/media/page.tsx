"use client"

import { useState } from "react"
import { Upload, Search, Filter, Image as ImageIcon, MoreVertical, Folder } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

const mockMedia = [
  { id: 1, name: "hero-summer-2026.jpg", url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=400", size: "2.4 MB", date: "Jun 3, 2026" },
  { id: 2, name: "product-blazer-front.jpg", url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=400", size: "1.1 MB", date: "Jun 2, 2026" },
  { id: 3, name: "product-blazer-back.jpg", url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=400", size: "1.3 MB", date: "Jun 2, 2026" },
  { id: 4, name: "editorial-campaign-1.jpg", url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400", size: "4.2 MB", date: "May 28, 2026" },
  { id: 5, name: "product-dress-main.jpg", url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400", size: "856 KB", date: "May 25, 2026" },
  { id: 6, name: "category-accessories.jpg", url: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400", size: "3.1 MB", date: "May 20, 2026" },
  { id: 7, name: "product-skirt-alt.jpg", url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=400", size: "1.5 MB", date: "May 15, 2026" },
  { id: 8, name: "instagram-feed-1.jpg", url: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=400", size: "2.8 MB", date: "May 10, 2026" },
]

export default function MediaLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage all your product and marketing assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Folder className="h-4 w-4" />
            New Folder
          </Button>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-md border shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search files..." 
            className="pl-9 bg-muted/50 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4" />
            Type
          </Button>
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mockMedia.map((file) => (
          <div key={file.id} className="group border rounded-md overflow-hidden bg-background shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-square bg-muted overflow-hidden">
              <Image 
                src={file.url} 
                alt={file.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3 flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 -mt-1 shrink-0 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                } />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy URL</DropdownMenuItem>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
