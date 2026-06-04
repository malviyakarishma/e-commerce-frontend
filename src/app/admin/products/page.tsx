"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockProducts = [
  {
    id: "PROD-001",
    name: "Oversized Wool Blazer",
    sku: "BLZ-WOL-GR-M",
    category: "Outerwear",
    price: "$249.99",
    status: "Active",
    inventory: 45,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: "PROD-002",
    name: "Silk Slip Dress",
    sku: "DRS-SLK-BL-S",
    category: "Dresses",
    price: "$189.99",
    status: "Active",
    inventory: 12,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: "PROD-003",
    name: "Leather Crossbody Bag",
    sku: "BAG-LTH-BR-OS",
    category: "Accessories",
    price: "$159.00",
    status: "Draft",
    inventory: 0,
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: "PROD-004",
    name: "Linen Wrap Top",
    sku: "TOP-LIN-WH-L",
    category: "Tops",
    price: "$89.99",
    status: "Active",
    inventory: 120,
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: "PROD-005",
    name: "Pleated Midi Skirt",
    sku: "SKT-PLT-BK-M",
    category: "Bottoms",
    price: "$110.00",
    status: "Archived",
    inventory: 0,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=100",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Link href="/admin/products/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-md border shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-9 bg-muted/50 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="bg-background rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-12 rounded bg-muted overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.sku}</div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      product.status === "Active" ? "default" : 
                      product.status === "Draft" ? "secondary" : "outline"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={`text-sm ${product.inventory === 0 ? "text-destructive font-medium" : ""}`}>
                    {product.inventory} in stock
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{product.price}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit product</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete product</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
