"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, FileText, Shield, Info, HelpCircle } from "lucide-react";

const PolicyLayout = ({ title, subtitle, breadcrumb, children, icon: Icon = FileText }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{ backgroundImage: "url('/img/commonBanner/1.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0f0f0f]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                {subtitle || "Company Policy"}
              </span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
              {title.split(" ").map((word, i) => (
                <span key={i} className={i === title.split(" ").length - 1 ? "bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight size={14} className="text-amber-500" />
              <span className="text-amber-400 font-medium">{breadcrumb || title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative py-16 md:py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
               {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
