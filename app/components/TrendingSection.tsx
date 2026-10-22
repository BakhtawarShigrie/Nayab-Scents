"use client";
import ProductCard from "./ProductCard";
import { products } from "@/database/data"; // Uppercase PRODUCTS ko lowercase products se replace kiya
import Link from "next/link"; 

export default function TrendingSection() {
  // Trending section ke liye shuru ke 4 products nikal rahe hain
  const trendingProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-[#fcfcfc]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Heading */}
        <div className="flex items-center w-full mb-12">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-2xl md:text-4xl font-bold text-black px-4 md:px-8 tracking-tight uppercase text-center whitespace-nowrap font-serif">
            Trending Now
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-10">
          {trendingProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              id={p.id} 
              name={p.name} 
              inspiredBy={p.inspiredBy} 
              prices={p.prices} 
              image={p.image} 
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <Link href="/products">
            <button className="bg-white border-2 border-black text-black hover:bg-black hover:text-white py-3 px-10 rounded-full font-bold uppercase tracking-widest transition-all text-sm cursor-pointer shadow-sm hover:shadow-md active:scale-95">
              View All Collection
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}