"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "showcase", label: "Collections" },
  { id: "story", label: "The Story" },
  { id: "featured", label: "Featured Looks" },
]

export function CollectionNavigation() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Very simple active section detection based on element position
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 100 // offset for the sticky header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initialize

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 60, // Account for header height
        behavior: "smooth"
      })
    }
  }

  return (
    <div className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-center gap-6 md:gap-12">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-2 py-1 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {section.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSectionIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
