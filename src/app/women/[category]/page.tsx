import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/ProductGrid"
import { CategoryBanner } from "@/components/category/CategoryBanner"
import { SortDropdown } from "@/components/category/SortDropdown"
import { FilterSidebar } from "@/components/category/FilterSidebar"

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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const categoryName = resolvedParams.category.replace("-", " ")

  // Fetch products from the backend
  let products: any[] = [];
  try {
    const res = await fetch(`${API_URL}/products?limit=20`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      products = (json.data?.products || []).map(mapProduct);
    }
  } catch {
    products = [];
  }

  return (
    <div className="bg-background">
      <CategoryBanner 
        title={categoryName}
        description={`Discover our latest collection of ${categoryName}.`}
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600"
      />

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex uppercase tracking-wide text-xs">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="md:hidden uppercase tracking-wide text-xs">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <span className="text-sm text-muted-foreground">{products.length} Products</span>
          </div>

          <div className="flex items-center gap-4 ml-auto w-full md:w-auto">
            <SortDropdown />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block">
            <FilterSidebar 
              categories={[
                { label: "Dresses", href: "#" },
                { label: "Tops", href: "#" },
                { label: "Outerwear", href: "#" },
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

          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
