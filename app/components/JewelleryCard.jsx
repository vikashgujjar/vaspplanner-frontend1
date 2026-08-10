"use client"
import React from "react";
import { FaEye, FaHeart } from "react-icons/fa6";

const products = [
  {
    id: 1,
    name: "Diamond Earring",
    price: 38,
    originalPrice: 50,
    discount: "50% OFF",
    image: "/jw-1.png",
  },
  {
    id: 2,
    name: "Diamond Locket",
    price: 25,
    originalPrice: 40,
    image: "/jw-1.png",
  },
  {
    id: 3,
    name: "Diamond Locket",
    price: 25,
    originalPrice: 30,
    discount: "40% OFF",
    image: "/jw-1.png",
  },
  {
    id: 4,
    name: "Diamond Ring",
    price: 40,
    originalPrice: 60,
  image: "/jw-1.png",
  },
];

const JewelleryCard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg relative h-96 flex flex-col overflow-hidden group">
            {product.discount && (
              <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                {product.discount}
              </span>
            )}
            <div className="relative w-full h-full">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white p-2 rounded-full shadow-lg">
                  <FaHeart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Add to Cart
                </button>
                <button className="bg-white p-2 rounded-full shadow-lg">
                  <FaEye className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow bg-white absolute bottom-0 left-0 w-full">
              <h3 className="text-gray-700 text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                <span className="text-black font-bold text-lg">${product.price}</span>
              </div>
            </div>-
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelleryCard;
