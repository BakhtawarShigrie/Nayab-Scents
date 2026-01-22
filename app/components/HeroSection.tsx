"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const containerHeight = containerRef.current.offsetHeight; 
      const windowHeight = window.innerHeight;
      const scrollTop = -containerTop; 
      const scrollableDistance = containerHeight - windowHeight;
      let progress = scrollTop / scrollableDistance;
      progress = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  let vanishProgress = 0;
  if (scrollProgress > 0.85) {
    vanishProgress = Math.min((scrollProgress - 0.85) * 6.6, 1);
  }
  const bottleFinalOpacity = bottleEntry * (1 - vanishProgress);
  const bottleBlur = vanishProgress * 20;

  const bgScale = 1 + (scrollProgress * 0.25);
  const bgBlur = scrollProgress * 10;
  const bgOpacity = 1 - vanishProgress; 

  return (
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black pointer-events-none" style={{ opacity: 'var(--bg-opacity)' }}>
            <div className="relative w-full h-full" style={{ transform: `scale(${bgScale})`, filter: `blur(${bgBlur}px)` }}>
              <Image src="/Dcover-01.webp" alt="Background" fill priority className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>
        </div>

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

        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-transform duration-75 ease-linear will-change-transform z-10"
          style={{ opacity: 'var(--hero-opacity)', transform: 'translateY(var(--hero-y))', pointerEvents: heroOpacity <= 0 ? 'none' : 'auto' }}
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

        <div 
          className="absolute z-20 transition-transform duration-75 ease-linear will-change-transform [--zoom-factor:1.5] md:[--zoom-factor:0.5]"
          style={{ opacity: 'var(--bottle-opacity)', filter: 'blur(var(--bottle-blur))', transform: `scale(calc(var(--base-scale) + (var(--zoom-progress) * var(--zoom-factor)))) translateX(0)` }}
        >
          <div className="transform transition-transform duration-75 ease-linear translate-y-[calc(var(--split-progress)*25vh)] md:translate-y-0 md:translate-x-[calc(var(--split-progress)*25vw)]">
              <div className="relative w-[50vw] h-[50vh] md:w-[25vw] md:h-[70vh]">
              <div className="absolute inset-0 bg-green-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <Image src="/bottle-01.png" alt="Green Water Bottle" fill className="object-contain drop-shadow-2xl filter brightness-110" priority />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col pointer-events-none z-10" style={{ opacity: 'var(--text-exit-opacity)' }}>
          <div className="flex-1 flex items-start justify-center pt-24 md:pt-0 md:items-center md:justify-start px-6 md:px-24">
            <div className="max-w-md md:max-w-lg text-center md:text-left transition-all duration-75 ease-linear" style={{ opacity: 'var(--split-progress)' }}>
              <div className="transform transition-transform duration-75 ease-linear translate-y-[calc((1-var(--split-progress))*-20px)] md:translate-y-0 md:translate-x-[calc((1-var(--split-progress))*-50px)]">
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
  );
}