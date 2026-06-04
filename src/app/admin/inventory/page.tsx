"use client"

import { useState } from "react"
import { Search, Filter, ArrowDownUp } from "lucide-react"

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

const mockInventory = [
  { id: "INV-01", product: "Oversized Wool Blazer", variant: "Medium / Charcoal", sku: "BLZ-WOL-GR-M", available: 45, reserved: 2, status: "In Stock" },
  { id: "INV-02", product: "Silk Slip Dress", variant: "Small / Black", sku: "DRS-SLK-BL-S", available: 12, reserved: 0, status: "Low Stock" },
  { id: "INV-03", product: "Leather Crossbody Bag", variant: "One Size / Brown", sku: "BAG-LTH-BR-OS", available: 0, reserved: 0, status: "Out of Stock" },
  { id: "INV-04", product: "Linen Wrap Top", variant: "Large / White", sku: "TOP-LIN-WH-L", available: 120, reserved: 5, status: "In Stock" },
  { id: "INV-05", product: "Pleated Midi Skirt", variant: "Medium / Black", sku: "SKT-PLT-BK-M", available: 2, reserved: 1, status: "Critical" },
  { id: "INV-06", product: "Oversized Wool Blazer", variant: "Large / Charcoal", sku: "BLZ-WOL-GR-L", available: 30, reserved: 1, status: "In Stock" },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your stock levels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button variant="outline">Import</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-md border shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search inventory..." 
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
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-foreground">
                  Available <ArrowDownUp className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">Reserved</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-medium text-foreground">{item.product}</div>
                  <div className="text-xs text-muted-foreground">{item.variant}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      item.status === "In Stock" ? "default" : 
                      item.status === "Out of Stock" || item.status === "Critical" ? "destructive" : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  <Input 
                    type="number" 
                    defaultValue={item.available} 
                    className="w-20 h-8 ml-auto text-right font-medium bg-transparent border-transparent hover:border-input focus:border-input focus:bg-background transition-all"
                  />
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{item.reserved}</TableCell>
                <TableCell className="text-right font-medium text-muted-foreground">
                  {item.available + item.reserved}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
