"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { WHATSAPP_NUMBER } from "@/database/data";

export default function CheckoutPage() {
  const { cart, updateSize, updateQuantity, removeFromCart, cartTotal } = useCart();
  const SHIPPING_COST = 250;
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    if (!formData.name || !formData.phone || !formData.city || !formData.address) {
      alert("Please fill in all fields.");
      return;
    }

    const orderItems = cart.map(item => 
      `• ${item.title} (${item.selectedSize}) x ${item.quantity} - ${item.price}`
    ).join("\n");

    const totalAmount = cartTotal + SHIPPING_COST;

    const message = `*New Order Request - Nayab Scents*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `City: ${formData.city}\n` +
      `Address: ${formData.address}\n\n` +
      `*Order Summary:*\n` +
      `${orderItems}\n\n` +
      `*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n` +
      `*Shipping:* Rs. ${SHIPPING_COST}\n` +
      `*Total:* Rs. ${totalAmount.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 text-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 font-serif text-black">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* --- LEFT SIDE: CART EDITABLE ITEMS --- */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-300">
              <h2 className="text-lg md:text-xl font-bold mb-6 uppercase tracking-wider text-black">Order Summary</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-800 font-medium">Your cart is empty. <Link href="/" className="underline text-black font-bold">Go Shopping</Link></p>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex flex-row items-start gap-4 border-b border-gray-300 last:border-0 pb-4 mb-4 last:mb-0">
                    
                    {/* Image */}
                    <div className="relative w-20 h-20 md:w-32 md:h-32 bg-white rounded-md border border-gray-200 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm md:text-lg font-bold text-black leading-tight">{item.title}</h3>
                        <p className="text-sm md:text-lg font-bold text-[#1a2b5a] ml-2 whitespace-nowrap">{item.price}</p>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex flex-col gap-2 mt-2">
                        {/* Size Selector */}
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] md:text-xs text-black font-bold uppercase">Size:</label>
                          <select 
                            value={item.selectedSize}
                            onChange={(e) => updateSize(item.id, item.selectedSize, e.target.value)}
                            className="bg-white border border-gray-400 text-black rounded px-2 py-1 text-[10px] md:text-sm font-bold focus:outline-none"
                          >
                            <option value="30 ml">30 ml</option>
                            <option value="50 ml">50 ml</option>
                            <option value="100 ml">100 ml</option>
                          </select>
                        </div>
                        
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2">
                           <label className="text-[10px] md:text-xs text-black font-bold uppercase">Qty:</label>
                           <div className="flex items-center border border-gray-400 rounded bg-white h-6 md:h-8">
                              <button 
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                className="px-2 text-black hover:bg-gray-200 border-r border-gray-300 font-bold disabled:opacity-50 text-xs h-full"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 text-[10px] md:text-sm font-bold text-black">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                className="px-2 text-black hover:bg-gray-200 border-l border-gray-300 font-bold text-xs h-full"
                              >
                                +
                              </button>
                           </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="mt-3 text-[10px] md:text-sm text-red-600 hover:text-red-800 underline uppercase font-bold tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- RIGHT SIDE: PAYMENT DETAILS (Fixed) --- */}
          <div className="md:col-span-1">
            <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-xl sticky top-24">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b border-gray-700 pb-4">Payment Details</h2>
              
              {/* === NEW ADDITION: Product List in Payment Details === */}
              {cart.length > 0 && (
                <div className="mb-6 space-y-3 border-b border-gray-700 pb-6">
                  {cart.map((item) => (
                    <div key={`summary-${item.id}-${item.selectedSize}`} className="flex justify-between items-start text-sm">
                      <div className="text-gray-300 w-2/3">
                        {item.title} 
                        <span className="text-xs text-gray-500 block">({item.selectedSize})</span>
                      </div>
                      <div className="font-bold text-white">
                        x {item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* =================================================== */}

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Subtotal</span>
                  <span className="font-bold">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Shipping</span>
                  <span className="font-bold">Rs. {SHIPPING_COST}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-green-400">Rs. {(cartTotal + SHIPPING_COST).toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                disabled={cart.length === 0}
                className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                Place Order (COD)
              </button>
              
              <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
                By placing this order, you agree to Nayab Scents Terms and Conditions.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- ORDER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6 md:p-8 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center font-serif text-black uppercase tracking-wider">
              Enter Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
                  placeholder="e.g. Ali Khan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
                  placeholder="e.g. 0300 1234567"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">City</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
                  placeholder="e.g. Lahore"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none text-sm"
                  placeholder="House #, Street, Area..."
                />
              </div>

              <button 
                onClick={handleConfirmOrder}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 mt-4 font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                Confirm on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}