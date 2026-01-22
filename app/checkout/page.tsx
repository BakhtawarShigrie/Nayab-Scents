"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { cart, updateSize, updateQuantity, removeFromCart, cartTotal } = useCart();
  const SHIPPING_COST = 250;

  return (
    <div className="bg-white min-h-screen pt-10 pb-20 text-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 font-serif text-black">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-black">Order Summary</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-800 font-medium">Your cart is empty. <Link href="/" className="underline text-black font-bold">Go Shopping</Link></p>
              ) : (
                cart.map((item) => (
                  // KEY UPDATE: key={`${item.id}-${item.selectedSize}`}
                  <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-300 last:border-0 pb-6 mb-6 last:mb-0">
                    <div className="relative w-32 h-32 bg-white rounded-md border border-gray-200 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <h3 className="text-lg font-bold text-black">{item.title}</h3>
                        <p className="text-lg font-bold text-[#1a2b5a]">{item.price}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4 justify-center sm:justify-start">
                        <div className="flex flex-col items-center sm:items-start">
                          <label className="text-xs text-black font-bold uppercase mb-1">Size</label>
                          <select 
                            value={item.selectedSize}
                            // UPDATE: Pass oldSize (item.selectedSize)
                            onChange={(e) => updateSize(item.id, item.selectedSize, e.target.value)}
                            className="bg-white border border-gray-400 text-black rounded px-3 py-2 text-sm font-bold focus:outline-none focus:border-black shadow-sm"
                          >
                            <option value="30 ml">30 ml</option>
                            <option value="50 ml">50 ml</option>
                            <option value="100 ml">100 ml</option>
                          </select>
                        </div>
                        
                        <div className="flex flex-col items-center sm:items-start">
                           <label className="text-xs text-black font-bold uppercase mb-1">Quantity</label>
                           <div className="flex items-center border border-gray-400 rounded bg-white">
                              <button 
                                // UPDATE: Pass item.selectedSize
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                className="px-3 py-2 text-black hover:bg-gray-200 border-r border-gray-300 font-bold disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-4 py-2 text-sm font-bold text-black">{item.quantity}</span>
                              <button 
                                // UPDATE: Pass item.selectedSize
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                className="px-3 py-2 text-black hover:bg-gray-200 border-l border-gray-300 font-bold"
                              >
                                +
                              </button>
                           </div>
                        </div>
                      </div>

                      <button 
                        // UPDATE: Pass item.selectedSize
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="mt-4 text-sm text-red-600 hover:text-red-800 underline uppercase font-bold tracking-wider"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-black text-white p-8 rounded-lg shadow-xl sticky top-10">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b border-gray-700 pb-4">Payment Details</h2>
              
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

              <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm">
                Place Order (COD)
              </button>
              
              <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
                By placing this order, you agree to Nayab Scents Terms and Conditions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}