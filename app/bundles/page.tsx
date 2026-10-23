import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function BundlesPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 flex flex-col justify-between">
      <div className="container mx-auto px-4 max-w-6xl pb-20 flex-grow flex flex-col items-center justify-center text-center">
        
        {/* Box/Bundle Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-gray-300 mb-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>

        <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 font-serif uppercase tracking-wider">
          Discounted Bundles
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-md">
          Abhi filhaal bundles available nahi hain. Jaldi hi hum behtareen deals le kar aayenge!
        </p>
        
        <Link href="/products">
          <button className="bg-black border-2 border-black text-white hover:bg-white hover:text-black py-3 px-10 rounded-full font-bold uppercase tracking-widest transition-all text-sm cursor-pointer shadow-sm hover:shadow-md active:scale-95">
            Explore All Products
          </button>
        </Link>

      </div>
      
      <Footer />
    </div>
  );
}