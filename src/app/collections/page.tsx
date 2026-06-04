// Import new animated components for the Collections page
import { CollectionNavigation } from "@/components/collections/CollectionNavigation"
import { StickyCollectionShowcase } from "@/components/collections/StickyCollectionShowcase"
import { CollectionStory } from "@/components/collections/CollectionStory"
import { MasonryFeaturedLooks } from "@/components/collections/MasonryFeaturedLooks"

export default async function CollectionsPage() {
  return (
    <div className="bg-background">
      <CollectionNavigation />
      
      <StickyCollectionShowcase />
      
      <CollectionStory />
      
      <MasonryFeaturedLooks />
    </div>
  )
}
