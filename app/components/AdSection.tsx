"use client";
import Image from "next/image";
import Link from "next/link";

const AdSection = () => {
  const adBgImage = "https://res.cloudinary.com/dm7irbzcf/image/upload/v1765389587/ad-01_cnjaax.jpg"; 

  return (
    <section className="relative h-[100vh] md:h-screen w-full overflow-hidden bg-black">
      <Image 
        src={adBgImage} 
        alt="Nayab Watches" 
        fill 
        className="object-cover object-center" 
        priority 
      />
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-24 z-10">
        <div className="max-w-2xl">
          <div className="absolute top-0 mt-[4em] text-gray-300 text-sm md:text-sm font-bold uppercase tracking-[0.2em] mb-5">
              Nayab Watches
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-3 leading-tight">
            Nayab Watches<br /> Timeless Luxury.
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed font-light max-w-md">
          Step into a world of elegance with Nayab Watches. We bring you an exclusive collection of 
            <span className="text-white font-medium"> premium branded timepieces</span>.
          </p>
          <Link href="https://nayabwatch.com" target="_blank">
            <button className="bg-[#D4B07B] cursor-pointer hover:bg-[#c8954d] mb-15 text-black px-8 py-4 rounded-sm text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 shadow-lg">
              Explore our Watches
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdSection;