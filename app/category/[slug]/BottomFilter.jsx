"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  SlidersHorizontal,
  ChevronLeft,
  Check,
  Sparkles,
  ChevronRight
} from "lucide-react";

const filterCategories = [
  { name: "Price", options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"], count: 12 },
  { name: "Discounts", options: ["10% Off", "20% Off", "30% Off", "50% Off"], count: 8 },
  { name: "Product Type", options: ["Shilajit", "Ashwagandha", "Kesar", "Turmeric"], count: 15 },
  { name: "Shop For", options: ["Men", "Women", "Kids", "Unisex"], count: 4 },
];

const BottomFilter = ({ isOpen, onClose, onCountChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const totalFilters = Object.values(selectedFilters).flat().length;

  useEffect(() => {
    onCountChange?.(totalFilters);
  }, [totalFilters, onCountChange]);

  const closeModal = () => {
    setSelectedCategory(null);
    onClose?.();
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

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]" onClick={closeModal} />

      {/* Filter Modal */}
      <div className="fixed inset-x-0 bottom-0 top-16 z-[999999] bg-white rounded-t-3xl shadow-2xl flex flex-col animate-slideUp">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {selectedCategory ? (
              <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-gray-600">
                <ChevronLeft size={20} />
                <span className="font-medium">Back</span>
              </button>
            ) : (
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <SlidersHorizontal size={22} className="text-violet-500" />
                Filters
              </h3>
            )}
            <button onClick={closeModal} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedCategory ? (
            <div className="space-y-2">
              {filterCategories.find(c => c.name === selectedCategory)?.options.map((option, index) => {
                const isSelected = selectedFilters[selectedCategory]?.includes(option);
                return (
                  <button
                    key={index}
                    onClick={() => handleFilterSelect(selectedCategory, option)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isSelected
                      ? "bg-violet-50 border-2 border-violet-500"
                      : "bg-gray-50 border-2 border-transparent"
                      }`}
                  >
                    <span className={`font-medium ${isSelected ? "text-violet-700" : "text-gray-700"}`}>
                      {option}
                    </span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected
                      ? "bg-gradient-to-br from-violet-500 to-purple-500"
                      : "bg-gray-200"
                      }`}>
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filterCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all"
                >
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <div className="flex items-center gap-2">
                    {selectedFilters[category.name]?.length > 0 && (
                      <span className="px-2 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
                        {selectedFilters[category.name].length}
                      </span>
                    )}
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 pb-8 bg-white">
          <button
            onClick={() => setSelectedFilters({})}
            className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl"
          >
            Clear All
          </button>
          <button
            onClick={closeModal}
            className="flex-1 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Apply ({totalFilters})
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default BottomFilter;
