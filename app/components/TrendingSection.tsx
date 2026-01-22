"use client";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/database/data";

export default function TrendingSection() {
  return (
    // ID "trending" add kiya gaya hai
    <section id="trending" className="relative z-30 bg-white pb-14 pt-10 sm:pt-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <div className="flex items-center w-full mb-6 md:mb-8">
            <div className="flex-1 h-[1px] bg-gray-200" />
            <h2 className="text-2xl md:text-6xl font-bold text-black px-4 md:px-8 tracking-tight uppercase text-center whitespace-nowrap">Trending Products</h2>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <button className="px-6 py-2 md:px-8 md:py-2.5 bg-black text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-md">Best</button>
            <button className="px-6 py-2 md:px-8 md:py-2.5 border-2 border-gray-100 text-gray-400 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">Men</button>
            <button className="px-6 py-2 md:px-8 md:py-2.5 border-2 border-gray-100 text-gray-400 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">Women</button>
            <button className="px-6 py-2 md:px-8 md:py-2.5 border-2 border-gray-100 text-gray-400 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">Unisex</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id} // <-- Cart functionality ke liye zaroori
              title={product.title} 
              prices={product.prices} 
              image={product.image} 
            />
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <button className="px-10 py-3 hover:bg-gray-200 cursor-pointer hover:text-black text-white rounded-full font-bold uppercase tracking-widest text-sm bg-gray-800 transition-all shadow-lg hover:shadow-xl">
            Show More
          </button>
        </div>
      </div>
    </section>
  );
}