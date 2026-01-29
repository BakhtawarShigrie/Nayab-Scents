"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { toggleCart, cart } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [popupData, setPopupData] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [copied, setCopied] = useState(false); 

  const GLOBAL_REDEEM_CODE = "NAYAB20"; 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 640;
      const targetId = isMobile ? "trending" : "categories";
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const sectionTop = targetSection.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
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

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GLOBAL_REDEEM_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMenuClick = (item: any) => {
    if (item.action) {
      let content: React.ReactNode = "";
      
      if (item.action === "about") {
        content = (
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
            <p>Welcome to <strong>Nayab Scents</strong>, where luxury meets affordability. We craft premium, long-lasting fragrances inspired by global bestsellers, designed to leave a lasting impression.</p>
            <p>Our mission is simple: To make high-quality scents accessible to everyone in Pakistan. Proudly Made in Pakistan.</p>
          </div>
        );
      } else if (item.action === "contact") {
        content = (
          <div className="space-y-4 text-sm text-gray-600 text-left">
            <p>Have questions or need support? Reach out to us!</p>
            <div className="bg-gray-50 p-4 rounded border border-gray-100 space-y-2">
              <p><strong>📞 WhatsApp:</strong> +92 317 6402959</p>
              <p><strong>📧 Email:</strong> Nayabscentsofficial@gmail.com</p>
              <p><strong>📍 Location:</strong> Lahore, Pakistan</p>
            </div>
            <p className="text-xs">Customer Support Timings: Mon-Sat (10 AM - 8 PM)</p>
          </div>
        );
      } else if (item.action === "redeem") {
        content = (
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
      }

      setPopupData({ title: item.name, content });
      setIsMenuOpen(false); 
    } else {
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { name: "Sale", href: "/products?sale=true", color: "text-red-600" },
    { name: "Best & Trending", href: "/#trending" },
    { name: "All Products", href: "/products" },
    { name: "Discounted Bundle", href: "/#collections" }, 
    { name: "Articles", href: "/#journal" }, 
    { name: "FAQ's", href: "/#faq" }, 
    { name: "About us", action: "about" }, 
    { name: "Contact us", action: "contact" }, 
    { name: "Redeem Codes", action: "redeem" }, 
    { name: "Wishlist", href: "/wishlist" },
    { name: "Checkout", href: "/checkout" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-500 w-full ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md text-black py-4 shadow-md"
            : "bg-transparent text-white py-6 mix-blend-difference"
        }`}
      >
        
        {/* LEFT: Menu Button & Logo */}
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={toggleMenu} className="hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo Hidden on Mobile (hidden md:block) */}
          <Link href="/" className="hidden md:block font-serif text-lg md:text-xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">
            Nayab Scents
          </Link>
        </div>

        {/* RIGHT: User -> Wishlist -> Cart Icons */}
        <div className="flex items-center gap-5 md:gap-6">
          
          {/* 1. USER ICON / NAME */}
          {user ? (
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleProfile(); }} 
                className="font-bold text-xs uppercase tracking-wide border border-current px-3 py-1 rounded-full cursor-pointer hidden sm:block hover:bg-black hover:text-white transition-colors"
              >
                {user.name.split(' ')[0]}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-32 bg-white text-black shadow-xl rounded-md overflow-hidden border border-gray-100"
                  >
                    <div className="px-4 py-2 text-[10px] text-gray-500 border-b border-gray-100">
                      Signed in as <br/> <span className="font-bold text-black">{user.name}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-xs font-bold uppercase hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12" /></svg>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="hover:opacity-70 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
          )}

          {/* 2. WISHLIST ICON */}
          <Link href="/wishlist" className="relative hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* 3. CART ICON */}
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

      {/* --- LEFT MENU SIDEBAR --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-[70] w-[80%] max-w-sm bg-white shadow-2xl flex flex-col text-black"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <span className="font-serif text-xl font-bold tracking-widest uppercase">Menu</span>
                <button onClick={toggleMenu} className="text-black hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Scrollable Menu Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
                {menuItems.map((item, index) => (
                  item.action ? (
                    <button 
                      key={index} 
                      onClick={() => handleMenuClick(item)}
                      className="block w-full text-left text-sm font-bold uppercase tracking-wider py-3 border-b border-gray-100 hover:pl-2 transition-all text-black hover:text-green-700"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link 
                      key={index} 
                      href={item.href || "#"} 
                      onClick={toggleMenu}
                      className={`block text-sm font-bold uppercase tracking-wider py-3 border-b border-gray-100 hover:pl-2 transition-all ${item.color || "text-black hover:text-green-700"}`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>

              {/* Fixed Bottom: Login/Logout & Socials */}
              <div className="border-t border-gray-200 bg-gray-50">
                {user ? (
                  <div className="w-full bg-black text-white py-4 px-6 flex justify-between items-center">
                    <span className="font-bold text-sm truncate">Hi, {user.name.split(" ")[0]}</span>
                    <button 
                      onClick={handleLogout} 
                      className="text-xs font-bold uppercase tracking-widest hover:text-red-400 flex items-center gap-2 border border-white/20 px-3 py-1.5 rounded-full hover:border-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login" onClick={toggleMenu}>
                    <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                      Login / Register
                    </button>
                  </Link>
                )}
                
                <div className="flex justify-center gap-6 py-6 text-black">
                  <a href="https://www.facebook.com/NayabScents" target="_blank" className="hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/nayab.scents" target="_blank" className="hover:text-pink-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /></svg>
                  </a>
                  <a href="https://www.youtube.com/@nayabscents" target="_blank" className="hover:text-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.126.338a2.01 2.01 0 0 1 1.415 1.415c.336 1.074.312 3.37.312 4.248 0 .878.024 3.174-.312 4.248a2.01 2.01 0 0 1-1.415 1.415c-1.139.305-5.304.335-6.126.338a16.599 16.599 0 0 1-2.186.002 16.598 16.598 0 0 1-2.186-.002c-.822-.003-4.987-.033-6.126-.338a2.01 2.01 0 0 1-1.415-1.415c-.336-1.074-.312-3.37-.312-4.248 0-.878-.024-3.174.312-4.248a2.01 2.01 0 0 1 1.415-1.415c1.139-.305 5.304-.335 6.126-.338a16.602 16.602 0 0 1 2.186.002zM6.273 12.001 10.963 8 6.273 4.001v7.999z" /></svg>
                  </a>
                  <a href="https://www.tiktok.com/@nayabscents.com" target="_blank" className="hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" /></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- INFO POPUP MODAL --- */}
      {popupData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl p-6 relative text-center border border-gray-100">
            <button 
              onClick={() => setPopupData(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            {popupData.title !== "Redeem Codes" && (
              <h3 className="text-xl font-bold font-serif text-black mb-6 border-b border-gray-100 pb-2">{popupData.title}</h3>
            )}
            
            <div className="text-gray-700">
              {popupData.content}
            </div>
            
            <button 
              onClick={() => setPopupData(null)}
              className="mt-6 w-full bg-black text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}