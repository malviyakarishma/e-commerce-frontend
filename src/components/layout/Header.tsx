"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Heart, User, ShoppingBag, Menu, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { MegaMenu } from "./MegaMenu"
import { Button } from "@/components/ui/button"
import { SearchModal } from "@/components/search/SearchModal"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { useAuth } from "@/context/AuthContext"
import { useStore } from "@/hooks/useStore"
import { AuthModal } from "@/components/auth/AuthModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, token, logout, setAuthModalOpen } = useAuth()
  const setCart = useStore((state) => state.setCart)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (user && token) {
      const fetchCart = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
          const res = await fetch(`${apiUrl}/cart`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          const data = await res.json()
          if (data.success && data.data) {
            setCart(data.data.items || [])
          }
        } catch (err) {
          console.error('Failed to fetch cart', err)
        }
      }
      fetchCart()
    }
  }, [user, token, setCart])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 ease-in-out bg-background border-b",
          isScrolled ? "h-16 shadow-sm border-border" : "h-20 border-transparent"
        )}
      >
        <div className="container mx-auto h-full px-4 md:px-6">
          <div className="flex h-full items-center justify-between">
            {/* Left: Mobile Menu Toggle (Hidden on Desktop) & Desktop Mega Menu */}
            <div className="flex items-center flex-1">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="hidden lg:block">
                <MegaMenu />
              </div>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tighter uppercase">LUMIÈRE</span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end flex-1 gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex relative group"
                onClick={() => {
                  if (!user) setAuthModalOpen(true)
                  else window.location.href = '/wishlist'
                }}
              >
                <Heart className="h-5 w-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                <span className="sr-only">Wishlist</span>
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="hidden md:flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded-full h-8 w-8 ml-2 outline-none">
                    <span className="font-bold text-xs uppercase">{user.firstName?.substring(0, 2) || "U"}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setAuthModalOpen(true)}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              )}

              <CartDrawer />
            </div>
          </div>
        </div>
      </header>

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <AuthModal />
    </>
  )
}
