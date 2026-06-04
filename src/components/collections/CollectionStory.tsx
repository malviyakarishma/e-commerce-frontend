"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export function CollectionStory() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Horizontal translation mapped to vertical scroll progress
  // We move the inner container to the left by -66% to show all 3 panels
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"])

  return (
    <section id="story" ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-16 flex h-[calc(100vh-64px)] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[300vw]">
          
          {/* Panel 1 */}
          <div className="flex h-full w-[100vw] items-center justify-center p-8 md:p-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto h-full">
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">The Concept</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Born from a desire to strip away the unnecessary, our latest collections focus on pure form, exceptional materials, and enduring design. It's not about seasons; it's about building a wardrobe that lasts.
                </p>
              </div>
              <div className="relative h-full min-h-[40vh] bg-muted overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
                  alt="Editorial"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="flex h-full w-[100vw] items-center justify-center p-8 md:p-24 bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto h-full flex-row-reverse">
              <div className="relative h-full min-h-[40vh] bg-muted overflow-hidden order-2 md:order-1">
                <Image 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
                  alt="Craftsmanship"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex flex-col justify-center order-1 md:order-2">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">The Craft</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Every stitch is considered. We partner with heritage mills and artisans who share our obsession with quality. The result is clothing that feels as good as it looks, designed to wear in, not wear out.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="flex h-full w-[100vw] items-center justify-center p-8 md:p-24 bg-foreground text-background">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8">Modern<br/>Minimalism</h2>
              <p className="text-xl md:text-2xl font-light text-background/80 leading-relaxed">
                Elevate your everyday. Experience the freedom of a perfectly curated wardrobe where every piece works effortlessly together.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
