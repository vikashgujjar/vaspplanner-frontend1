"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const CategoryFilter = ({ selectedValues, onChange, filterData }) => {
  const categoryMap = {
    "Women": { emoji: "👩", color: "from-pink-500 to-rose-500", bg: "bg-pink-50", border: "border-pink-500", text: "text-pink-700" },
    "Men": { emoji: "👨", color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-700" },
    "Kids": { emoji: "👶", color: "from-purple-500 to-violet-500", bg: "bg-purple-50", border: "border-purple-500", text: "text-purple-700" },
    "Unisex": { emoji: "✨", color: "from-amber-500 to-orange-500", bg: "bg-amber-50", border: "border-amber-500", text: "text-amber-700" },
  };

  const categories = filterData?.options?.map((opt, index) => ({
    id: opt.value,
    label: opt.label,
    count: opt.count || 0,
    ...(categoryMap[opt.label] || categoryMap["Unisex"])
  })) || [];

  const handleToggle = (id) => {
    const next = selectedValues.includes(id)
      ? selectedValues.filter(v => v !== id)
      : [...selectedValues, id];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => {
        const isSelected = selectedValues.includes(category.id);
        return (
          <label
            key={category.id}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer transition-all duration-200 ${isSelected
              ? `${category.bg} border-2 ${category.border}`
              : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleToggle(category.id)}
              className="sr-only"
            />

            {/* Selection Indicator */}
            {isSelected && (
              <div className={`absolute top-2 right-2 w-5 h-5 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center`}>
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            )}

            {/* Emoji */}
            <span className="text-3xl">{category.emoji}</span>

            {/* Label */}
            <span className={`font-bold ${isSelected ? category.text : "text-gray-800"}`}>
              {category.label}
            </span>

            {/* Count */}
            {category.count !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected
                ? `bg-gradient-to-r ${category.color} text-white`
                : "bg-gray-200 text-gray-600"
                }`}>
                {category.count}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default CategoryFilter;