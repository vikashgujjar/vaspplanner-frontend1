"use client";
import Link from 'next/link';

import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent text-4xl md:text-6xl font-black uppercase tracking-widest">
              Lost in Gifting
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide flex items-center justify-center gap-3">
            <Sparkles className="text-amber-400" />
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            It seems the page you are looking for has been moved or doesn't exist anymore. Don't worry, our best gifts are still waiting for you!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>

          {/* Suggested Links */}
          <div className="pt-16">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-6">Popular Sections</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Link href="/faqs" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">FAQs</Link>
              <Link href="/careers" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Careers</Link>
              <Link href="/about-us" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">About Us</Link>
              <Link href="/contact-us" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
