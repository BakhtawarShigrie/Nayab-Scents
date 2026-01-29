"use client";
import { useWishlist } from "@/app/context/WishlistContext";
import { PRODUCTS } from "@/database/data";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart(); 
  const router = useRouter(); 

  // Filter products that match IDs in wishlist
  const wishlistProducts = PRODUCTS.filter((product) => wishlist.includes(product.id));

  // --- HANDLE BUY NOW (Adds all items & Redirects to Checkout) ---
  const handleBuyNow = () => {
    // Add all wishlist items to cart
    wishlistProducts.forEach((product) => {
      // Default size "50 ml" ke sath cart mein add karein
      // Note: Hum yahan assume kar rahe hain ke addToCart sidebar open nahi karega 
      // kyunki hum foran router.push kar rahe hain.
      addToCart({
        id: product.id,
        title: product.title,
        prices: product.prices,
        image: product.image
      }, "50 ml");
    });

    // Direct Checkout Page (Cart Sidebar ko bypass karte hue)
    router.push("/checkout");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 text-black flex flex-col justify-between">
      <div className="container mx-auto px-6 max-w-7xl pb-20">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-black mb-4 tracking-tight">Your Wishlist</h1>
          <p className="text-gray-500 text-sm md:text-base uppercase tracking-widest mb-8">
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
          </p>

          {/* BUY NOW BUTTON (Updated Text & Logic) */}
          {wishlistProducts.length > 0 && (
            <button 
              onClick={handleBuyNow}
              className="px-10 py-4 bg-[#1a2b5a] text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-sm hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300"
            >
              <span>Buy Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {wishlistProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id} 
                title={product.title} 
                prices={product.prices} 
                image={product.image} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Seems like you haven't found your favorite scent yet. Explore our collection and save items for later.
            </p>
            <Link href="/products">
              <button className="bg-black text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-lg">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}