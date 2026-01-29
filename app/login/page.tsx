"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

function LoginForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Jis page se user aaya hai, wahan wapis bhejne ke liye
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter both Name and Phone Number.");
      return;
    }
    
    login(name, phone);
    
    // Login ke baad redirect
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full">
        <h1 className="text-3xl font-serif font-bold text-center mb-8 text-black">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:border-black"
              placeholder="e.g. Ali Khan"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase mb-2">WhatsApp Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:border-black"
              placeholder="e.g. 0300 1234567"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}