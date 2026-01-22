"use client";
import Image from "next/image";
import { CATEGORIES } from "@/database/data";

export default function CategoriesSection() {
  return (
    <section className="bg-white py-12 md:pt-14 hidden sm:block border-gray-100">
      <div className="max-w-7xl mx-auto px-10 md:px-12">
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 md:flex md:gap-8 md:justify-center">
          {CATEGORIES.map((cat, index) => (
            <div key={index} className="flex flex-col items-center gap-3 md:gap-4 cursor-pointer group">
              <div className="relative w-[170px] h-[170px] sm:w-[150px] sm:h-[150px] rounded-full border-2 border-transparent group-hover:border-green-600 transition-all shadow-md">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-500 group-hover:scale-115" />
              </div>
              <p className="text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-800 group-hover:text-green-700 transition-colors">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}