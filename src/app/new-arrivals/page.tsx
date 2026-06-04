import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SortDropdown } from "@/components/category/SortDropdown"
import { FilterSidebar } from "@/components/category/FilterSidebar"

// Import new animated components
import { NewArrivalsHero } from "@/components/new-arrivals/NewArrivalsHero"
import { FeaturedDrops } from "@/components/new-arrivals/FeaturedDrops"
import { TrendingShowcase } from "@/components/new-arrivals/TrendingShowcase"
import { SocialProofTicker } from "@/components/new-arrivals/SocialProofTicker"
import { AnimatedProductGrid } from "@/components/new-arrivals/AnimatedProductGrid"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function mapProduct(p: any) {
  const primaryImage = p.images?.find((img: any) => img.isPrimary)?.imageUrl || p.images?.[0]?.imageUrl || '';
  const hoverImage = p.images?.find((img: any) => !img.isPrimary)?.imageUrl || primaryImage;
  const firstVariant = p.variants?.[0];
  const salePrice = firstVariant?.salePrice;
  const price = salePrice || firstVariant?.price || 0;
  const originalPrice = salePrice ? firstVariant?.price : undefined;

  return {
    id: p._id,
    name: p.name,
    price,
    originalPrice,
    image: primaryImage,
    hoverImage,
    isNew: p.isNewArrival,
    href: `/product/${p.slug}`,
  };
}

export default async function NewArrivalsPage() {
  // Fetch initial products for the grid
  let products: any[] = [];
  try {
    const res = await fetch(`${API_URL}/products?isNewArrival=true&limit=12&page=1`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      products = (json.data?.products || []).map(mapProduct);
    }
  } catch {
    products = [];
  }

  return (
    <div className="bg-background">
      <NewArrivalsHero />
      
      <FeaturedDrops />
      
      <TrendingShowcase />
      
      <SocialProofTicker />

      {/* Shop All Section */}
      <div id="shop-all" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight uppercase md:text-5xl mb-4">
            The Full Edit
          </h2>
          <div className="h-px w-24 bg-foreground/20" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-y mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex uppercase tracking-wide text-xs">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="md:hidden uppercase tracking-wide text-xs">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="flex items-center gap-4 ml-auto w-full md:w-auto">
            <SortDropdown />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <FilterSidebar 
              categories={[
                { label: "Dresses", href: "/women/dresses" },
                { label: "Tops", href: "/women/tops" },
                { label: "Outerwear", href: "/women/outerwear" },
              ]}
              prices={[
                { label: "Under $50", href: "#" },
                { label: "$50 - $100", href: "#" },
                { label: "$100 - $200", href: "#" },
                { label: "Over $200", href: "#" },
              ]}
              sizes={["XS", "S", "M", "L", "XL"]}
            />
          </div>

          <AnimatedProductGrid initialProducts={products} apiUrl={API_URL} />
        </div>
      </div>
    </div>
  )
}
