"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS } from "@/database/data";

// --- Types Define Karein (Fixed: Removed 'any') ---
interface Product {
  id: number;
  title: string;
  image: string;
  // Prices ab strictly string-key object hai, 'any' hata diya
  prices: { [key: string]: string };
  category?: string;
  gender?: string;
}

interface CartItem {
  id: number;
  title: string;
  image: string;
  selectedSize: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateSize: (productId: number, oldSize: string, newSize: string) => void;
  updateQuantity: (productId: number, size: string, newQuantity: number) => void;
  toggleCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // --- Initialize Cart from LocalStorage ---
  useEffect(() => {
    // setTimeout asynchronous behavior ke liye taake render block na ho
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const storedCart = localStorage.getItem("nayab_cart");
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        } catch (error) {
          console.error("Failed to load cart", error);
        }
        setIsInitialized(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // --- Save to LocalStorage ---
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("nayab_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // --- Add to Cart ---
  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      }
      
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          selectedSize: size,
          price: product.prices[size], 
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) => 
      prev.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  };

  // --- Update Size ---
  const updateSize = (productId: number, oldSize: string, newSize: string) => {
    setCart((prev) => {
      const existingTargetItemIndex = prev.findIndex(
        (item) => item.id === productId && item.selectedSize === newSize
      );

      const currentItemIndex = prev.findIndex(
        (item) => item.id === productId && item.selectedSize === oldSize
      );

      if (currentItemIndex === -1) return prev;

      const newCart = [...prev];
      const productData = PRODUCTS.find((p) => p.id === productId);
      
      let newPrice = newCart[currentItemIndex].price;
      
      if (productData && productData.prices) {
         // Data file se ane wale prices object ko type-cast kar rahe hain
         const prices = productData.prices as { [key: string]: string };
         newPrice = prices[newSize];
      }

      if (existingTargetItemIndex > -1) {
        // Merge items logic
        const updatedTargetItem = {
          ...newCart[existingTargetItemIndex],
          quantity: newCart[existingTargetItemIndex].quantity + newCart[currentItemIndex].quantity
        };

        newCart[existingTargetItemIndex] = updatedTargetItem;
        newCart.splice(currentItemIndex, 1);
        
        return newCart;
      } else {
        // Simple update logic
        newCart[currentItemIndex] = {
          ...newCart[currentItemIndex],
          selectedSize: newSize,
          price: newPrice,
        };
        return newCart;
      }
    });
  };

  const updateQuantity = (productId: number, size: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
    return total + priceNum * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, isCartOpen, addToCart, removeFromCart, updateSize, updateQuantity, toggleCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};