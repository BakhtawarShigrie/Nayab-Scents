"use client";
import { useState, useEffect, use, useCallback } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/database/data";
import { getReviewsForProduct, Review } from "@/database/reviews";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext"; 
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); 
  const router = useRouter();
  const productId = parseInt(resolvedParams.id);
  const product = PRODUCTS.find((p) => p.id === productId);
  
  const { addToCart } = useCart();
  const { user } = useAuth(); 

  // --- States ---
  const [selectedSize, setSelectedSize] = useState("50 ml");
  const [quantity, setQuantity] = useState(1);
  
  // Reviews State
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [fakeReviewCount, setFakeReviewCount] = useState(43);
  
  // User Review Form State
  const [userReview, setUserReview] = useState({ rating: 5, comment: "" });
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); 

  // --- Helper to Submit Review (Moved Up & Wrapped in useCallback) ---
  const submitReview = useCallback((comment: string, rating: number) => {
    const newReview: Review = {
      id: `user-${Date.now()}`,
      name: user?.name || "Anonymous", 
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    localStorage.setItem(`review_product_${productId}`, JSON.stringify(newReview));
    
    // Functional update to avoid dependency on reviewsList
    setReviewsList(prev => {
        const filtered = prev.filter(r => !r.id.startsWith('user-'));
        return [newReview, ...filtered];
    });
    setIsReviewSubmitted(true);
  }, [productId, user]);

  // --- Initial Data Loading ---
  useEffect(() => {
    if (!product) return;

    // 1. Random Fake Review Count
    const randomCount = 3000 + (productId * 987) % 12000; 
    setFakeReviewCount(randomCount);

    // 2. Load Dummy Reviews
    let dummyReviews = getReviewsForProduct(productId);
    dummyReviews = dummyReviews.sort(() => Math.random() - 0.5);

    // 3. Load Submitted Review from Local Storage
    const storedReview = localStorage.getItem(`review_product_${productId}`);
    if (storedReview) {
      const parsedReview = JSON.parse(storedReview);
      setUserReview({ rating: parsedReview.rating, comment: parsedReview.comment });
      setIsReviewSubmitted(true);
      setReviewsList([parsedReview, ...dummyReviews]);
    } else {
      setReviewsList(dummyReviews);
    }

    // 4. Auto Submit Draft after Login
    const draftReview = localStorage.getItem(`draft_review_${productId}`);
    if (user && draftReview) {
      const parsedDraft = JSON.parse(draftReview);
      setUserReview(parsedDraft);
      submitReview(parsedDraft.comment, parsedDraft.rating);
      localStorage.removeItem(`draft_review_${productId}`); 
    }

  }, [productId, product, user, submitReview]); // submitReview added to dependencies

  if (!product) {
    return <div className="text-center pt-40 text-black">Product not found</div>;
  }

  const handleReviewSubmit = () => {
    if (!userReview.comment) {
      alert("Please write a review.");
      return;
    }

    if (!user) {
      localStorage.setItem(`draft_review_${productId}`, JSON.stringify(userReview));
      setShowLoginPopup(true);
      return;
    }

    submitReview(userReview.comment, userReview.rating);
  };

  const handleDeleteReview = () => {
    localStorage.removeItem(`review_product_${productId}`);
    setIsReviewSubmitted(false);
    setUserReview({ rating: 5, comment: "" });
    const filteredList = reviewsList.filter(r => !r.id.startsWith('user-'));
    setReviewsList(filteredList);
  };

  const handleEditReview = () => {
    setIsReviewSubmitted(false); 
  };

  // --- Handlers for Cart & Pricing ---
  const currentPrice = product.prices[selectedSize as keyof typeof product.prices];
  
  const originalPriceNum = parseInt(currentPrice.replace(/[^0-9]/g, "")) * 1.2; 
  const originalPrice = `Rs. ${Math.round(originalPriceNum).toLocaleString()}`;
  const relatedProducts = PRODUCTS.filter((p) => p.id !== productId).slice(0, 4);
  
  const handleAddToCart = () => { addToCart(product, selectedSize); };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 text-black flex flex-col justify-between relative">
      <div className="container mx-auto px-4 max-w-6xl pb-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square md:aspect-[3/4] border border-gray-200 group">
            <Image src={product.image} alt={product.title} fill className="object-contain p-10 group-hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
          </div>
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity w-fit">
                <div className="flex text-[#D4B07B] text-lg">★★★★★</div>
                <span className="text-sm text-gray-500 underline hover:text-black transition-colors">{fakeReviewCount.toLocaleString()} reviews</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-green-700">{currentPrice}</span>
                <span className="text-gray-400 line-through text-lg">{originalPrice}</span>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">-20%</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {product.stock} items in stock
              </div>
            </div>
            <hr className="border-gray-200" />
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Size</label>
                <div className="flex flex-wrap gap-3">
                  {['30 ml', '50 ml', '100 ml'].map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-6 py-2 rounded-md text-sm font-bold border transition-all cursor-pointer ${selectedSize === size ? "bg-black text-white border-black shadow-md transform scale-105" : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black hover:bg-gray-50 hover:shadow-sm"}`}>{size}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Quantity</label>
                <div className="inline-flex items-center border border-black rounded-md h-12 w-32 bg-white hover:shadow-sm transition-shadow">
                  <button onClick={() => quantity > 1 && setQuantity(q => q - 1)} className="w-10 h-full flex items-center justify-center text-lg hover:bg-gray-100 border-r border-gray-300 cursor-pointer">-</button>
                  <span className="flex-1 text-center font-bold text-black select-none">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-full flex items-center justify-center text-lg hover:bg-gray-100 border-l border-gray-300 cursor-pointer">+</button>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <button onClick={handleAddToCart} className="w-full bg-[#3d0c11] hover:bg-[#2a080c] hover:scale-[1.01] text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-lg text-sm cursor-pointer active:scale-95">Add to cart</button>
              <button onClick={() => router.push('/checkout')} className="w-full bg-white border border-[#3d0c11] text-[#3d0c11] hover:bg-[#3d0c11] hover:text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all text-sm cursor-pointer active:scale-95 hover:shadow-md">Buy it now</button>
              <button className="w-full bg-gray-800 hover:bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer hover:shadow-xl hover:scale-[1.01] active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>Product Video</button>
            </div>

            {/* REVIEWS SLIDER */}
            <div className="mt-8 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm relative">
              <div className="flex justify-between items-end mb-4">
                 <div><h3 className="text-lg font-bold font-serif text-black">Customer Reviews</h3><p className="text-xs text-gray-500">Based on {fakeReviewCount.toLocaleString()} reviews</p></div>
                 <div className="flex gap-2">
                    <button className="swiper-button-prev-custom w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors cursor-pointer text-xs">❮</button>
                    <button className="swiper-button-next-custom w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors cursor-pointer text-xs">❯</button>
                 </div>
              </div>
              <Swiper modules={[Autoplay, Navigation]} spaceBetween={20} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }} className="w-full">
                {reviewsList.map((review, index) => (
                  <SwiperSlide key={review.id || index}>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                           <div className="flex text-[#D4B07B] text-sm">{Array(Math.floor(review.rating)).fill(0).map((_, i) => <span key={i}>★</span>)}</div>
                           <p className="text-xs font-bold text-black mt-1">{review.name} <span className="text-green-600 font-normal text-[10px]">Verified Buyer</span></p>
                        </div>
                        <p className="text-[10px] text-gray-400">{review.date}</p>
                      </div>
                      {/* Fixed Quotes here */}
                      <p className="text-sm text-gray-700 italic">&quot;{review.comment}&quot;</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* --- WRITE A REVIEW --- */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-20 shadow-md">
          <h2 className="text-2xl font-bold font-serif text-black mb-6 uppercase tracking-wider text-center">Write a Review</h2>
          {!isReviewSubmitted ? (
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-300 p-3 rounded text-sm text-gray-500 bg-gray-100 flex items-center">
                  {user ? user.name : "Please Login to Review"}
                </div>
                <select value={userReview.rating} onChange={(e) => setUserReview({...userReview, rating: parseInt(e.target.value)})} className="border cursor-pointer border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-black">
                  <option value="5">★★★★★ (Excellent)</option>
                  <option value="4">★★★★☆ (Good)</option>
                  <option value="3">★★★☆☆ (Average)</option>
                  <option value="2">★★☆☆☆ (Poor)</option>
                  <option value="1">★☆☆☆☆ (Terrible)</option>
                </select>
              </div>
              <textarea placeholder="Write your review here..." rows={4} value={userReview.comment} onChange={(e) => setUserReview({...userReview, comment: e.target.value})} className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-black resize-none" />
              <button onClick={handleReviewSubmit} className="bg-black text-white py-3 rounded uppercase font-bold tracking-widest text-xs hover:bg-gray-800 transition-colors w-full md:w-auto self-end cursor-pointer px-10">Post Review</button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-6 rounded text-center">
              <div className="flex justify-center text-green-600 mb-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              <h3 className="text-lg font-bold text-green-800">Review Submitted!</h3>
              <p className="text-sm text-green-700 mb-4">Your review has been posted and saved.</p>
              <div className="bg-white p-4 rounded border border-green-100 max-w-lg mx-auto text-left mb-4">
                 <p className="font-bold text-black">{user?.name || "You"}</p>
                 <div className="flex text-[#D4B07B] text-sm my-1">{Array(userReview.rating).fill(0).map((_, i) => <span key={i}>★</span>)}</div>
                 {/* Fixed Quotes here */}
                 <p className="text-gray-700 text-sm">&quot;{userReview.comment}&quot;</p>
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={handleEditReview} className="text-xs font-bold uppercase underline hover:text-black cursor-pointer text-gray-500">Edit</button>
                <button onClick={handleDeleteReview} className="text-xs font-bold uppercase underline hover:text-red-600 cursor-pointer text-red-400">Delete</button>
              </div>
            </div>
          )}
        </div>

        {/* --- You May Also Like --- */}
        <div className="mt-20">
          <div className="flex items-center w-full mb-10">
            {/* Tailwind Canonical Class Fix: h-px */}
            <div className="flex-1 h-px bg-gray-200" />
            <h2 className="text-2xl md:text-5xl font-bold text-black px-4 md:px-8 tracking-tight uppercase text-center whitespace-nowrap font-serif">You May Also Like</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-10">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} title={p.title} prices={p.prices} image={p.image} />
            ))}
          </div>
        </div>

      </div>
      
      {/* --- LOGIN POPUP --- */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl p-8 relative text-center">
            <button onClick={() => setShowLoginPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold font-serif text-black mb-4">Login Required</h3>
            <p className="text-gray-600 mb-6 text-sm">You must be logged in to post a review.</p>
            <button 
              onClick={() => router.push(`/login?redirect=/products/${productId}`)}
              className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
            >
              Login Now
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}