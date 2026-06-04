import Image from "next/image"
import Link from "next/link"
import { Camera } from "lucide-react"

const images = [
  "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600",
]

export function InstagramGallery() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-2">
          Shop The Gram
        </h2>
        <p className="text-muted-foreground mb-4">
          Follow us <Link href="#" className="font-medium text-foreground hover:underline">@lumiere</Link> and tag us to be featured.
        </p>
      </div>
      
      <div className="flex flex-nowrap md:grid md:grid-cols-5 gap-2 overflow-x-auto pb-4 px-2 md:px-0 md:pb-0 snap-x">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square w-[70vw] md:w-auto flex-shrink-0 snap-center group overflow-hidden bg-muted">
            <Image
              src={src}
              alt={`Instagram post ${i + 1}`}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 70vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
