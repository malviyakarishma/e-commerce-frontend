import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tighter uppercase">LUMIÈRE</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Discover the latest trends in luxury and modern fashion. World-class quality, premium editorial style, and seamless shopping experience.
            </p>
            <div className="flex items-center space-x-6 text-sm uppercase tracking-wider font-medium">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                X
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                YouTube
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold tracking-wide uppercase mb-4 text-sm">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/women/new-arrivals" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/women/clothing" className="hover:text-foreground transition-colors">Clothing</Link></li>
              <li><Link href="/women/shoes" className="hover:text-foreground transition-colors">Shoes</Link></li>
              <li><Link href="/women/accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
              <li><Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link></li>
              <li><Link href="/sale" className="hover:text-foreground transition-colors text-destructive">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold tracking-wide uppercase mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/sustainability" className="hover:text-foreground transition-colors">Sustainability</Link></li>
              <li><Link href="/press" className="hover:text-foreground transition-colors">Press</Link></li>
              <li><Link href="/affiliates" className="hover:text-foreground transition-colors">Affiliates</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold tracking-wide uppercase mb-4 text-sm">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-foreground transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LUMIÈRE. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <div className="flex items-center gap-2 border rounded px-2 py-1">
              <span>USD ($)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
