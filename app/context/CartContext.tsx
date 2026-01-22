"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS } from "@/database/data";

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
  addToCart: (product: any, size: string) => void;
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

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("nayab_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("nayab_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // --- Add to Cart (Fixed Mutation Issue) ---
  const addToCart = (product: any, size: string) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        // Naya array banao
        const newCart = [...prev];
        // Object ki copy banao aur phir update karo (Direct mutation nahi!)
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

  // --- Update Size (Fixed Double Counting/Mutation Issue) ---
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
      const newPrice = productData ? productData.prices[newSize] : newCart[currentItemIndex].price;

      if (existingTargetItemIndex > -1) {
        // SCENARIO: Merge items (e.g. 50ml -> 30ml, and 30ml already exists)
        
        // 1. Target item ki copy bana kar quantity add karo (Safe update)
        const updatedTargetItem = {
          ...newCart[existingTargetItemIndex],
          quantity: newCart[existingTargetItemIndex].quantity + newCart[currentItemIndex].quantity
        };

        // 2. Array mein wapis updated item set karo
        newCart[existingTargetItemIndex] = updatedTargetItem;

        // 3. Purana item remove karo
        newCart.splice(currentItemIndex, 1);
        
        return newCart;
      } else {
        // SCENARIO: Normal change (just update size and price)
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
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""));
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