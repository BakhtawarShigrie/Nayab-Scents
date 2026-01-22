"use client";
import CollectionCard from "./CollectionCard";
import { COLLECTIONS } from "@/database/data";

export default function CollectionsSection() {
  return (
    <section className="bg-white pb-20 pt-10 px-6 md:px-20 border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center w-full mb-12">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <h2 className="text-2xl md:text-6xl font-bold text-black px-4 md:px-8 tracking-tight uppercase text-center whitespace-nowrap">Our Collections</h2>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((collection) => (
             <CollectionCard key={collection.id} title={collection.title} image={collection.image} bgClass={collection.bgClass} />
          ))}
        </div>
      </div>
    </section>
  );
}