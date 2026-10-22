"use client";
import { products } from "@/database/data"; // Uppercase PRODUCTS ko lowercase products kar diya
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";

export default function ProductsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 flex flex-col justify-between">
      <div className="container mx-auto px-4 max-w-6xl pb-20">
        
        {/* Page Header */}
        <div className="flex items-center w-full mb-12">
          <div className="flex-1 h-px bg-gray-200" />
          <h1 className="text-3xl md:text-5xl font-bold text-black px-4 md:px-8 tracking-tight uppercase text-center whitespace-nowrap font-serif">
            All Collection
          </h1>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-10">
          {products.map((product) => (
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

      </div>
      
      <Footer />
    </div>
  );
}