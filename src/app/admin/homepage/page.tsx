"use client"

import { Save, Plus, ArrowUp, ArrowDown, Trash2, Image as ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomepageBuilderPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Builder</h1>
          <p className="text-muted-foreground">Manage the content and layout of your storefront homepage.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Preview</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Hero Banner</CardTitle>
            <CardDescription>Configure the main carousel banner.</CardDescription>
          </div>
          <Switch defaultChecked />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-md space-y-4 relative bg-muted/20">
            <div className="absolute top-4 right-4 flex gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7"><ArrowUp className="h-3 w-3" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7"><ArrowDown className="h-3 w-3" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3 w-3" /></Button>
            </div>
            
            <div className="font-medium text-sm">Slide 1 (Active)</div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input defaultValue="Summer Collection" />
                </div>
                <div className="space-y-2">
                  <Label>Subheadline</Label>
                  <Textarea defaultValue="Discover the latest trends in luxury and modern fashion." className="h-20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input defaultValue="Shop Now" />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input defaultValue="/collections/summer" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Image</Label>
                <div className="h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                  <ImageIcon className="h-8 w-8 mb-2" />
                  <span className="text-sm">Click to replace image</span>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2 border-dashed">
            <Plus className="h-4 w-4" />
            Add Slide
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Featured Collection</CardTitle>
            <CardDescription>Select a collection to highlight on the homepage.</CardDescription>
          </div>
          <Switch defaultChecked />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input defaultValue="New Arrivals" />
          </div>
          <div className="space-y-2">
            <Label>Collection</Label>
            <Select defaultValue="new-arrivals">
              <SelectTrigger>
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summer">Summer Collection</SelectItem>
                <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                <SelectItem value="best-sellers">Best Sellers</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Newsletter Signup</CardTitle>
            <CardDescription>Configure the email capture section.</CardDescription>
          </div>
          <Switch defaultChecked />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input defaultValue="Join the Club" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea defaultValue="Subscribe to our newsletter and get 10% off your first purchase." />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" className="gap-2 border-dashed w-full max-w-sm">
          <Plus className="h-4 w-4" />
          Add New Section
        </Button>
      </div>
    </div>
  )
}
