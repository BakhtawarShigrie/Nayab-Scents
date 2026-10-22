"use client";
import { products } from "@/database/data"; 
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import { useWishlist } from "@/app/context/WishlistContext";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useWishlist(); 

  // Sirf wo products filter kar rahe hain jo wishlist mein mojood hain
  const wishlistProducts = products.filter((product) => 
    wishlist?.includes(product.id) || wishlist?.includes(product.id as unknown as number)
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 flex flex-col justify-between">
      <div className="container mx-auto px-4 max-w-6xl pb-20">
        
        {/* Page Header */}
        <div className="flex items-center w-full mb-12">
          <div className="flex-1 h-px bg-gray-200" />
          <h1 className="text-3xl md:text-5xl font-bold text-black px-4 md:px-8 tracking-tight uppercase text-center whitespace-nowrap font-serif">
            My Wishlist
          </h1>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Wishlist Products Grid ya Empty State */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-10">
            {wishlistProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id} 
                name={product.name} 
                inspiredBy={product.inspiredBy} 
                prices={product.prices} 
                image={product.image} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-gray-300 mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any perfumes to your wishlist yet.</p>
            <Link href="/products">
              <button className="bg-black border-2 border-black text-white hover:bg-white hover:text-black py-3 px-10 rounded-full font-bold uppercase tracking-widest transition-all text-sm cursor-pointer shadow-sm hover:shadow-md active:scale-95">
                Explore Collection
              </button>
            </Link>
          </div>
        )}

      </div>
      
      <Footer />
    </div>
  );
}