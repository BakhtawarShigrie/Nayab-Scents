import Image from "next/image";

export default function Home() {
  return (
    // Container centers content vertically and horizontally
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden font-sans text-center">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/Dcover.webp"
        alt="Nayab Scents Background"
        fill
        priority
        // Added 'blur-lg' for the blur effect.
        // Added 'scale-110' to zoom in slightly, hiding the fuzzy edges caused by the blur filter.
        className="object-cover -z-10 brightness-80 blur-xs scale-100"
      />

      {/* MAIN CONTENT */}
      {/*
        - Removed the previous <main> wrapper for simpler perfect centering.
        - Changed text size from 'text-3xl' to 'text-xl' (roughly 70% smaller).
        - Adjusted leading and max-width for balance.
      */}
      <h1 className=" px-8 text-xl md:text-6xl font-bold leading-snug tracking-tight text-white shadow-black drop-shadow-md">
        Nayab Scents Jald Hi Aapke Shehar Mein!
      </h1>
    </div>
  );
}