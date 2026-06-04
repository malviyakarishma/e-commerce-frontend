import { HeroBanner } from "@/components/home/HeroBanner"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { ProductCarousel, type Product } from "@/components/product/ProductCarousel"
import { InstagramGallery } from "@/components/home/InstagramGallery"
import { Newsletter } from "@/components/home/Newsletter"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Map backend product data to the frontend Product type
function mapProduct(p: any): Product {
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

async function fetchProducts(params: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products?${params}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data?.products || []).map(mapProduct);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [trending, newArrivals] = await Promise.all([
    fetchProducts('isFeatured=true&limit=8'),
    fetchProducts('isNewArrival=true&limit=8'),
  ]);

  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <ProductCarousel title="Trending Now" products={trending} />
      
      {/* Editorial Banner Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative w-full aspect-[2/1] md:aspect-[3/1] overflow-hidden bg-muted flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="/images/editorial.png" 
              alt="The New Modern" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="relative z-20 text-center text-white p-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4">The New Modern</h2>
              <p className="text-lg mb-6 max-w-xl mx-auto">Elevate your everyday wardrobe with our latest curated pieces designed for effortless elegance.</p>
              <a href="/collections/the-new-modern" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 uppercase tracking-wide">
                Discover More
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel title="New Arrivals" products={newArrivals} />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
