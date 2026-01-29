"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimized Scroll Tracking (Direct GPU)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. Hero Text Animations (0 -> 0.15) ---
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0px", "-50px"]);
  
  // --- 2. Bottle Entry (0.1 -> 0.25) ---
  // Iska use hum scale calculation mein karenge
  const bottleEntry = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  // --- 3. Opacity Logic (Fixed: Hidden at Start) ---
  // 0 -> 0.1: Hidden (0)
  // 0.1 -> 0.25: Fade In (0 -> 1)
  // 0.25 -> 0.85: Stay Visible (1)
  // 0.85 -> 1.0: Fade Out (1 -> 0)
  const bottleFinalOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.85, 1], [0, 0, 1, 1, 0]);

  // --- 4. Split & Recenter Logic (0.25 -> 0.45 -> 0.6) ---
  // Bottle move hoti hai aur phir wapis aati hai
  const effectiveSplit = useTransform(scrollYProgress, [0.25, 0.45, 0.6], [0, 1, 0]);

  // Text Exit Opacity
  const textExitOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);

  // --- 5. Zoom Logic (0.6 -> 0.85) ---
  const zoomProgress = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // --- 6. Vanish Logic (Blur & BG) ---
  const vanishProgress = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const bottleBlur = useTransform(vanishProgress, [0, 1], ["0px", "20px"]);
  const bgOpacity = useTransform(vanishProgress, [0, 1], [1, 0]);

  // Background Scale & Blur
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["0px", "10px"]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* --- BACKGROUND --- */}
        <motion.div 
          className="absolute inset-0 z-0 bg-black pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <motion.div 
            className="relative w-full h-full"
            style={{ 
              scale: bgScale, 
              filter: useTransform(bgBlur, (v) => `blur(${v})`) 
            }}
          >
            <Image src="/Dcover-01.webp" alt="Background" fill priority className="object-cover opacity-60" />
            {/* Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />
          </motion.div>
        </motion.div>

        {/* --- HERO TEXT (Initial) --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
          style={{ 
            opacity: heroOpacity, 
            y: heroY,
            pointerEvents: useTransform(scrollYProgress, (v) => v > 0.15 ? 'none' : 'auto')
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
        </motion.div>

        {/* --- BOTTLE ANIMATION CONTAINER --- */}
        {/* CSS Variables pass kar rahe hain taake responsive positioning (Tailwind/Calc) kaam kare */}
        <motion.div 
          className="absolute z-20 will-change-transform [--zoom-factor:1.5] md:[--zoom-factor:0.5]"
          style={{ 
            opacity: bottleFinalOpacity, // Updated Logic: Hidden at start
            filter: useTransform(bottleBlur, (v) => `blur(${v})`),
            // Motion Values passed as CSS vars
            '--base-scale': useTransform(bottleEntry, (v) => 0.8 + (0.2 * v)),
            '--zoom-progress': zoomProgress,
            '--split-progress': effectiveSplit,
            // Original Transform logic using CSS calc()
            transform: `scale(calc(var(--base-scale) + (var(--zoom-progress) * var(--zoom-factor)))) translateX(0)`
          } as any}
        >
          {/* Bottle Movement Logic (Responsive: Vertical on Mobile, Horizontal on Desktop) */}
          <div className="transform transition-transform duration-75 ease-linear translate-y-[calc(var(--split-progress)*25vh)] md:translate-y-0 md:translate-x-[calc(var(--split-progress)*25vw)]">
              <div className="relative w-[50vw] h-[50vh] md:w-[25vw] md:h-[70vh]">
              <div className="absolute inset-0 bg-green-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <Image src="/bottle-01.png" alt="Green Water Bottle" fill className="object-contain drop-shadow-2xl filter brightness-110" priority />
            </div>
          </div>
        </motion.div>

        {/* --- SPLIT TEXT SECTION (Elevate Your Scent) --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col pointer-events-none z-10" 
          style={{ opacity: textExitOpacity }}
        >
          <div className="flex-1 flex items-start justify-center pt-24 md:pt-0 md:items-center md:justify-start px-6 md:px-24">
            <motion.div 
              className="max-w-md md:max-w-lg text-center md:text-left" 
              style={{ 
                opacity: effectiveSplit,
                '--split-progress': effectiveSplit,
              } as any}
            >
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
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}