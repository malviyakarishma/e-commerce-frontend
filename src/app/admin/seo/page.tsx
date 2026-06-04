"use client"

import { Save } from "lucide-react"

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

export default function SEOPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Settings</h1>
          <p className="text-muted-foreground">Manage your store&apos;s search engine optimization.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Store Metadata</CardTitle>
          <CardDescription>
            These settings will be used as defaults across your store if specific page metadata is not set.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input id="siteTitle" defaultValue="LUMIÈRE - Premium Fashion & Apparel" />
            <p className="text-[0.8rem] text-muted-foreground">Keep it under 60 characters for best results.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDesc">Meta Description</Label>
            <Textarea 
              id="siteDesc" 
              defaultValue="Discover the latest in premium fashion and apparel at LUMIÈRE. Shop our exclusive collections of modern, sustainable clothing." 
            />
            <p className="text-[0.8rem] text-muted-foreground">Keep it under 160 characters for best results.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Meta Keywords</Label>
            <Input id="keywords" defaultValue="fashion, premium apparel, modern clothing, sustainable fashion" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Sharing (Open Graph)</CardTitle>
          <CardDescription>
            Configure how your store appears when shared on social media like Facebook and Twitter.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ogTitle">Social Sharing Title</Label>
            <Input id="ogTitle" defaultValue="LUMIÈRE - Premium Fashion" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ogImage">Default Social Image URL</Label>
            <Input id="ogImage" defaultValue="https://lumiere.com/og-image.jpg" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="twitterCard">Enable Twitter Large Cards</Label>
              <Switch id="twitterCard" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Engine Indexing</CardTitle>
          <CardDescription>
            Control how search engines crawl and index your site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Enable Indexing</Label>
              <p className="text-[0.8rem] text-muted-foreground">Allow search engines to crawl your store.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Generate Sitemap automatically</Label>
              <p className="text-[0.8rem] text-muted-foreground">Keep your sitemap.xml updated dynamically.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
