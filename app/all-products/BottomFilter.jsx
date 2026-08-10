
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  LayoutGrid,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronLeft,
  Check,
  Sparkles,
  ChevronRight
} from "lucide-react";

const sortOptions = [
  { value: "newest", label: "Latest Arrival", icon: "🆕" },
  { value: "popular", label: "Most Popular", icon: "🔥" },
  { value: "price-low", label: "Price: Low to High", icon: "💰" },
  { value: "price-high", label: "Price: High to Low", icon: "💎" },
  { value: "rating", label: "Customer Rating", icon: "⭐" },
];

const filterCategories = [
  { name: "Category", options: ["Flowers", "Cakes", "Chocolates", "Plants", "Balloon Decor"], count: 12 },
  { name: "Price", options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"], count: 8 },
  { name: "Recipient", options: ["For Him", "For Her", "For Kids", "For Couples"], count: 15 },
];

const categoriesData = [
  { title: "Cakes", link: "/category/cakes", emoji: "🎂", color: "from-amber-400 to-orange-500" },
  { title: "Flowers", link: "/category/flowers", emoji: "💐", color: "from-rose-400 to-pink-500" },
  { title: "Gifts", link: "/category/gifts", emoji: "🎁", color: "from-violet-400 to-purple-500" },
  { title: "Plants", link: "/category/plants", emoji: "🌿", color: "from-emerald-400 to-teal-500" },
  { title: "Balloon", link: "/category/balloon-decor", emoji: "🎈", color: "from-cyan-400 to-blue-500" },
];

const BottomFilter = ({ filters }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const displayFilterCategories = filters ? Object.keys(filters).map(key => ({
    name: filters[key].title,
    rawKey: key,
    options: filters[key].options.map(opt => opt.label),
    count: filters[key].options.length
  })) : filterCategories;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(true); // Auto-expand when it disappears
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCategory(null);
  };

  const handleFilterSelect = (category, option) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(option)) {
        return { ...prev, [category]: current.filter(f => f !== option) };
      }
      return { ...prev, [category]: [...current, option] };
    });
  };

  const totalFilters = Object.values(selectedFilters).flat().length;

  return (
    <>
      <div className="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 z-[9999] flex items-center pointer-events-none">
        <div
          className={`bg-white border border-gray-100 shadow-2xl rounded-r-[32px] transition-all duration-500 ease-in-out flex flex-col justify-around items-center h-auto pointer-events-auto overflow-hidden ${isVisible
            ? (isExpanded ? "translate-x-0 opacity-100 w-20 py-5 px-3" : "-translate-x-full opacity-0 w-0 py-5 px-0 pointer-events-none")
            : "-translate-x-full opacity-0 w-0 py-5 px-0 pointer-events-none"
            }`}
        >
          <div className="flex flex-col items-center gap-6">
            <button onClick={() => setActiveModal("categories")} className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center">
                <LayoutGrid size={22} className="text-gray-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Menu</span>
            </button>

            <button onClick={() => setActiveModal("sort")} className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center">
                <ArrowUpDown size={22} className="text-gray-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Sort</span>
            </button>
          </div>
        </div>

        {/* Manual Toggle Tab */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-24 w-6 bg-violet-600 rounded-r-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-all outline-none pointer-events-auto ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Floating Filter Button - Right Side */}
      <div
        className={`lg:hidden fixed top-1/2 -translate-y-1/2 right-0 z-[9999] pointer-events-none transition-all duration-500 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
      >
        <button
          onClick={() => setActiveModal("filter")}
          className="pointer-events-auto flex flex-col items-center gap-1 bg-white border border-gray-100 shadow-2xl rounded-l-[24px] py-4 px-3 relative"
        >
          <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <SlidersHorizontal size={22} className="text-white" />
          </div>
          {totalFilters > 0 && (
            <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {totalFilters}
            </span>
          )}
          <span className="text-[10px] font-bold text-violet-600 uppercase tracking-tight">Filter</span>
        </button>
      </div>

      {activeModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]" onClick={closeModal} />}

      {activeModal === "sort" && (
        <div className="fixed inset-x-0 bottom-0 z-[999999] bg-white rounded-t-[32px] shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Sort By</h3>
            <button onClick={closeModal} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><X size={20} className="text-gray-400" /></button>
          </div>
          <div className="p-6 pb-28 space-y-3">
            {sortOptions.map((opt) => (
              <button key={opt.value} onClick={() => { setSelectedSort(opt.value); closeModal(); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${selectedSort === opt.value ? "bg-violet-50 border-2 border-violet-500" : "bg-gray-50 border-2 border-transparent"}`}>
                <span className="text-2xl">{opt.icon}</span>
                <span className={`flex-1 text-left font-bold ${selectedSort === opt.value ? "text-violet-700" : "text-gray-700"}`}>{opt.label}</span>
                {selectedSort === opt.value && <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"><Check size={14} className="text-white" /></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModal === "categories" && (
        <div className="fixed inset-x-0 bottom-0 z-[999999] bg-white rounded-t-[32px] shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Quick Menu</h3>
            <button onClick={closeModal} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><X size={20} className="text-gray-400" /></button>
          </div>
          <div className="p-4 grid grid-cols-3 gap-4 pb-28">
            {categoriesData.map((cat, idx) => (
              <Link key={idx} href={cat.link} onClick={closeModal} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl transition-all">
                <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-[20px] flex items-center justify-center shadow-lg shadow-gray-200`}>
                  <span className="text-2xl">{cat.emoji}</span>
                </div>
                <span className="text-xs font-bold text-gray-700 text-center">{cat.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeModal === "filter" && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-[999999] bg-white rounded-t-[32px] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            {selectedCategory ? (
              <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-gray-600 font-bold"><ChevronLeft size={20} />Back</button>
            ) : (
              <h3 className="text-xl font-bold text-gray-900">Refine Results</h3>
            )}
            <button onClick={closeModal} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><X size={20} className="text-gray-400" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {selectedCategory ? (
              <div className="space-y-3">
                {displayFilterCategories.find(c => c.name === selectedCategory)?.options.map((opt, idx) => {
                  const isSel = selectedFilters[selectedCategory]?.includes(opt);
                  return (
                    <button key={idx} onClick={() => handleFilterSelect(selectedCategory, opt)} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isSel ? "bg-violet-50 border-2 border-violet-500" : "bg-gray-50 border-2 border-transparent"}`}>
                      <span className={`font-bold ${isSel ? "text-violet-700" : "text-gray-700"}`}>{opt}</span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSel ? "bg-violet-500" : "bg-gray-200"}`}>{isSel && <Check size={14} className="text-white" />}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {displayFilterCategories.map((cat, idx) => (
                  <button key={idx} onClick={() => setSelectedCategory(cat.name)} className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl transition-all">
                    <span className="font-bold text-gray-700">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      {selectedFilters[cat.name]?.length > 0 && <span className="px-2 py-0.5 bg-violet-500 text-white text-[10px] font-black rounded-full uppercase">{selectedFilters[cat.name].length}</span>}
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-50 flex gap-4 pb-12 bg-white">
            <button onClick={() => setSelectedFilters({})} className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl">Reset</button>
            <button onClick={closeModal} className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2"><Sparkles size={18} />Apply</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomFilter;
