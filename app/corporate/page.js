"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Gift,
  Users,
  Building2,
  Award,
  Package,
  Truck,
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Sparkles,
  ChevronDown,
  Quote,
  Globe,
  Send,
  MessageCircle,
  Palette,
  BadgeCheck,
  Zap,
  Headphones,
  Briefcase,
  Heart,
  Clock,
  Check
} from "lucide-react";

export default function CorporateGifts() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    occasion: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Our team will contact you within 24 hours.");
  };

  // Gift Categories
  const corporateCategories = [
    { id: 1, name: "Luck & Prosperity", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400", emoji: "🍀" },
    { id: 2, name: "Health Hamper", image: "https://images.unsplash.com/photo-1512418490979-92798ccc1340?q=80&w=400", emoji: "💪" },
    { id: 3, name: "Practical Hampers", image: "https://images.unsplash.com/photo-1611073123048-3ad51021822c?q=80&w=400", emoji: "🎒" },
    { id: 4, name: "Tech Hampers", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=400", emoji: "💻" },
    { id: 5, name: "Plants & Green", image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=400", emoji: "🌱" },
    { id: 6, name: "Dry Fruits", image: "https://images.unsplash.com/photo-1548174513-b7c1b3954305?q=80&w=400", emoji: "🥜" },
    { id: 7, name: "Personalized", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=400", emoji: "✨" },
    { id: 8, name: "Client Gifting", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400", emoji: "🤝" },
  ];

  // How it works steps
  const steps = [
    { id: "01", title: "Share Your Plan", icon: MessageCircle, desc: "Tell us your budget & preferences", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-50" },
    { id: "02", title: "Choose Package", icon: Gift, desc: "Select or customize your bundle", gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
    { id: "03", title: "Custom Branding", icon: Palette, desc: "Add logo & personalization", gradient: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
    { id: "04", title: "We Deliver", icon: Truck, desc: "Pan-India & global shipping", gradient: "from-pink-500 to-rose-600", bg: "bg-pink-50" },
  ];

  // International destinations
  const countries = [
    { name: "USA", flag: "🇺🇸" },
    { name: "UAE", flag: "🇦🇪" },
    { name: "UK", flag: "🇬🇧" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "France", flag: "🇫🇷" },
    { name: "Japan", flag: "🇯🇵" },
  ];

  // FAQs
  const faqs = [
    { q: "What is the minimum order quantity for corporate gifts?", a: "Our minimum order starts at 25 units. For orders above 100 units, we offer additional bulk discounts up to 40% off." },
    { q: "Can we add our company logo on the packaging?", a: "Absolutely! We offer complete branding solutions including custom boxes, ribbons, cards, and even product labels with your company branding." },
    { q: "Do you deliver pan-India and internationally?", a: "Yes, we have a delivery network across 400+ cities in India and ship to 50+ countries worldwide including USA, UK, UAE, Singapore, and more." },
    { q: "What is the delivery timeline for bulk orders?", a: "Standard bulk orders are delivered within 7-10 business days. Express delivery is available within 3-5 days at an additional charge." },
    { q: "Do you provide GST invoices?", a: "Yes, we provide complete GST-compliant invoices for all corporate orders. We also offer credit terms for verified businesses." },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      position: "HR Head, TechCorp India",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      text: "VASP Planner made our Diwali gifting seamless. The wellness kits were a hit among our 500+ employees!"
    },
    {
      name: "Rajesh Kumar",
      position: "CEO, StartupHub",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
      text: "The custom branding options are fantastic. Our branded gift boxes looked premium and professional."
    },
    {
      name: "Amit Patel",
      position: "Operations Manager, Global Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: 5,
      text: "We've been ordering from VASP for 3 years. Consistent quality and their team is always helpful."
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK (Compact) */}
      {/* ============================================== */}
      <section className="relative bg-[#0c0c0c] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1600&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            alt="Corporate Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#0c0c0c]/95 to-[#0c0c0c]/90" />
        </div>

        {/* Gradient Glows */}
        <div className="absolute -top-20 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-violet-500/20 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute -bottom-20 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-amber-500/20 rounded-full blur-[80px] md:blur-[120px]" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-20 sm:pb-24 md:pb-28">

          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full mb-4 sm:mb-6">
              <Building2 size={14} className="text-amber-400 sm:w-4 sm:h-4" />
              <span className="text-amber-300 font-semibold text-xs sm:text-sm">For Businesses & Corporates</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 leading-tight">
              Gifts for Your{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                Clients, Partners
              </span>
              <br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                & Employees
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-4">
              Elevate your business relationships with premium Ayurvedic wellness gifts that show you truly care.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {[
                { value: "500+", label: "Companies" },
                { value: "50K+", label: "Gifts" },
                { value: "50+", label: "Countries" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-2 sm:p-3 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/5">
                  <div className="text-base sm:text-xl md:text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="#quote"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5 group"
              >
                Get a Free Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#categories"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <Package size={18} />
                View Packages
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-[#f8f9fa] rounded-t-[40px] sm:rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 2: FEATURES BAR - LIGHT */}
      {/* ============================================== */}
      <section className="relative -mt-4 z-20 pb-10 sm:pb-14 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/60 p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Globe, title: "Global Shipping", desc: "50+ Countries", gradient: "from-blue-500 to-indigo-600" },
                { icon: Shield, title: "Secure Payments", desc: "100% Safe", gradient: "from-emerald-500 to-teal-600" },
                { icon: Users, title: "Bulk Discounts", desc: "Up to 40% Off", gradient: "from-violet-500 to-purple-600" },
                { icon: Award, title: "Premium Quality", desc: "Guaranteed", gradient: "from-amber-500 to-orange-600" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base truncate">{feature.title}</h4>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: GIFT CATEGORIES - LIGHT */}
      {/* ============================================== */}
      <section id="categories" className="relative py-12 sm:py-16 md:py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-violet-50 border border-violet-100 rounded-full mb-3 sm:mb-4">
              <Gift size={14} className="text-violet-500" />
              <span className="text-violet-600 text-xs sm:text-sm font-semibold">Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Premium Corporate{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Gift Hampers
              </span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg px-4">
              Choose from our thoughtfully curated gift collections
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {corporateCategories.map((cat) => (
              <div key={cat.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300">
                  <img
                    src={cat.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={cat.name}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Emoji Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                    <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-8 sm:mt-10">
            <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5 group">
              View All Categories
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 4: HOW IT WORKS - DARK */}
      {/* ============================================== */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-[#0c0c0c] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-violet-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-amber-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-3 sm:mb-4">
              <Zap size={14} className="text-amber-400" />
              <span className="text-amber-300 text-xs sm:text-sm font-semibold">Simple Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              How Does It{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                Work?
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">
              Follow our easy 4-step process
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="relative p-4 sm:p-5 md:p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl sm:rounded-3xl hover:border-white/20 transition-all group-hover:-translate-y-1 duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl sm:text-3xl md:text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${step.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-t-[40px] sm:rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 5: CRAFTED BY YOU BANNER - LIGHT (Gradient) */}
      {/* ============================================== */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-60 sm:h-60 bg-violet-200/50 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-60 sm:h-60 bg-pink-200/50 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-violet-200 rounded-full mb-4 sm:mb-5 shadow-sm">
                <Sparkles size={14} className="text-violet-500" />
                <span className="text-violet-600 text-xs sm:text-sm font-semibold">Personalization</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
                Crafted by You,{" "}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Loved by All
                </span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Complete branding and personalization solutions to make your corporate gifts truly unique.
              </p>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                {[
                  "Custom branded packaging with your logo",
                  "Personalized greeting cards & messages",
                  "Premium gift wrapping styles",
                  "Bulk customization at no extra cost",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-left">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5 group">
                Explore Options
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/15 transform sm:rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1549462111-999264cb7353?q=80&w=600"
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
                  alt="Custom Gifts"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent" />
              </div>

              {/* Floating Badge - Bottom Left */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-gray-900">100%</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">Customizable</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Top Right */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-gray-900">500+</div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500">Brands</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 6: SEND GIFTS ABROAD - DARK */}
      {/* ============================================== */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-[#0c0c0c] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3 sm:mb-4">
              <Globe size={14} className="text-blue-400" />
              <span className="text-blue-300 text-xs sm:text-sm font-semibold">International Delivery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Send Gifts{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">
              Delivering smiles to your global teams & partners
            </p>
          </div>

          {/* Countries Grid */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-12">
            {countries.map((country, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-2 p-3 sm:p-4 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] rounded-xl sm:rounded-2xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-pointer"
              >
                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{country.flag}</div>
                <span className="text-white font-semibold text-xs sm:text-sm">{country.name}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { value: "50+", label: "Countries", icon: Globe },
              { value: "10K+", label: "Orders", icon: Package },
              { value: "5-7", label: "Days", icon: Clock },
              { value: "24/7", label: "Support", icon: Headphones },
            ].map((stat, index) => (
              <div key={index} className="p-4 sm:p-5 bg-gradient-to-b from-white/[0.06] to-transparent rounded-xl sm:rounded-2xl border border-white/[0.05] text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-[#f8f9fa] rounded-t-[40px] sm:rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 7: TESTIMONIALS - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-pink-50 border border-pink-100 rounded-full mb-3 sm:mb-4">
              <Quote size={14} className="text-pink-500" />
              <span className="text-pink-600 text-xs sm:text-sm font-semibold">Client Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                500+ Companies
              </span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg px-4">
              See what our corporate clients say
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all group"
              >
                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-3 sm:mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400 sm:w-4 sm:h-4" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base line-clamp-4">&quot;{item.text}&quot;</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-pink-100 group-hover:ring-pink-200 transition-all"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-1.5 truncate">
                      {item.name}
                      <BadgeCheck size={14} className="text-pink-500 flex-shrink-0" />
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{item.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client Logos */}
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-gray-200">
            <p className="text-center text-gray-400 mb-6 text-xs sm:text-sm uppercase tracking-widest">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12 opacity-40">
              {["TechCorp", "GlobalSoft", "InnovateTech", "FutureLabs", "DigitalFirst"].map((company, index) => (
                <div key={index} className="text-gray-600 font-bold text-sm sm:text-lg md:text-xl">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 8: INQUIRY FORM - DARK */}
      {/* ============================================== */}
      <section id="quote" className="relative py-12 sm:py-16 md:py-20 bg-[#0c0c0c] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-violet-500/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-3 sm:mb-4">
              <Send size={14} className="text-amber-400" />
              <span className="text-amber-300 text-xs sm:text-sm font-semibold">Get Started</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Your Customized{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                Gifting Solution
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base px-4">
              Share your requirements and we&apos;ll get back within 24 hours
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/[0.08] overflow-hidden">
              <div className="grid lg:grid-cols-5">
                {/* Left - Info */}
                <div className="lg:col-span-2 bg-gradient-to-br from-amber-500 to-orange-600 p-6 sm:p-8 md:p-10 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 leading-tight">
                    Let&apos;s Create Something Special
                  </h3>

                  <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Our experts will craft a personalized proposal tailored to your needs.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-4 mb-6 sm:mb-8">
                    {[
                      { icon: Phone, label: "Phone", value: "+91 1800-123-4567" },
                      { icon: Mail, label: "Email", value: "corporate@vaspplanner.com" },
                      { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210" },
                    ].map((contact, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          <contact.icon size={16} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-white/70">{contact.label}</div>
                          <div className="font-semibold text-sm sm:text-base truncate">{contact.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badge */}
                  <div className="pt-6 border-t border-white/20 hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold">
                            👤
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs font-bold">
                          +
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm">Join 500+ Companies</div>
                        <div className="text-xs text-white/70">Who trust us</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Form */}
                <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10 bg-white">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Company *</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                          placeholder="email@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Quantity</label>
                        <select
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all appearance-none"
                        >
                          <option value="">Select Range</option>
                          <option value="25-50">25 - 50 units</option>
                          <option value="50-100">50 - 100 units</option>
                          <option value="100-250">100 - 250 units</option>
                          <option value="250-500">250 - 500 units</option>
                          <option value="500+">500+ units</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Occasion</label>
                        <select
                          name="occasion"
                          value={formData.occasion}
                          onChange={handleChange}
                          className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all appearance-none"
                        >
                          <option value="">Select Occasion</option>
                          <option value="diwali">Diwali</option>
                          <option value="new-year">New Year</option>
                          <option value="anniversary">Company Anniversary</option>
                          <option value="appreciation">Employee Appreciation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all resize-none"
                        placeholder="Tell us your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5 group"
                    >
                      Submit Inquiry
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-[#f8f9fa] rounded-t-[40px] sm:rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 9: FAQ - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-3 sm:mb-4">
                <Headphones size={14} className="text-emerald-500" />
                <span className="text-emerald-600 text-xs sm:text-sm font-semibold">Support</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-md shadow-gray-100/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === index
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 rotate-180"
                      : "bg-gray-100"
                      }`}>
                      <ChevronDown
                        size={16}
                        className={`transition-colors sm:w-5 sm:h-5 ${openFaq === index ? "text-white" : "text-gray-400"}`}
                      />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-40" : "max-h-0"}`}>
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Still have questions CTA */}
            <div className="mt-8 sm:mt-10 text-center">
              <p className="text-gray-500 mb-3 text-sm sm:text-base">Still have questions?</p>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm sm:text-base hover:text-emerald-700 transition-colors"
              >
                Contact our team
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}