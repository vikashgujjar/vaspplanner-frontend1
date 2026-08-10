"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Truck,
  Gift,
  Heart,
  Star,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Quote,
  Shield,
  Phone,
  Eye,
  Target,
  Gem,
  Users,
  Clock,
  CreditCard,
  Headphones
} from "lucide-react";
import SuccessStory from "./Testmonails";
import { commonService } from "../services/commonService";

export default function Aboutus() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await commonService.fetchPageContent('about-us');
      if (data) {
        setContent(data);
      }
      setLoading(false);
    };
    loadContent();
  }, []);

  const stats = [
    { value: "100%", label: "Fresh Quality", color: "from-pink-500 to-rose-500" },
    { value: "1M+", label: "Happy Customers", color: "from-blue-500 to-indigo-500" },
    { value: "2-Hour", label: "Express Delivery", color: "from-purple-500 to-violet-500" },
    { value: "500+", label: "Gift Options", color: "from-green-500 to-emerald-500" }
  ];

  const values = [
    {
      title: "Our Mission",
      description: "To make every celebration memorable by delivering joy, love, and happiness through thoughtfully curated gifts that touch hearts and create lasting memories.",
      icon: <Target size={28} />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-100"
    },
    {
      title: "Our Vision",
      description: "To become India's most trusted gifting platform, known for exceptional quality, timely delivery, and personalized experiences that exceed expectations.",
      icon: <Eye size={28} />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100"
    },
    {
      title: "Our Values",
      description: "Quality, reliability, and customer happiness are at the core of everything we do. We believe in creating moments that matter and memories that last.",
      icon: <Gem size={28} />,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* SECTION 1: HERO BANNER */}
      <div className="relative overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/img/commonBanner/1.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0f0f0f]" />
        </div>

        <div className="relative z-10 py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                  {content?.title || "Our Story"}
                </span>
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide uppercase">
                About{" "}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Us</span>
              </h1>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} className="text-amber-500" />
                <span className="text-amber-400">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: DYNAMIC CONTENT & STORY */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1 flex justify-center">
               <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-2">
                      <img
                        src="/img/about/abouthero.webp"
                        alt="About VASP Planner"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <div className="flex flex-col items-center lg:items-start gap-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full">
                  <Sparkles size={16} className="text-pink-500" />
                  <span className="text-pink-600 text-sm font-medium">Get to Know Us</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:text-left uppercase">
                  We're Delivering <span className="text-pink-600">Happiness</span>
                </h2>

                {content && content.content ? (
                  <div className="prose prose-amber lg:prose-lg max-w-none text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: content.content }} />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 text-lg leading-relaxed text-center lg:text-left">
                      At <span className="text-pink-600 font-semibold">VASP Planner</span>, we believe in the power of thoughtful gifting to strengthen bonds and create lasting memories. We are India's premier online gifting platform.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed text-center lg:text-left">
                      Whether it's a birthday, anniversary, or a simple gesture of love, VASP Planner offers a curated experience.
                    </p>
                  </>
                )}

                <Link
                  href="/category/all-products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 mt-4"
                >
                  Explore Collection
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS */}
      <section className="relative py-16 bg-[#0f0f0f] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all">
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MISSION/VALUES */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`${value.bgColor} rounded-3xl p-8 border ${value.borderColor} hover:shadow-xl transition-all group`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}