"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Star,
  ArrowRight,
  ArrowLeft,
  Quote,
  BadgeCheck
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SuccessStory({ initialData = null }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [testimonials, setTestimonials] = useState(initialData?.data || []);
  const [header, setHeader] = useState(initialData?.header || {
    badge: "Happy Clients",
    title: "What Our Clients Say",
    subtitle: "Our customers trust us for delivering joy and celebrating life's special moments."
  });
  const [stats, setStats] = useState(initialData?.stats || {
    happy_clients: "10K+",
    happy_clients_label: "Happy Clients",
    avg_rating: "4.9",
    avg_rating_label: "Avg Rating",
    total_reviews: "5K+",
    total_reviews_label: "Reviews"
  });

  useEffect(() => {
    if (initialData?.data) {
      setTestimonials(initialData.data);
      if (initialData.header) setHeader(initialData.header);
      if (initialData.stats) setStats(initialData.stats);
    } else {
      const fetchTestimonials = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/home/testimonials`, { cache: 'no-store' });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          if (json.success) {
            setTestimonials(json.data);
            if (json.header) setHeader(json.header);
            if (json.stats) setStats(json.stats);
          }
        } catch (err) {
          console.error("Failed to fetch testimonials:", err);
        }
      };
      fetchTestimonials();
    }
  }, [initialData]);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0c0c0c] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 sm:left-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-amber-500/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-0 sm:right-1/4 w-[150px] sm:w-[200px] md:w-[300px] h-[150px] sm:h-[200px] md:h-[300px] bg-pink-500/5 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 lg:gap-12">

          {/* Left Content */}
          <div className="w-full lg:w-[35%] xl:w-[30%] text-center lg:text-left flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-3 sm:mb-4">
              <Quote size={14} className="text-amber-400" />
              <span className="text-amber-400 text-xs sm:text-sm font-semibold">{header.badge || "Happy Clients"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              {header.title || "What Our Clients Say"}
            </h2>

            <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 md:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              {header.subtitle || "Our customers trust us for delivering joy and celebrating life's special moments."}
            </p>

            {/* Stats Row — from API */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-5 sm:mb-6 lg:mb-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">{stats.happy_clients || "10K+"}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{stats.happy_clients_label || "Happy Clients"}</div>
              </div>
              <div className="w-px h-8 sm:h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">{stats.avg_rating || "4.9"}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{stats.avg_rating_label || "Avg Rating"}</div>
              </div>
              <div className="w-px h-8 sm:h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">{stats.total_reviews || "5K+"}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{stats.total_reviews_label || "Reviews"}</div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center lg:justify-start gap-2 sm:gap-3">
              <button
                ref={prevRef}
                aria-label="Previous Testimonials"
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all active:scale-95"
              >
                <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button
                ref={nextRef}
                aria-label="Next Testimonials"
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all active:scale-95"
              >
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>

          {/* Right Slider */}
          <div className="w-full lg:w-[65%] xl:w-[70%] min-w-0 mt-2 sm:mt-0">
            <Swiper
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              observer={true}
              observeParents={true}
              resizeObserver={true}
              onBeforeInit={(swiper) => {
                if (swiper && swiper.params && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Navigation, Autoplay]}
              spaceBetween={12}
              slidesPerView={1.1}
              centeredSlides={false}
              breakpoints={{
                400: { slidesPerView: 1.2, spaceBetween: 12 },
                500: { slidesPerView: 1.4, spaceBetween: 14 },
                640: { slidesPerView: 1.6, spaceBetween: 16 },
                768: { slidesPerView: 1.8, spaceBetween: 16 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                1280: { slidesPerView: 2.2, spaceBetween: 20 },
              }}
              className="!overflow-hidden"
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={item.uuid}>
                  <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/[0.08] hover:border-amber-500/20 transition-all h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <Quote size={12} className="sm:w-[14px] sm:h-[14px] text-amber-400" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={11} className="sm:w-[12px] sm:h-[12px] text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-[10px] sm:text-xs text-gray-500 ml-1">({item.rating}.0)</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-4">
                      {item.review}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
                      <img
                        src={`${item.client.image}?w=100&h=100&fit=crop`}
                        alt={item.client.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-amber-500/20"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <h6 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5">
                          <span className="truncate">{item.client.name}</span>
                          <BadgeCheck size={12} className="sm:w-[14px] sm:h-[14px] text-amber-400 flex-shrink-0" />
                        </h6>
                        <p className="text-[10px] sm:text-xs text-gray-500 truncate">{item.client.designation}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:mt-8 text-center lg:hidden">
          <a
            href="#reviews"
            className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors"
          >
            View All Reviews
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}