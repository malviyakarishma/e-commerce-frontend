import Image from "next/image"

export interface CategoryBannerProps {
  title: string
  description?: string
  image: string
}

export function CategoryBanner({ title, description, image }: CategoryBannerProps) {
  return (
    <div className="relative h-[40vh] bg-muted flex items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4 capitalize">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl font-medium tracking-wide">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
