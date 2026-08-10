"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import data from "../../data";
import { Check } from "lucide-react";

export default function ProductType({ selectedValues, onChange, filterData }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!filterData?.options) return;

    const colors = [
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-orange-500",
      "from-violet-500 to-purple-500",
      "from-green-500 to-lime-500",
      "from-blue-500 to-indigo-500",
      "from-red-500 to-rose-500"
    ];

    const updatedCategories = filterData.options.map((opt, index) => ({
      id: opt.value,
      label: opt.label,
      emoji: opt.icon || "🌿",
      color: colors[index % colors.length],
      count: opt.count || 0
    }));
    setCategories(updatedCategories);
  }, [filterData]);

  const handleToggle = (id) => {
    const next = selectedValues.includes(id)
      ? selectedValues.filter(v => v !== id)
      : [...selectedValues, id];
    onChange(next);
  };

  return (
    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
      {categories.map((category) => {
        const isSelected = selectedValues.includes(category.id);
        return (
          <button
            key={category.id}
            onClick={() => handleToggle(category.id)}
            className={`w-full group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isSelected 
              ? "bg-violet-50 border-2 border-violet-500" 
              : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"}`}
          >
            {/* Emoji Icon */}
            <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
              <span className="text-lg">{category.emoji}</span>
            </div>

            {/* Label */}
            <span className={`flex-1 text-left font-medium ${isSelected ? "text-violet-700" : "text-gray-700 group-hover:text-gray-900"}`}>
              {category.label}
            </span>

            {/* Count & Check */}
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${isSelected 
                ? "bg-violet-500 text-white" 
                : "bg-gray-200 text-gray-600 group-hover:bg-violet-100 group-hover:text-violet-600"}`}>
                {category.count}
              </span>
              {isSelected && <Check size={16} className="text-violet-600" />}
            </div>
          </button>
        );
      })}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c4b5fd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a78bfa;
        }
      `}</style>
    </div>
  );
}