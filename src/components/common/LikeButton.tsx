"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    href: string;
  };
  className?: string;
}

export function LikeButton({ product, className }: LikeButtonProps) {
  const { user, token, setAuthModalOpen } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Check initial like status
    const checkLikedStatus = async () => {
      if (!user || !token) {
        setIsLiked(false);
        return;
      }
      try {
        const res = await fetch(`${apiUrl}/wishlists`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          // data.data contains an array of product snapshots with .productId
          const liked = data.data.some((p: any) => p.productId === product.id);
          setIsLiked(liked);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist status", err);
      }
    };

    checkLikedStatus();
  }, [user, token, product.id, apiUrl]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/wishlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });
      const data = await res.json();
      
      if (data.success) {
        setIsLiked(data.added);
      }
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full bg-white/50 backdrop-blur-sm hover:bg-white transition-all shadow-sm",
        className
      )}
      onClick={handleToggleLike}
      disabled={isLoading}
      aria-label="Toggle Wishlist"
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isLiked ? "fill-red-500 text-red-500 scale-110" : "text-neutral-700"
        )}
      />
    </Button>
  );
}
