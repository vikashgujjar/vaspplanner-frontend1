"use client";
import { useState, useEffect } from "react";
import { Check, Zap } from "lucide-react";
import data from "../../data";

const DiscountFilter = ({ selectedValues, onChange, filterData }) => {
  const colorMap = {
    "50": { color: "from-red-500 to-rose-500", bg: "bg-red-50", border: "border-red-500", text: "text-red-700" },
    "25": { color: "from-orange-500 to-amber-500", bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-700" },
    "20": { color: "from-yellow-500 to-amber-500", bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-700" },
    "10": { color: "from-green-500 to-emerald-500", bg: "bg-green-50", border: "border-green-500", text: "text-green-700" },
  };

  const discounts = filterData?.options?.map(opt => ({
    id: opt.value,
    label: opt.label,
    value: parseInt(opt.value),
    ...(colorMap[opt.value] || colorMap["10"])
  })) || [];

  const handleCheckboxChange = (id) => {
    const next = selectedValues.includes(id)
      ? selectedValues.filter(v => v !== id)
      : [...selectedValues, id];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {discounts.map((discount) => {
        const isSelected = selectedValues.includes(discount.id);
        return (
          <label
            key={discount.id}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${isSelected
                ? `${discount.bg} border-2 ${discount.border}`
                : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleCheckboxChange(discount.id)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isSelected
                  ? `bg-gradient-to-br ${discount.color} shadow-lg`
                  : "bg-white border-2 border-gray-300"
                }`}>
                {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${isSelected ? discount.text : "text-gray-800"}`}>
                  {discount.label}
                </span>
                {discount.id === "50" && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                    <Zap size={10} /> HOT
                  </span>
                )}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default DiscountFilter;