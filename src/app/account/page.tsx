"use client"

import { useState } from "react"
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="bg-background py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tighter uppercase mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-muted text-foreground border-l-2 border-primary" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-2 border-transparent"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="uppercase tracking-wide">{tab.label}</span>
                </button>
              )
            })}
            <div className="pt-4 mt-4 border-t">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                <LogOut className="h-5 w-5" />
                <span className="uppercase tracking-wide">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-h-[400px]">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold uppercase tracking-wide border-b pb-4">Welcome back, Jane</h2>
                <p className="text-muted-foreground">
                  From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="border p-6 rounded-none bg-muted/30 hover:bg-muted transition-colors cursor-pointer" onClick={() => setActiveTab("orders")}>
                    <Package className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold uppercase tracking-wide mb-2">Recent Orders</h3>
                    <p className="text-sm text-muted-foreground mb-4">Track, return, or buy items again</p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      View Orders <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                  <div className="border p-6 rounded-none bg-muted/30 hover:bg-muted transition-colors cursor-pointer" onClick={() => setActiveTab("addresses")}>
                    <MapPin className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold uppercase tracking-wide mb-2">Your Addresses</h3>
                    <p className="text-sm text-muted-foreground mb-4">Edit addresses for orders and gifts</p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Manage Addresses <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold uppercase tracking-wide border-b pb-4">Order History</h2>
                
                <div className="border rounded-none">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground uppercase tracking-wider text-xs border-b">
                        <tr>
                          <th className="px-6 py-4 font-medium">Order ID</th>
                          <th className="px-6 py-4 font-medium">Date</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Total</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-medium">#LUM-849201</td>
                          <td className="px-6 py-4 text-muted-foreground">May 15, 2026</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider">Delivered</span>
                          </td>
                          <td className="px-6 py-4">$269.99</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="outline" size="sm" className="rounded-none text-xs uppercase tracking-wider">View</Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-medium">#LUM-738192</td>
                          <td className="px-6 py-4 text-muted-foreground">April 2, 2026</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold uppercase tracking-wider">Returned</span>
                          </td>
                          <td className="px-6 py-4">$159.00</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="outline" size="sm" className="rounded-none text-xs uppercase tracking-wider">View</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== "dashboard" && activeTab !== "orders" && (
               <div className="space-y-6 flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                    <Settings className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-semibold uppercase tracking-wide">Section Under Construction</h2>
                  <p className="text-muted-foreground max-w-md">
                    We are currently building this section of the dashboard to provide you with the best experience.
                  </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
