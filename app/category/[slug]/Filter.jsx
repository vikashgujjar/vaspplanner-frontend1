"use client";
import React, { useState } from "react";
import ProductType from "./ProductType";
import PriceFilter from "./PriceFilter";
import DiscountFilter from "./DiscountFilter";
import CategoryFilter from "./CategoryFilter";
import {
  SlidersHorizontal,
  RotateCcw,
  IndianRupee,
  Percent,
  Layers,
  Users,
  ChevronDown,
  Sparkles,
  Gift
} from "lucide-react";

export default function Filter({ activeFilters, onFilterChange, filters }) {
  const [openSections, setOpenSections] = useState({
    price: true,
    discount: false,
    productType: true,
    category: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleClearAll = () => {
    onFilterChange('reset_all', true);
  };

  const sections = [
    {
      id: "price",
      label: filters?.price_range?.title || "Price Range",
      icon: IndianRupee,
      gradient: "from-emerald-500 to-teal-500",
      component: <PriceFilter 
                   selectedValues={activeFilters.price_range || []} 
                   onChange={(vals) => onFilterChange('price_range', vals)} 
                   customMin={activeFilters.min_price || ''}
                   customMax={activeFilters.max_price || ''}
                   onCustomApply={(min, max) => {
                     onFilterChange('min_price', min);
                     onFilterChange('max_price', max);
                   }}
                   filterData={filters?.price_range} 
                 />,
      show: true
    },
    {
      id: "discount",
      label: filters?.discount?.title || "Discount",
      icon: Percent,
      gradient: "from-orange-500 to-amber-500",
      component: <DiscountFilter 
                   selectedValues={activeFilters.discount} 
                   onChange={(vals) => onFilterChange('discount', vals)} 
                   filterData={filters?.discount} 
                 />,
      show: !!filters?.discount
    },
    {
      id: "productType",
      label: filters?.product_type?.title || "Product Type",
      icon: Layers,
      gradient: "from-violet-500 to-purple-500",
      component: <ProductType 
                   selectedValues={activeFilters.product_type} 
                   onChange={(vals) => onFilterChange('product_type', vals)}
                   filterData={filters?.product_type} 
                 />,
      show: !!filters?.product_type
    },
    {
      id: "category",
      label: filters?.shop_for?.title || "Shop For",
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      component: <CategoryFilter 
                   selectedValues={activeFilters.shop_for} 
                   onChange={(vals) => onFilterChange('shop_for', vals)}
                   filterData={filters?.shop_for} 
                 />,
      show: !!filters?.shop_for
    },
  ];

  const visibleSections = sections.filter(s => s.show);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <SlidersHorizontal size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Filters</h3>
              <p className="text-gray-400 text-sm">Refine your search</p>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {visibleSections.map((section) => (
          <div key={section.id} className="bg-white">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${section.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <section.icon size={18} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800">{section.label}</span>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform duration-300 ${openSections[section.id] ? "rotate-180" : ""}`}
              />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${openSections[section.id] ? "max-h-[500px]" : "max-h-0"}`}>
              <div className="px-5 pb-5">
                {section.component}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}