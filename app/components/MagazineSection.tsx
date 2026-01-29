"use client";
import { useState } from "react";
import Image from "next/image";
// Import from database
import { SCENT_ARTICLES } from "@/database/data";

export default function MagazineSection() {
  const [selectedArticle, setSelectedArticle] = useState<typeof SCENT_ARTICLES[0] | null>(null);

  return (
    <section className="bg-white py-24 border-b border-gray-100 relative">
      <div className="container mx-auto px-8 md:px-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold text-gray-600 tracking-[0.25em] uppercase mb-3">NAYAB SCENTS</p>
          <h2 className="text-4xl font-bold text-black mb-6">Scented Stories & Press</h2>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            Updated monthly, follow the Nayab Scents blog for everything you want to know about premium perfumery and fragrance trends.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {SCENT_ARTICLES.map((article, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedArticle(article)}
              className="flex flex-col group cursor-pointer text-center"
            >
              <div className="relative w-full h-[250px] overflow-hidden mb-6 bg-gray-50 rounded-lg">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-base font-semibold text-black mb-3 px-4 leading-snug group-hover:text-green-700 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-600 font-medium mb-6">
                <span>{article.category}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{article.date}</span>
              </div>
              <div className="inline-block relative">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black pb-1 border-b border-black group-hover:text-green-700 group-hover:border-green-700 transition-all">
                  READ MORE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MAGAZINE POPUP MODAL --- */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl rounded-sm shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto md:overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 cursor-pointer bg-white/80 hover:bg-black hover:text-white text-black p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#f9f9f9] shrink-0 flex items-center justify-center">
              <Image 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                fill 
                className="object-contain p-8" 
              />
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
              <span className="text-xs font-bold text-green-700 tracking-[0.2em] uppercase mb-4">
                {selectedArticle.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-4 leading-tight">
                {selectedArticle.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-gray-400"></span> {selectedArticle.date}
              </p>
              
              <div className="text-sm text-gray-700 leading-relaxed space-y-4 font-light overflow-y-auto max-h-[200px] md:max-h-[300px] pr-2">
                <p>{selectedArticle.content}</p>
                <p>
                  At Nayab Scents, we believe that fragrance is more than just a smell; it's a memory, an emotion, and a statement.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                 <button className="text-xs cursor-pointer font-bold uppercase tracking-widest text-black hover:text-green-700 transition-colors flex items-center gap-2">
                    Share this article
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}