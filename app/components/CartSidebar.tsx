"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateSize, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={toggleCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-100">
              <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-black">
                Your Cart ({cart.length})
              </h2>
              <button onClick={toggleCart} className="text-black cursor-pointer hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-6 ${cart.length === 0 ? 'flex flex-col justify-center items-center' : 'space-y-6'}`}>
              {cart.length === 0 ? (
                <div className="text-center">
                  <div className="mb-6 flex justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                  </div>
                  <p className="text-gray-800 font-bold text-lg mb-2">Your cart is empty.</p>
                  <button onClick={toggleCart} className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Go Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  // KEY UPDATE: key ab ID + Size combine hai
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border-b border-gray-200 pb-6">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-300">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-bold text-sm text-black">{item.title}</h3>
                        <p className="font-bold text-sm text-black">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <label className="text-xs text-black font-bold uppercase">Size:</label>
                        <select
                          value={item.selectedSize}
                          // UPDATE: Pass 'item.selectedSize' (oldSize)
                          onChange={(e) => updateSize(item.id, item.selectedSize, e.target.value)}
                          className="text-xs border cursor-pointer border-gray-400 rounded px-2 py-1 bg-white text-black focus:outline-none focus:border-black font-medium"
                        >
                          <option value="30 ml">30 ml</option>
                          <option value="50 ml">50 ml</option>
                          <option value="100 ml">100 ml</option>
                        </select>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-400 rounded bg-white">
                          <button 
                            // UPDATE: Pass 'item.selectedSize'
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="px-2 cursor-pointer py-1 text-black hover:bg-gray-200 border-r border-gray-300 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 text-xs text-black font-bold">{item.quantity}</span>
                          <button 
                            // UPDATE: Pass 'item.selectedSize'
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="px-2 py-1 cursor-pointer text-black hover:bg-gray-200 border-l border-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <button
                          // UPDATE: Pass 'item.selectedSize'
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-xs cursor-pointer text-red-600 hover:text-red-800 font-bold underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-100 border-t border-gray-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold uppercase text-black">Subtotal</span>
                  <span className="text-xl font-bold text-black">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link href="/checkout">
                  <button onClick={toggleCart} className="w-full cursor-pointer bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors border border-black">
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}