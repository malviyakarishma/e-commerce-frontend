"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, Users, Activity, TrendingUp, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const kpis = [
  { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month", icon: DollarSign },
  { title: "Orders", value: "+2350", description: "+180.1% from last month", icon: ShoppingBag },
  { title: "Customers", value: "+12,234", description: "+19% from last month", icon: Users },
  { title: "Conversion Rate", value: "3.2%", description: "+0.5% from last month", icon: Activity },
]

const recentOrders = [
  { id: "#LUM-3091", customer: "Olivia Martin", email: "olivia.martin@email.com", amount: "$299.00", status: "Completed", date: "Today, 2:30 PM" },
  { id: "#LUM-3090", customer: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00", status: "Processing", date: "Today, 1:15 PM" },
  { id: "#LUM-3089", customer: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$1,299.00", status: "Completed", date: "Today, 10:42 AM" },
  { id: "#LUM-3088", customer: "William Kim", email: "will@email.com", amount: "$99.00", status: "Pending", date: "Yesterday, 8:20 PM" },
  { id: "#LUM-3087", customer: "Sofia Davis", email: "sofia.davis@email.com", amount: "$149.00", status: "Completed", date: "Yesterday, 6:05 PM" },
]

const lowStockProducts = [
  { name: "Silk Slip Dress", sku: "DRS-SLK-BL-S", stock: 2, status: "Critical" },
  { name: "Oversized Wool Blazer", sku: "BLZ-WOL-GR-M", stock: 5, status: "Low" },
  { name: "Leather Crossbody", sku: "BAG-LTH-BR-OS", stock: 1, status: "Critical" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store&apos;s performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div>{order.id}</div>
                      <div className="text-xs text-muted-foreground font-normal">{order.date}</div>
                    </TableCell>
                    <TableCell>
                      <div>{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Completed" ? "default" : order.status === "Processing" ? "secondary" : "outline"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Items that need to be restocked soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.sku}>
                    <TableCell>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.sku}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={product.status === "Critical" ? "destructive" : "secondary"}>
                        {product.stock} left
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
