"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// --- Local Data for Footer ---
const GLOBAL_REDEEM_CODE = "NAYABNEW20";
const WHATSAPP_NUMBER = "923001234567"; // Replace with your actual WhatsApp number
const SCENT_FAMILIES = ["Fresh", "Woody", "Floral", "Oriental", "Citrus", "Musk"];

export default function Footer() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GLOBAL_REDEEM_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Replaced brand navigation with generic filter logic or simple navigation
  const handleCollectionClick = (family: string) => {
    setActivePopup(null);
    // Assuming you will handle filtering by query param later
    router.push(`/?category=${encodeURIComponent(family)}`);
  };

  // Popup Content Helper
  const renderPopupContent = () => {
    switch (activePopup) {
      case "About":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
            <h3 className="text-2xl font-serif font-bold uppercase tracking-widest text-black">
              About Nayab Scents
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Welcome to <span className="font-bold text-black">Nayab Scents</span>, your premier destination for premium, long-lasting impressions. We are dedicated to providing the finest selection of perfumes that combine elegance with powerful projection. Our mission is to deliver confidence and style to your senses.
            </p>
            <div className="flex justify-center gap-6 pt-2 text-[10px] uppercase font-bold tracking-widest text-gray-400">
              <span>Authentic</span> • <span>Long-Lasting</span> • <span>Luxury</span>
            </div>
          </div>
        );
      case "Contact":
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider text-black">
              Contact Support
            </h3>
            <p className="text-sm text-gray-600 font-light">
              Need help choosing a scent or tracking your order? Our support team is available on WhatsApp to assist you.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3.5 rounded-full font-bold uppercase text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        );
      case "Terms":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase">Terms & Conditions</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              By using our website, you agree to our terms. We ensure that all products are premium quality. Prices are subject to change without notice. We reserve the right to cancel orders if products are out of stock.
            </p>
          </div>
        );
      case "Returns":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase">Returns & Exchanges</h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-yellow-50 p-4 border border-yellow-200 rounded-sm">
              You are allowed to open the parcel and inspect the fragrance bottle (without spraying) upon receipt. If you find any breakage or leakage, you may request a return immediately with the rider.
            </p>
          </div>
        );
      case "Shipping":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase">Shipping & Delivery</h3>
            <div className="text-sm text-gray-600 leading-relaxed bg-blue-50 p-4 border border-blue-200 rounded-sm space-y-2">
              <p>
                Shipping charges are <span className="font-bold">Rs. 200</span> nationwide.
              </p>
              <p>
                We offer Cash on Delivery (COD). For orders above Rs. 5000, a small advance payment may be required.
              </p>
              <p>
                You will receive your delivery within <span className="font-bold">3 to 5 working days</span>.
              </p>
            </div>
          </div>
        );
      case "Redeem":
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold uppercase">Redeem Code</h3>
            <p className="text-sm text-gray-500">
              Copy the code below and paste it at checkout for a discount.
            </p>
            <div className="bg-gray-100 p-4 rounded-md border border-gray-300 flex flex-col items-center gap-3">
              <span className="text-2xl font-mono font-bold tracking-widest text-black">
                {GLOBAL_REDEEM_CODE}
              </span>
              <button
                onClick={handleCopyCode}
                className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gray-800 transition-colors"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <p className="text-xs text-green-600 font-bold mt-2">
              Get Flat 20% OFF on select perfumes!
            </p>
          </div>
        );
      case "Tracking":
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold uppercase">Order Tracking</h3>
            <p className="text-sm text-gray-600">
              Please contact our support team to track your order status.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-sm font-bold uppercase text-sm hover:bg-[#128C7E] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        );
      case "Families":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase text-center mb-6">
              Select Scent Family
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SCENT_FAMILIES.map((family, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCollectionClick(family)}
                  className="bg-gray-50 border border-gray-200 text-gray-800 py-3 rounded-sm font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors"
                >
                  {family}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <footer className="bg-[#f9f9f9] text-[#333] pt-16 pb-8 font-sans border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-4 md:gap-8 mb-12">
            
            {/* 1. HELP */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Help</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><button onClick={() => setActivePopup("About")} className="hover:text-black transition-colors text-left">About Us</button></li>
                <li><button onClick={() => setActivePopup("Contact")} className="hover:text-black transition-colors text-left">Contact Us</button></li>
                <li><button onClick={() => setActivePopup("Terms")} className="hover:text-black transition-colors text-left">Terms & Conditions</button></li>
                <li><button onClick={() => setActivePopup("Returns")} className="hover:text-black transition-colors text-left">Returns & Exchanges</button></li>
                <li><button onClick={() => setActivePopup("Shipping")} className="hover:text-black transition-colors text-left">Shipping & Delivery</button></li>
              </ul>
            </div>

            {/* 2. INFORMATION */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Information</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><button onClick={() => setActivePopup("Redeem")} className="hover:text-black transition-colors text-left">Redeem Codes</button></li>
                <li><button onClick={() => setActivePopup("Tracking")} className="hover:text-black transition-colors text-left">Orders Tracking</button></li>
              </ul>
            </div>

            {/* 3. ACCOUNT */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Account</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="/login" className="hover:text-black transition-colors">Login / Register</Link></li>
                <li><Link href="/wishlist" className="hover:text-black transition-colors">Wishlist</Link></li>
                <li><Link href="/checkout" className="hover:text-black transition-colors">Checkout</Link></li>
              </ul>
            </div>

            {/* 4. CATEGORIES */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Collections</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="/Products" className="hover:text-black transition-colors">All Perfumes</Link></li>
                <li><button onClick={() => setActivePopup("Families")} className="hover:text-black transition-colors text-left">By Scent Family</button></li>
                <li><Link href="/Products?sale=true" className="text-[#d95e00] hover:text-red-700 transition-colors">Sale</Link></li>
              </ul>
            </div>

            {/* 5. SUBSCRIBE */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-bold text-sm uppercase mb-6 tracking-wider">Subscribe & Follow Us</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Get the latest updates on new arrivals, promotions, and much more.
              </p>
              <div className="flex flex-wrap border-t border-l border-gray-200 max-w-[193px]">
                {/* Facebook */}
                <a href="https://www.facebook.com/NayabScents" target="_blank" className="w-12 h-12 flex items-center justify-center border-r border-b border-gray-200 bg-[#f9f9f9] text-black hover:bg-black hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" /></svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/nayab.scents" target="_blank" className="w-12 h-12 flex items-center justify-center border-r border-b border-gray-200 bg-[#f9f9f9] text-black hover:bg-black hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /></svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@nayabscents"
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center border-r border-b border-gray-200 bg-[#f9f9f9] text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.126.338a2.01 2.01 0 0 1 1.415 1.415c.336 1.074.312 3.37.312 4.248 0 .878.024 3.174-.312 4.248a2.01 2.01 0 0 1-1.415 1.415c-1.139.305-5.304.335-6.126.338a16.599 16.599 0 0 1-2.186.002 16.598 16.598 0 0 1-2.186-.002c-.822-.003-4.987-.033-6.126-.338a2.01 2.01 0 0 1-1.415-1.415c-.336-1.074-.312-3.37-.312-4.248 0-.878-.024-3.174.312-4.248a2.01 2.01 0 0 1 1.415-1.415c1.139-.305 5.304-.335 6.126-.338a16.602 16.602 0 0 1 2.186.002zM6.273 12.001 10.963 8 6.273 4.001v7.999z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@nayabscents.com"
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center border-r border-b border-gray-200 bg-[#f9f9f9] text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="bg-black text-white px-4 py-2 font-serif text-xl tracking-widest border border-black cursor-pointer">
              Nayab <span className="block text-[8px] text-center tracking-[0.2em] -mt-1 text-gray-300">SCENTS</span>
            </div>
            <div className="text-xs text-gray-500 text-center md:text-left">
              Copyright 2025 Nayab Scents all rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={scrollToTop} className="bg-[#666] hover:bg-[#444] text-white w-10 h-10 flex items-center justify-center rounded-sm transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* POPUP MODAL */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setActivePopup(null)}>
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActivePopup(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {renderPopupContent()}
          </div>
        </div>
      )}
    </>
  );
}