"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PLACEHOLDER = "/placeholder.png";

function mapApiToUI(apiCategories) {
  if (!Array.isArray(apiCategories)) return [];
  return apiCategories.map((cat) => ({
    name: cat.name,
    image: cat.image
      ? `${cat.image}?q=80&w=400&auto=format&fit=crop`
      : PLACEHOLDER,
    link: `/category/${cat.slug}`,
  }));
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex flex-col items-center flex-shrink-0 w-full sm:w-[115px] md:w-[135px]">
    <div className="w-[75px] h-[75px] sm:w-[105px] sm:h-[105px] md:w-[125px] md:h-[125px] rounded-2xl md:rounded-[22px] bg-gray-200 animate-pulse mb-2 md:mb-3" />
    <div className="h-3.5 w-14 sm:w-16 bg-gray-200 animate-pulse rounded" />
  </div>
);

// ─── Category Card ────────────────────────────────────────────────────────────
const CategoryCard = ({ item, isMobile = false }) => {
  return (
    <Link
      href={item.link}
      className={`group flex flex-col items-center transition-transform duration-300 ${
        isMobile ? "w-full" : "flex-shrink-0 w-[95px] sm:w-[115px] md:w-[135px]"
      }`}
    >
      <div className="relative w-[75px] h-[75px] sm:w-[105px] sm:h-[105px] md:w-[125px] md:h-[125px] rounded-2xl md:rounded-[22px] overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100/60">
        <Image
          src={item.image}
          alt={item.name}
          fill
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 75px, (max-width: 768px) 105px, 125px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="mt-2 md:mt-3 text-center text-[11px] sm:text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 max-w-[80px] sm:max-w-[110px] md:max-w-[130px] leading-tight">
        {item.name}
      </span>
    </Link>
  );
};

// ─── View All / Show Less Mobile Card ───────────────────────────────────────
const ViewAllCard = ({ extraCount = 2, onClick, isExpanded }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center w-full transition-transform duration-300 focus:outline-none"
    >
      <div
        className={`relative w-[75px] h-[75px] sm:w-[105px] sm:h-[105px] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white shadow-md transition-all group-hover:scale-105 ${
          isExpanded
            ? "bg-gradient-to-tr from-gray-700 to-gray-900 border border-gray-600 shadow-gray-900/20"
            : "bg-gradient-to-tr from-pink-500 to-rose-400 border border-pink-400/30 shadow-pink-500/20"
        }`}
      >
        {isExpanded ? (
          <div className="flex flex-col items-center justify-center">
            <FaChevronLeft className="rotate-90 text-sm mb-1" />
            <span className="text-[10px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full text-white">
              Less
            </span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="w-2.5 h-2.5 bg-white/90 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-white/90 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-white/90 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-white/90 rounded-sm" />
            </div>
            <span className="text-[10px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full text-white">
              +{extraCount}
            </span>
          </>
        )}
      </div>
      <span className="mt-2 text-center text-[11px] sm:text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
        {isExpanded ? "Show Less" : "View All"}
      </span>
    </button>
  );
};

// ─── Main Export Component ───────────────────────────────────────────────────
export default function ShopByCategory({ initialData = [] }) {
  const [categories, setCategories] = useState(() => {
    return initialData && initialData.length > 0 ? mapApiToUI(initialData) : [];
  });
  const [loading, setLoading] = useState(!initialData || initialData.length === 0);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setCategories(mapApiToUI(initialData));
      setLoading(false);
    } else {
      const fetchCategoriesData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          if (!json.success) throw new Error("API returned success: false");
          setCategories(mapApiToUI(json.data));
        } catch (err) {
          console.error("Failed to fetch categories:", err);
          setError("Failed to load categories.");
        } finally {
          setLoading(false);
        }
      };

      fetchCategoriesData();
    }
  }, [initialData]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const mobileDisplayCategories = isExpanded
    ? categories
    : categories.slice(0, 7);
  const extraCount = Math.max(categories.length - 7, 2);

  return (
    <section className="relative py-6 md:py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-5 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Shop by <span className="text-pink-500">Category</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 font-normal">
            Discover perfect gifts for every occasion
          </p>
        </div>

        {/* Error message if any */}
        {error && (
          <p className="text-center text-red-500 text-sm py-4">{error}</p>
        )}

        {/* ─── MOBILE VIEW: Expandable 4-Column Grid ─────────────────────────── */}
        <div className="block md:hidden">
          {loading ? (
            <div className="grid grid-cols-4 gap-3 gap-y-4 px-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 gap-y-4 px-1 transition-all duration-500">
              {mobileDisplayCategories.map((item, index) => (
                <CategoryCard key={item.link + index} item={item} isMobile={true} />
              ))}
              <ViewAllCard
                extraCount={extraCount}
                isExpanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          )}
        </div>

        {/* ─── DESKTOP VIEW: Horizontal Carousel Slider ─────────────────────── */}
        <div className="hidden md:block relative group">
          {/* Left Arrow Navigation Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 md:left-2 top-[35%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Previous categories"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Right Arrow Navigation Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 md:right-2 top-[35%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Next categories"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Left Side Fade Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Right Side Fade Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Items Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-12 md:px-16 snap-x snap-mandatory min-h-[180px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : categories.map((item, index) => (
                  <div key={item.link + index} className="snap-start">
                    <CategoryCard item={item} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}