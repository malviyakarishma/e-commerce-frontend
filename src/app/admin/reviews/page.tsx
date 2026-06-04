"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Star, MessageSquare } from "lucide-react"

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

const mockReviews = [
  { id: "REV-101", product: "Oversized Wool Blazer", customer: "Olivia Martin", rating: 5, comment: "Absolutely love the fit and the quality of the wool. Best purchase this season!", date: "Jun 3, 2026", status: "Published" },
  { id: "REV-102", product: "Silk Slip Dress", customer: "Jackson Lee", rating: 4, comment: "Beautiful color, but runs slightly small. I'd recommend sizing up.", date: "Jun 2, 2026", status: "Pending" },
  { id: "REV-103", product: "Leather Crossbody Bag", customer: "Isabella Nguyen", rating: 1, comment: "Strap broke after a week of use. Very disappointed with the quality.", date: "May 30, 2026", status: "Pending" },
  { id: "REV-104", product: "Linen Wrap Top", customer: "William Kim", rating: 5, comment: "Perfect for summer! Light, breathable, and looks amazing.", date: "May 28, 2026", status: "Published" },
  { id: "REV-105", product: "Pleated Midi Skirt", customer: "Sofia Davis", rating: 2, comment: "The pleats fall out easily after one wash. Not as advertised.", date: "May 25, 2026", status: "Hidden" },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Manage and moderate customer product reviews.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-md border shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search reviews..." 
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
              <TableHead>Rating</TableHead>
              <TableHead className="w-[40%]">Review</TableHead>
              <TableHead>Product / Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} 
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm line-clamp-2">{review.comment}</p>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{review.product}</div>
                  <div className="text-xs text-muted-foreground">by {review.customer}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">{review.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      review.status === "Published" ? "default" : 
                      review.status === "Pending" ? "secondary" : "outline"
                    }
                  >
                    {review.status}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem>View full review</DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply to customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {review.status !== "Published" && <DropdownMenuItem>Publish</DropdownMenuItem>}
                      {review.status !== "Hidden" && <DropdownMenuItem>Hide</DropdownMenuItem>}
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
