"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- Types Define Karein ---
export interface Product {
  id: string | number;
  title?: string;
  name?: string;
  prices: { [key: string]: number };
  image: string;
}

export interface CartItem {
  cartItemId: string; // Unique ID (Product ID + Size)
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Page load par LocalStorage se cart fetch karna
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  // Jab bhi cart update ho, usay LocalStorage mein save karna
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart((prevCart) => {
      const cartItemId = `${product.id}-${size}`;
      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const price = product.prices[size] || 0;
      const title = product.name || product.title || "Nayab Perfume";

      const newItem: CartItem = {
        cartItemId,
        id: String(product.id),
        title,
        size,
        price,
        quantity,
        image: product.image,
      };

      return [...prevCart, newItem];
    });
    // Optional: Cart open karni ho jab item add ho tou yahan setIsCartOpen(true) likh sakte hain
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return; 
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        isCartOpen, 
        toggleCart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartTotal, 
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};