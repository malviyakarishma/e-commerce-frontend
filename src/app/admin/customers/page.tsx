"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const mockCustomers = [
  { id: "CUST-001", name: "Olivia Martin", email: "olivia.martin@email.com", location: "New York, US", orders: 12, spent: "$3,459.00", lastOrder: "Today" },
  { id: "CUST-002", name: "Jackson Lee", email: "jackson.lee@email.com", location: "Toronto, CA", orders: 3, spent: "$450.00", lastOrder: "Yesterday" },
  { id: "CUST-003", name: "Isabella Nguyen", email: "isabella.nguyen@email.com", location: "London, UK", orders: 1, spent: "$1,299.00", lastOrder: "Jun 1, 2026" },
  { id: "CUST-004", name: "William Kim", email: "will@email.com", location: "Seoul, KR", orders: 5, spent: "$890.00", lastOrder: "May 28, 2026" },
  { id: "CUST-005", name: "Sofia Davis", email: "sofia.davis@email.com", location: "Sydney, AU", orders: 8, spent: "$1,840.00", lastOrder: "May 15, 2026" },
  { id: "CUST-006", name: "Lucas Garcia", email: "lucas.garcia@email.com", location: "Madrid, ES", orders: 2, spent: "$320.00", lastOrder: "May 10, 2026" },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database and see their purchase history.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>Add Customer</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-md border shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers..." 
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
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.location}</TableCell>
                <TableCell className="text-right font-medium">{customer.orders}</TableCell>
                <TableCell className="text-right font-medium">{customer.spent}</TableCell>
                <TableCell className="text-muted-foreground">{customer.lastOrder}</TableCell>
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
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Email customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete customer</DropdownMenuItem>
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
