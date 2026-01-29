"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext"; // Import Wishlist Hook

interface ProductCardProps {
  id: number;
  title: string;
  prices: { [key: string]: string };
  image: string;
}

const ProductCard = ({ id, title, prices, image }: ProductCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("50 ml");
  const { addToCart } = useCart();
  
  // Wishlist Hook Usage
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  const currentPrice = prices[selectedSize];
  const productObj = { id, title, prices, image };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(productObj, selectedSize);
  };

  // Handle Wishlist Toggle
  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Card click na ho
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <div 
      className="relative group bg-white border border-gray-100 rounded-lg overflow-hidden cursor-pointer h-[430px] shadow-sm transition-all duration-300 hover:shadow-xl"
      onClick={() => setIsClicked(!isClicked)}
    >
      {/* --- WISHLIST HEART BUTTON --- */}
      <button 
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:scale-110 transition-all duration-200 group-hover:opacity-100"
        title="Add to Wishlist"
      >
        {isWishlisted ? (
          // Filled Heart (Active)
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          // Outline Heart (Inactive)
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )}
      </button>

      <div className="w-full h-[80.5%] relative p-6 bg-[#f9f9f9]">
        <Image src={image} alt={title} fill className="object-contain transition-transform duration-500 group-hover:scale-105" />
      </div>

      {/* Default View */}
      <div className="p-5 flex justify-between items-start text-black group-hover:opacity-0 transition-opacity duration-300">
        <div>
          <h3 className="font-bold text-lg leading-tight">{title}</h3>
          <p className="text-gray-500 text-xs">Nayab Premium Perfume</p>
        </div>
        <span className="font-bold text-lg">{currentPrice}</span>
      </div>

      {/* Expanded View */}
      <div className={`absolute cursor-default bottom-0 left-0 w-full bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col justify-between transition-transform duration-500 ease-in-out z-20 
        ${isClicked ? 'translate-y-0' : 'translate-y-full'} 
        group-hover:translate-y-0`}
      >
        <div>
          <div className="flex justify-between items-start mb-6 text-black border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-lg leading-tight">{title}</h3>
              <p className="text-gray-500 text-xs">Nayab Premium Perfume</p>
            </div>
            <span className="font-bold text-lg">{currentPrice}</span>
          </div>

          <div className="mb-6">
            <p className="font-bold text-black mb-3 text-xs uppercase tracking-wide">Bottle Size</p>
            <div className="flex gap-2">
              {['30 ml', '50 ml', '100 ml'].map(size => (
                <button 
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-3 py-1.5 cursor-pointer rounded-full text-[10px] font-bold flex items-center justify-center transition-all shadow-sm ${
                    selectedSize === size
                      ? "bg-[#1a2b5a] text-white border border-[#1a2b5a]"
                      : "bg-transparent text-black border border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <Link href={`/products/${id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
            <button className="w-full h-full cursor-pointer border border-gray-300 text-black py-3.5 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white hover:border-black transition-colors">
              View Detail
            </button>
          </Link>
          
          <button 
            onClick={handleOrderNow}
            className="flex-1 bg-[#1a2b5a] cursor-pointer text-white py-3.5 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-colors shadow-lg"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;