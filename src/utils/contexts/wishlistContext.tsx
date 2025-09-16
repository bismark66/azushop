import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authenticationContext";

type WishlistContextType = {
  wishlist: (string | number)[];
  addToWishlist: (id: string | number) => void;
  removeFromWishlist: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  // Always use user._id (string) or 'guest' as key
  const userId = user && typeof user._id === "string" ? user._id : "guest";
  const storageKey = `wishlist_${userId}`;
  const [wishlist, setWishlist] = useState<(string | number)[]>([]);

  // Load wishlist from localStorage when user changes
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {
        setWishlist([]);
      }
    } else {
      setWishlist([]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const addToWishlist = (id: string | number) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id: string | number) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isFavorite = (id: string | number) => wishlist.includes(id);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isFavorite,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
