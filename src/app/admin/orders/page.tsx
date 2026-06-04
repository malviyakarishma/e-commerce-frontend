"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, FileText, CheckCircle2 } from "lucide-react"

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

const mockOrders = [
  { id: "#LUM-3091", date: "Jun 3, 2026, 2:30 PM", customer: "Olivia Martin", email: "olivia.martin@email.com", amount: "$299.00", payment: "Paid", fulfillment: "Unfulfilled", items: 2 },
  { id: "#LUM-3090", date: "Jun 3, 2026, 1:15 PM", customer: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00", payment: "Paid", fulfillment: "Fulfilled", items: 1 },
  { id: "#LUM-3089", date: "Jun 3, 2026, 10:42 AM", customer: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$1,299.00", payment: "Pending", fulfillment: "Unfulfilled", items: 4 },
  { id: "#LUM-3088", date: "Jun 2, 2026, 8:20 PM", customer: "William Kim", email: "will@email.com", amount: "$99.00", payment: "Refunded", fulfillment: "Cancelled", items: 1 },
  { id: "#LUM-3087", date: "Jun 2, 2026, 6:05 PM", customer: "Sofia Davis", email: "sofia.davis@email.com", amount: "$149.00", payment: "Paid", fulfillment: "Fulfilled", items: 1 },
  { id: "#LUM-3086", date: "Jun 2, 2026, 2:10 PM", customer: "Lucas Garcia", email: "lucas.garcia@email.com", amount: "$249.00", payment: "Paid", fulfillment: "Unfulfilled", items: 2 },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>Create Order</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-md border shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders..." 
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
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium text-foreground">{order.id}</div>
                  <div className="text-xs text-muted-foreground">{order.items} items</div>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-xs text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      order.payment === "Paid" ? "default" : 
                      order.payment === "Pending" ? "secondary" : "outline"
                    }
                  >
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.fulfillment === "Fulfilled" ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : order.fulfillment === "Unfulfilled" ? (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-muted-foreground" />
                    )}
                    <span className={order.fulfillment === "Unfulfilled" ? "font-medium" : "text-muted-foreground"}>
                      {order.fulfillment}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{order.amount}</TableCell>
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
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Print invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mark as fulfilled</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel order</DropdownMenuItem>
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
