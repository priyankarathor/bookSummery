"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react"; // Optional: for extra flair

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push("dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4 py-6    ">
      {/* Container with refined shadow and border */}
      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] grid md:grid-cols-2 overflow-hidden border border-gray-100">
        
        {/* LEFT ILLUSTRATION - Upgraded with Mesh Gradient */}
        <div className="relative hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#f7f7f7] p-12 border-r border-gray-50">
          
          {/* Animated Background Orbs */}
          <div className="absolute top-20 left-10 w-[200px] h-[200px] bg-orange-200 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[250px] h-[250px] bg-blue-100 rounded-full blur-[100px] opacity-40"></div>

          <div className="relative z-10 text-center mb-8">
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">Expand your business globally</h3>
            <p className="text-sm text-gray-500 mt-2">The most trusted platform for sellers.</p>
          </div>

          <Image
            src="/illustration1.png"
            alt="Seller Illustration"
            width={400}
            height={400}
            priority
            className="relative z-10 object-contain animate-float drop-shadow-2xl"
          />
        </div>

        {/* RIGHT LOGIN - Upgraded with Professional Layout */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-16">
          
          <div className="w-full max-w-[320px]">
            {/* Amazon Logo with subtle lift */}
            <div className="flex justify-center mb-10">
              <Image
                src="/AmazonLogo.png"
                alt="Amazon"
                width={120}
                height={36}
                className="brightness-90"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Sign in
            </h2>
            <p className="text-sm text-gray-500 mb-8 font-medium">Enter your credentials to manage your store.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="group">
                <label className="text-[13px] font-bold text-gray-700 ml-1">
                  Email or mobile phone number
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:border-orange-500 focus:ring-[3px] focus:ring-orange-100 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Password */}
              <div className="group">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[13px] font-bold text-gray-700">
                    Password
                  </label>
                  <button type="button" className="text-[12px] font-semibold text-blue-600 hover:text-orange-600 transition-colors">
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:border-orange-500 focus:ring-[3px] focus:ring-orange-100 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Login Button with Premium Gradient */}
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] border border-[#a88734] py-3 rounded-xl font-bold text-gray-800 shadow-md active:scale-[0.98] transition-all"
              >
                Sign In
              </button>

              {/* Footer text */}
              <div className="pt-4 border-t border-gray-100 mt-6 text-center">
                <p className="text-[11px] text-gray-500 leading-relaxed px-2">
                  By continuing, you agree to Amazon's <span className="text-blue-600 cursor-pointer hover:underline">Conditions of Use</span> and <span className="text-blue-600 cursor-pointer hover:underline">Privacy Notice</span>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating animation - Global Styles */}
      <style jsx global>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}