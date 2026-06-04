"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"

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

export default function NewProductPage() {
  const [variants, setVariants] = useState<{size: string, color: string, price: string, stock: string}[]>([])

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", price: "", stock: "" }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">Discard</Button>
          <Button>Save Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic details about the product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g. Oversized Wool Blazer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the product..." 
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>
                Upload product images. The first image will be the thumbnail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>
                Add product variants like size and color.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.length > 0 && (
                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <div key={index} className="flex items-end gap-2 p-4 border rounded-md relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border shadow-sm text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeVariant(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <div className="space-y-2">
                          <Label>Size</Label>
                          <Input placeholder="e.g. M" />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input placeholder="e.g. Charcoal" />
                        </div>
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <Input placeholder="0.00" type="number" />
                        </div>
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input placeholder="0" type="number" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button type="button" variant="outline" className="w-full gap-2" onClick={addVariant}>
                <Plus className="h-4 w-4" />
                Add Variant
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>
                Edit how the product appears in search engine results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Page Title</Label>
                <Input id="metaTitle" placeholder="SEO Title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDesc">Meta Description</Label>
                <Textarea id="metaDesc" placeholder="SEO Description" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Regular Price</Label>
                <Input id="price" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Compare at Price</Label>
                <Input id="comparePrice" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="chargeTax">Charge tax on this product</Label>
                  <Switch id="chargeTax" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input id="sku" placeholder="e.g. BLZ-WOL-GR-M" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                <Input id="barcode" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="trackQty">Track quantity</Label>
                  <Switch id="trackQty" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Vintage, Cotton, Summer..." />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
