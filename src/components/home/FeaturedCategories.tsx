import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Dresses", href: "/women/dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800" },
  { name: "Tops", href: "/women/tops", image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=800" },
  { name: "Bottoms", href: "/women/bottoms", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800" },
  { name: "Outerwear", href: "/women/outerwear", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800" },
  { name: "New Arrivals", href: "/women/new-arrivals", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" },
  { name: "Sale", href: "/sale", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800" },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8 md:mb-12 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={category.href}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <span className="text-sm font-medium tracking-wide uppercase transition-colors group-hover:text-muted-foreground">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
