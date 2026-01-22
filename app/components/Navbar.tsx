"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const { toggleCart, cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check karein ke screen mobile hai ya desktop (640px Tailwind ka sm breakpoint hai)
      const isMobile = window.innerWidth < 640;

      // Agar mobile hai to 'trending' dhundhein, warna 'categories'
      const targetId = isMobile ? "trending" : "categories";
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const sectionTop = targetSection.offsetTop;
        
        // Jab target section ke qareeb (100px pehle) phonchein
        if (window.scrollY >= sectionTop - 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        // Fallback: Agar target section na mile (jaise Checkout page par), 
        // to simple scroll check karein
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-500 w-full ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md text-black py-4 shadow-md"
          : "bg-transparent text-white py-6 mix-blend-difference"
      }`}
    >
      
      {/* LEFT: Menu Button & Logo */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <Link href="/" className="font-serif text-lg md:text-xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">
          Nayab Scents
        </Link>
      </div>

      {/* RIGHT: User & Cart Icons */}
      <div className="flex items-center gap-6">
        <Link href="/login" className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </Link>

        <button onClick={toggleCart} className="relative hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

    </nav>
  );
}