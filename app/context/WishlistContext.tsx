"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistContextType {
  wishlist: number[]; // Store Product IDs
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load from Local Storage on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("nayab_wishlist");
      if (storedWishlist) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, []);

  // Save to Local Storage whenever wishlist changes
  useEffect(() => {
    // Only save if wishlist has been initialized (to prevent overwriting with empty array on first render)
    // But since we set initial state [], it's fine for new users.
    if (typeof window !== "undefined") {
         localStorage.setItem("nayab_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (id: number) => {
    if (!wishlist.includes(id)) {
      setWishlist((prev) => [...prev, id]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};