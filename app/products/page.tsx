"use client";
import { PRODUCTS } from "@/database/data";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";

export default function AllProductsPage() {
  return (
    <div className="bg-white min-h-screen pt-32 text-black flex flex-col justify-between">
      <div className="container mx-auto px-4 md:px-20 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-black mb-4">Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our exclusive range of premium fragrances, crafted to leave a lasting impression.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id} 
              title={product.title} 
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