"use client";
import Image from "next/image";

interface CollectionCardProps {
  title: string;
  image: string;
  bgClass: string;
}

const CollectionCard = ({ title, image, bgClass }: CollectionCardProps) => {
  return (
    <div className={`relative h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-lg ${bgClass}`}>
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <h3 className="text-white text-xl md:text-xl font-bold uppercase tracking-widest text-center drop-shadow-lg leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CollectionCard;