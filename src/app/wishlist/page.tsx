"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { user, token, setAuthModalOpen, isLoading: isAuthLoading } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/wishlists`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success) {
          // Format the backend data to match ProductCard expectations
          // We filter out any old entries from the DB that don't have the new product snapshot fields (like price)
          const validItems = data.data.filter((item: any) => item.price !== undefined && item.name);
          
          const formattedProducts = validItems.map((item: any) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            hoverImage: item.image, // fallback to same image
            href: item.href || `/product/${item.productId}`
          }));
          setWishlist(formattedProducts);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchWishlist();
    }
  }, [user, token, isAuthLoading]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Heart className="h-16 w-16 text-neutral-200 mb-6" />
        <h1 className="text-3xl font-bold uppercase tracking-tighter mb-4">Your Wishlist</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Sign in to view and manage your saved items. Keep track of what you love and get notified about sales.
        </p>
        <Button onClick={() => setAuthModalOpen(true)} size="lg" className="rounded-none uppercase tracking-widest font-semibold px-8">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">Wishlist</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {wishlist.length === 0 
            ? "Your wishlist is currently empty. Start saving your favorite styles!" 
            : `You have ${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved in your wishlist.`}
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="rounded-none uppercase tracking-widest font-semibold" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
