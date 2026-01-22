"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext"; // Import Cart Hook
import { PRODUCTS } from "@/database/data"; // Import PRODUCTS data to pass full object if needed

interface ProductCardProps {
  id: number; // ID prop add kiya
  title: string;
  prices: { [key: string]: string };
  image: string;
}

const ProductCard = ({ id, title, prices, image }: ProductCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("50 ml");
  const { addToCart } = useCart(); // Use Cart Hook

  const currentPrice = prices[selectedSize];

  // Helper to construct product object for cart
  const productObj = { id, title, prices, image };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(productObj, selectedSize); // Cart mein add aur open karega
  };

  return (
    <div 
      className="relative group bg-white border border-gray-100 rounded-lg overflow-hidden cursor-pointer h-[430px] shadow-sm transition-all duration-300 hover:shadow-xl"
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="w-full h-[80.5%] relative p-6 bg-[#f9f9f9]">
        <Image src={image} alt={title} fill className="object-contain transition-transform duration-500 group-hover:scale-105" />
      </div>

      {/* Default View */}
      <div className="p-5 flex justify-between items-start text-black group-hover:opacity-0 transition-opacity duration-300">
        <div>
          <h3 className="font-bold text-xl leading-tight">{title}</h3>
          <p className="text-gray-500 text-sm">Nayab Premium Perfume</p>
        </div>
        <span className="font-bold text-xl">{currentPrice}</span>
      </div>

      {/* Expanded View */}
      <div className={`absolute bottom-0 left-0 w-full bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col justify-between transition-transform duration-500 ease-in-out z-20 
        ${isClicked ? 'translate-y-0' : 'translate-y-full'} 
        group-hover:translate-y-0`}
      >
        <div>
          <div className="flex justify-between items-start mb-6 text-black border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-xl leading-tight">{title}</h3>
              <p className="text-gray-500 text-sm">Nayab Premium Perfume</p>
            </div>
            <span className="font-bold text-xl">{currentPrice}</span>
          </div>

          <div className="mb-6">
            <p className="font-bold text-black mb-3 text-sm uppercase tracking-wide">Bottle Size</p>
            <div className="flex gap-2">
              {['30 ml', '50 ml', '100 ml'].map(size => (
                <button 
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center justify-center transition-all shadow-sm ${
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
          <button className="flex-1 border border-gray-300 text-black py-3.5 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white hover:border-black transition-colors">
            View Detail
          </button>
          {/* Order Now Button Updated */}
          <button 
            onClick={handleOrderNow}
            className="flex-1 bg-[#1a2b5a] text-white py-3.5 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors shadow-lg"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;