"use client";
import { useState } from "react";
import { Check, IndianRupee, ArrowRight } from "lucide-react";

const PriceFilter = ({ selectedValues = [], onChange, customMin = '', customMax = '', onCustomApply, filterData }) => {
  const options = filterData?.options || [
    { label: "Under ₹5,000", value: "under-5000" },
    { label: "₹5,001 - ₹10,000", value: "5001-10000" },
    { label: "₹10,001 - ₹15,000", value: "10001-15000" },
    { label: "₹15,001 - ₹20,000", value: "15001-20000" },
    { label: "Above ₹20,000", value: "above-20000" },
  ];

  const [minPrice, setMinPrice] = useState(customMin);
  const [maxPrice, setMaxPrice] = useState(customMax);

  const handleToggle = (value) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(next);
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (onCustomApply) {
      onCustomApply(minPrice, maxPrice);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preset Checkboxes */}
      <div className="space-y-2">
        {options.map((range, index) => {
          const isSelected = selectedValues.includes(range.value);
          return (
            <label
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${isSelected
                  ? "bg-emerald-50 border-2 border-emerald-500"
                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(range.value)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isSelected
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/30"
                    : "bg-white border-2 border-gray-300"
                  }`}>
                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
              </div>

              <span className={`flex-1 text-sm font-medium ${isSelected ? "text-emerald-700 font-bold" : "text-gray-700"}`}>
                {range.label}
              </span>

              {range.count !== undefined && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isSelected
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-600"
                  }`}>
                  {range.count}
                </span>
              )}
            </label>
          );
        })}
      </div>

      {/* Custom Price Range Box */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
          Custom Price Range
        </span>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full pl-7 pr-2 py-2 text-xs font-semibold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-7 pr-2 py-2 text-xs font-semibold bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
        <button
          onClick={handleApplyCustom}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
        >
          <span>Apply Filter</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;