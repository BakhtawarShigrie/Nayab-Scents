"use client";
import { useState } from "react";

// --- Local Data for FAQs ---
const PERFUME_FAQS = [
  {
    question: "How long does Nayab Scents perfume last?",
    answer: "Our premium perfumes are formulated as Extrait de Parfum or High-Concentration EDP, designed to last typically 8-12 hours on skin and even longer on fabric, depending on environmental conditions."
  },
  {
    question: "Are these original fragrances?",
    answer: "Nayab Scents creates premium high-quality impressions and original blends using imported oils. We ensure 98% match with designer notes but with enhanced longevity."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 'Open Parcel' policy. You can check your parcel upon delivery. If the bottle is damaged or leaked, you can return it immediately to the rider."
  },
  {
    question: "How should I store my perfume?",
    answer: "To maintain the quality of your Nayab Scent, store the bottle in a cool, dry place away from direct sunlight and humidity. A wardrobe or dresser drawer is ideal."
  },
  {
    question: "Do you offer testers or samples?",
    answer: "Yes! We offer a 'Discovery Box' which contains 5 miniature bottles of our best-sellers so you can try them before committing to a full-size bottle."
  }
];

export default function FAQSection() {
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleCount = showAll ? PERFUME_FAQS.length : 3;

  return (
    <section className="bg-[#f0f2eb] py-24 text-[#1a1a1a]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-sm md:text-base font-light">
            Find quick answers to your questions about our fragrances and delivery.
          </p>
        </div>

        <div className="relative">
          <div className="border-t border-gray-300">
            {PERFUME_FAQS.slice(0, visibleCount).map((faq, index) => {
              const isLastVisible = !showAll && index === 3;
              return (
                <div key={index} className={`border-b border-gray-300 transition-all duration-300 ${isLastVisible ? 'opacity-30 blur-[1px] pointer-events-none' : ''}`}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex justify-between items-center text-left hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    <span className="text-lg md:text-xl font-serif text-[#1a1a1a]">{faq.question}</span>
                    <span className="text-2xl font-light text-gray-500 ml-4">{openIndex === index ? "−" : "+"}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                    <p className="text-gray-600 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {!showAll && (
            <div className="absolute bottom-0 left-0 w-full pt-10 pb-2 bg-gradient-to-t from-[#f0f2eb] to-transparent flex justify-start pl-0">
              <button onClick={() => setShowAll(true)} className="bg-[#dcdccf] hover:bg-[#cfcfc2] text-[#1a1a1a] px-8 py-3 text-sm font-medium transition-colors rounded-sm">
                Show More
              </button>
            </div>
          )}
        </div>
        
        {showAll && (
           <div className="mt-8">
             <button onClick={() => setShowAll(false)} className="bg-[#dcdccf] hover:bg-[#cfcfc2] text-[#1a1a1a] px-8 py-3 text-sm font-medium transition-colors rounded-sm">
               Show Less
             </button>
           </div>
        )}
      </div>
    </section>
  );
}