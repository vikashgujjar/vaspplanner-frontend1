"use client";

import React, { useState } from "react";

import ProductCard from "./ProductCard";
import list from "../data";
import { BiDownArrow } from "react-icons/bi";
import { IoMdArrowDown } from "react-icons/io";

const categoriesList = [...new Set(list.map((elm) => elm.categorie))];


const CategoriesJwellery = () => {
  const [activeCategory, setActiveCategory] = useState("Rings");

  // const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);


  const DimondProductsList = [
    {
      id: 1,
      toggle: false,
      name: "Diamond Earring",
      price: 38,
      originalPrice: 50,
      discount: "50",
      img1: "/img/dimondProdcut/1.webp",
      img1: "/img/dimondProdcut/2.webp",
      categorie: "Rings",
      title:
        "Elegant Gold Ring with a Stunning Design, Perfect for Special Occasions",
      price: 45224,
      tag: "New Arrival",
      classic: false,
      inerimgList: [
        "/img/product-list/1.webp",
        "/img/product-list/2.webp",
        "/img/product-list/3.webp",
      ],
      createdAt: "2024-03-01",
    },
  ]

  return (
    <div className="categories bg-[#F3F1EC] py-10 lg:pt-16">
      <div className="w-full container mx-auto   px-5 md:px-12 xl:px-32 ">
        <div className="text-center mb-8">
          <p className="text-2xl md:text-3xl lg:text-4xl  italic">
            Vajra Jewels Timeless Diamond Beauty
          </p>
          <p className="text-xl font-serif mt-2"></p>
        </div>

        <div className="flex justify-center space-x-6  pb-2 overflow-x-auto">
          {categoriesList.map((category) => (
            <button
              key={category}
              className={`text-lg px-3 pb-2 ${activeCategory === category
                  ? "font-normal border-b-1 border-black"
                  : "text-gray-600"
                }`}
              onClick={() => {
                setActiveCategory(category), setVisibleCount(4);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 lg:mt-12">
          {list
            .filter(
              (elm) =>
                elm.categorie.trim().toLowerCase() ==
                activeCategory.trim().toLowerCase()
            )
            .slice(0, visibleCount)
            .map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
        </div>

        {/* Load More Button */}
        {visibleCount <
          list.filter(
            (elm) =>
              elm.categorie.trim().toLowerCase() ==
              activeCategory.trim().toLowerCase()
          ).length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount(visibleCount + 4)}
                className=" text-gray-800 flex items-center gap-x-2 px-6 py-2 rounded-md  cursor-pointer transition"
              >
                Load More <IoMdArrowDown className="animate-bounce mt-1" />

              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default CategoriesJwellery;
