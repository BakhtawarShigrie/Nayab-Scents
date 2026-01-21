"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// --- Product Card Component ---
const ProductCard = ({ title, price, image }: { title: string, price: string, image: string }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div 
      className="relative group bg-white border border-gray-100 rounded-lg overflow-hidden cursor-pointer h-[430px] shadow-sm transition-all duration-300 hover:shadow-xl"
      onClick={() => setIsClicked(!isClicked)}
    >
      {/* Product Image (Clean look like img-02) */}
      <div className="w-full lg: h-[80.5%] relative p-6 bg-[#f9f9f9]">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Basic Info (Visible initially) */}
      <div className="p-5 flex justify-between items-start text-black group-hover:opacity-0 transition-opacity duration-300">
        <div>
          <h3 className="font-bold text-xl leading-tight">{title}</h3>
          <p className="text-gray-500 text-sm">Nayab Premium Perfume</p>
        </div>
        <span className="font-bold text-xl">{price}</span>
      </div>

      {/* Detail Overlay (Desktop: Hover | Mobile: Click - img-03 style) */}
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
            <span className="font-bold text-xl">{price}</span>
          </div>

          <div className="mb-6">
            <p className="font-bold text-black mb-3 text-sm uppercase tracking-wide">Bottle Size</p>
            <div className="flex gap-2">
              {['30 ml', '50 ml', '100 ml'].map(size => (
                <button key={size} className="px-3 py-1.5 rounded-full bg-[#1a2b5a] text-white text-[11px] font-bold flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* <div className="mb-8">
            <p className="font-bold text-black mb-3 text-sm uppercase tracking-wide">Colors</p>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-800 border border-gray-200 cursor-pointer hover:scale-110 transition-transform" />
              <div className="w-7 h-7 rounded-full bg-black border border-gray-200 cursor-pointer hover:scale-110 transition-transform" />
              <div className="w-7 h-7 rounded-full bg-red-600 border border-gray-200 cursor-pointer hover:scale-110 transition-transform" />
              <div className="w-7 h-7 rounded-full bg-yellow-700 border border-gray-200 cursor-pointer hover:scale-110 transition-transform" />
              <div className="w-7 h-7 rounded-full bg-blue-900 border border-gray-200 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div> */}
        </div>

        <div className="flex gap-3 w-full">
          <button className="flex-1 border border-gray-300 text-black py-3.5 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white hover:border-black transition-colors">
            View Detail
          </button>
          <button className="flex-1 bg-[#1a2b5a] text-white py-3.5 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors shadow-lg">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Calculation Logic (Relative to Hero Container)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const containerHeight = containerRef.current.offsetHeight; // 500vh
      const windowHeight = window.innerHeight;
      
      // Calculate how much we have scrolled WITHIN the hero container
      // Using -containerTop gives us the pixels scrolled from the start of the container
      const scrollTop = -containerTop; 
      const scrollableDistance = containerHeight - windowHeight;
      
      let progress = scrollTop / scrollableDistance;
      
      // Clamp progress between 0 and 1
      progress = Math.min(Math.max(progress, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Animation Phases ---
  
  const heroProgress = Math.min(scrollProgress * 6.6, 1);
  const heroOpacity = 1 - heroProgress;
  
  let bottleEntry = 0;
  if (scrollProgress > 0.1) {
    bottleEntry = Math.min((scrollProgress - 0.1) * 6.6, 1);
  }

  let splitProgress = 0;
  if (scrollProgress > 0.25) {
    splitProgress = Math.min((scrollProgress - 0.25) * 5, 1);
  }

  let recenterProgress = 0;
  if (scrollProgress > 0.45) {
    recenterProgress = Math.min((scrollProgress - 0.45) * 6.6, 1);
  }
  const effectiveSplit = splitProgress * (1 - recenterProgress);

  let zoomProgress = 0;
  if (scrollProgress > 0.6) {
    zoomProgress = Math.min((scrollProgress - 0.6) * 4, 1);
  }
  const baseScale = 0.8 + (0.2 * bottleEntry);

  // Phase 6: Blur & Vanish (Bottle disappears at 85% scroll of hero)
  let vanishProgress = 0;
  if (scrollProgress > 0.85) {
    vanishProgress = Math.min((scrollProgress - 0.85) * 6.6, 1);
  }
  const bottleFinalOpacity = bottleEntry * (1 - vanishProgress);
  const bottleBlur = vanishProgress * 20;

  // Background Animation: Scale up & Fade out to White
  const bgScale = 1 + (scrollProgress * 0.25);
  const bgBlur = scrollProgress * 10;
  // Fade out background image as bottle vanishes so screen becomes white
  const bgOpacity = 1 - vanishProgress; 

  return (
    <div className="bg-white"> {/* Base background is White so when hero fades, it shows white */}
      
      {/* --- HERO SCROLL CONTAINER (500vh tall) --- */}
      <div 
        ref={containerRef} 
        className="relative h-[500vh]"
        style={{
          ['--hero-opacity' as any]: heroOpacity,
          ['--hero-y' as any]: `${heroProgress * -50}px`,
          ['--base-scale' as any]: baseScale,
          ['--zoom-progress' as any]: zoomProgress,
          ['--bottle-opacity' as any]: bottleFinalOpacity,
          ['--bottle-blur' as any]: `${bottleBlur}px`,
          ['--split-progress' as any]: effectiveSplit,
          ['--text-exit-opacity' as any]: 1 - recenterProgress,
          ['--bg-opacity' as any]: bgOpacity,
        } as React.CSSProperties}
      >
        
        {/* --- STICKY VIEWPORT (Fixes the view while we scroll 500vh) --- */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          
          {/* BACKGROUND (Black/Image) - Fades out at the end */}
          <div className="absolute inset-0 z-0 bg-black pointer-events-none" style={{ opacity: 'var(--bg-opacity)' }}>
             <div className="relative w-full h-full"
                  style={{ 
                    transform: `scale(${bgScale})`,
                    filter: `blur(${bgBlur}px)`
                  }}>
                <Image
                  src="/Dcover-01.webp"
                  alt="Background"
                  fill
                  priority
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
             </div>
          </div>

          {/* NAVBAR */}
          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
            <button className="text-white hover:opacity-80 transition-opacity p-1 mix-blend-difference">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <button className="rounded-full border border-white/30 bg-black/20 backdrop-blur-sm px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
              Order Now
            </button>
          </nav>

          {/* HERO CONTENT (Text) */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-transform duration-75 ease-linear will-change-transform z-10"
            style={{ 
              opacity: 'var(--hero-opacity)', 
              transform: 'translateY(var(--hero-y))',
              pointerEvents: heroOpacity <= 0 ? 'none' : 'auto'
            }}
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-xl leading-tight text-white">
              Unforgettable Scents,<br />Lasting Presence
            </h1>
            <p className="text-base md:text-xl text-gray-200 max-w-xs md:max-w-2xl mb-8 drop-shadow-md leading-relaxed">
              Experience Nayab Scents – premium perfumes crafted for exceptional projection and long-lasting elegance.
            </p>
            <button className="rounded-full border border-white/50 bg-white/10 backdrop-blur-md px-6 py-2.5 md:px-8 md:py-3 font-semibold transition-all hover:bg-white hover:text-black text-white">
              Order Now
            </button>
          </div>

          {/* BOTTLE IMAGE (Animates & Vanishes) */}
          <div 
            className="absolute z-20 transition-transform duration-75 ease-linear will-change-transform [--zoom-factor:1.5] md:[--zoom-factor:0.5]"
            style={{
              opacity: 'var(--bottle-opacity)',
              filter: 'blur(var(--bottle-blur))',
              transform: `
                scale(calc(var(--base-scale) + (var(--zoom-progress) * var(--zoom-factor))))
                translateX(0)
              ` 
            }}
          >
            <div className="transform transition-transform duration-75 ease-linear
                            translate-y-[calc(var(--split-progress)*25vh)] 
                            md:translate-y-0 
                            md:translate-x-[calc(var(--split-progress)*25vw)]">
               
               <div className="relative w-[50vw] h-[50vh] md:w-[25vw] md:h-[70vh]">
                <div className="absolute inset-0 bg-green-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <Image
                  src="/bottle-01.png" 
                  alt="Green Water Bottle"
                  fill
                  className="object-contain drop-shadow-2xl filter brightness-110"
                  priority
                />
              </div>
            </div>
          </div>

          {/* FEATURE TEXT SECTION */}
          <div 
            className="absolute inset-0 flex flex-col pointer-events-none z-10"
            style={{ opacity: 'var(--text-exit-opacity)' }}
          >
            <div className="flex-1 flex items-start justify-center pt-24 md:pt-0 md:items-center md:justify-start px-6 md:px-24">
              <div 
                className="max-w-md md:max-w-lg text-center md:text-left transition-all duration-75 ease-linear"
                style={{
                  opacity: 'var(--split-progress)',
                }}
              >
                <div className="transform transition-transform duration-75 ease-linear
                                translate-y-[calc((1-var(--split-progress))*-20px)]
                                md:translate-y-0
                                md:translate-x-[calc((1-var(--split-progress))*-50px)]">
                  
                  <h2 className="text-3xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg text-white">
                    Elevate Your <br />
                    <span className="text-green-400">Signature Scent</span>
                  </h2>
                  <p className="text-sm md:text-lg text-gray-300 mb-6 leading-relaxed drop-shadow-md">
                    Meet the Nayab Scents collection, crafted for powerful projection, long-lasting wear, and undeniable sophistication.
                  </p>
                  
                  <button className="pointer-events-auto rounded-full bg-green-600 px-6 py-2.5 md:px-8 md:py-3 font-semibold shadow-lg shadow-green-900/50 transition-all hover:bg-green-500 hover:scale-105 text-white">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- TRENDING SECTION (Starts AFTER Hero Scroll Ends) --- */}
      <section className="relative z-30 bg-white py-24 px-6 md:px-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Filters (img-01 style) */}
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center w-full mb-8">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <h2 className="text-3xl md:text-6xl font-bold text-black px-8 tracking-tight uppercase">Trending Products</h2>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
            
            <div className="flex gap-4">
              <button className="px-8 py-2.5 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-md">Best Seller</button>
              <button className="px-8 py-2.5 border-2 border-gray-100 text-gray-400 rounded-full text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">Men</button>
              <button className="px-8 py-2.5 border-2 border-gray-100 text-gray-400 rounded-full text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">Women</button>
            </div>
          </div>

          {/* Product Grid (img-02 & img-03 concept) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <ProductCard title="Classic Nayab" price="$20.99" image="/bottle-01.png" />
            <ProductCard title="Royal Scent" price="$35.00" image="/bottle-01.png" />
            <ProductCard title="Azure Mist" price="$25.50" image="/bottle-01.png" />
            <ProductCard title="Velvet Oud" price="$42.00" image="/bottle-01.png" />
          </div>

          <div className="flex justify-center mt-16">
            <button className="px-10 py-3 hover:bg-gray-200 cursor-pointer hover:text-black text-white rounded-full font-bold uppercase tracking-widest text-sm bg-gray-800 transition-all shadow-lg hover:shadow-xl">
              Show More
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}