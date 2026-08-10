"use client";
import React, { useState } from "react";
import JewelleryCard from "./JewelleryCard";
import ProductCard from "./ProductCard";
import jewelryItems from "../data";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
export default function HoteCategorries() {
  const categoriesTag = [...new Set(jewelryItems.map((elm) => elm.tag))];

  const [activeTag, setActiveTag] = useState("Best Seller");

  return (
    <div className=" bg-[#000]">
      <div className="px-5 md:px-16 xl:px-32 py-10 lg:pb-16 container mx-auto">
        <div className="flex text-nowrap overflow-x-auto  items-center gap-x-10 border-b border-b-gray-200 py-5 text-white ">
          {categoriesTag.map((elm,index) => (
            <button
            key={index}
              onClick={() => setActiveTag(elm)}
              className="text-xl cursor-pointer"
            >
              {elm}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-10  md:gap-5 mt-5 lg:mt-10">
          {jewelryItems
            .filter((elm) => elm.tag.toLowerCase() == activeTag.toLowerCase())
            .slice(0, 4)
            .map((product, index) => (
              <ProductCard key={index} product={product} bg="bg-black"  />
            ))}
        </div>
      </div>
    </div>
  );
}
