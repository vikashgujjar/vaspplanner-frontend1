"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaStarHalfAlt, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoHeartCircle } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addWishAsync, removeWishAsync } from "../store/wishListSlice";
import AuthModal from "./AuthModal";

const ProductCard = ({ product, bg }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wish.wishlist);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const targetId = product?.id || product?.uuid || product?.product_id;
  const isWishlisted = wishList?.some((item) =>
    String(item.id) === String(targetId) ||
    String(item.uuid) === String(targetId) ||
    String(item.product_id) === String(targetId) ||
    String(item.product_uuid) === String(targetId)
  );

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;

    if (!isLoggedIn) {
      toast.info("Please login to manage your wishlist", { icon: "🔐" });
      setIsAuthModalOpen(true);
      return;
    }

    if (isWishlisted) {
      dispatch(removeWishAsync(targetId));
      toast.error("Removed from wishlist", { icon: "💔" });
    } else {
      dispatch(addWishAsync(product));
      toast.success("Added to wishlist", { icon: "💚" });
    }
  };

  const {
    id,
    name,
    price,
    originalPrice,
    img1,
    img2,
    categorie,
    category,
    title,
    tag,
    discount,
  } = product || {};

  const rating = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <div className="group h-[500px] transition-shadow duration-500 ease-in-out overflow-hidden relative">
        <div className="relative h-[300px] transition-all duration-500 ease-in-out">
          {discount && (
            <div className="discount h-12 text-xs text-center flex items-center justify-center text-black w-12 absolute z-10 left-5 top-4 bg-white rounded-full">
              {discount}%
            </div>
          )}

          <img
            src={img1}
            alt={name}
            className="w-full h-full opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out object-cover"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <img
              src={img2 || img1}
              alt={name}
              className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            />
            <div className="absolute inset-0 translate-x-8 group-hover:translate-x-0 duration-500 ease-in-out transition-transform flex flex-col gap-y-4 items-end py-4 px-2 text-black text-lg">
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="p-2 bg-white hover:text-amber-700 rounded-full w-fit transition-all duration-300 shadow-md cursor-pointer"
              >
                {isWishlisted ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
              </button>
              <div className="p-2 bg-white hover:text-amber-700 rounded-full w-fit transition-all duration-300">
                <IoMdEye />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${bg == "bg-black" ? "bg-black text-white" : "bg-[#F3F1EC] text-black"} 
        absolute bottom-0 left-0 w-full flex flex-col items-center gap-y-4 py-4 
        overflow-hidden transition-transform duration-500 ease-in-out 
        translate-y-16 group-hover:translate-y-0`}
        >
          {(categorie || category) && (
            <span className="text-xs font-bold text-[#CE967E] uppercase tracking-[0.2em]">
              {categorie || category}
            </span>
          )}
          <h6 className="text-center text-lg">{title}</h6>
          <div className="flex items-center text-yellow-500 text-2xl">
            {[...Array(fullStars)].map((_, i) => (
              <FaStar key={`full-${i}`} />
            ))}
            {halfStar && <FaStarHalfAlt />}
            {[...Array(emptyStars)].map((_, i) => (
              <FaRegStar key={`empty-${i}`} />
            ))}
          </div>

          <div className="flex items-center gap-x-3">
            <span className="text-xl font-bold text-[#CE967E]">
              ₹ {product.price}
            </span>
            <span className="text-gray-400 line-through">
              ₹ {product.price + 400}
            </span>
          </div>

          <Link
            href={`/product/${product.slug || product.title.toLowerCase().replace(/&/g, "and").replace(/,/g, "").split(" ").join("-")}`}
            className={`${bg == "bg-black"
              ? "bg-[#F3F1EC] hover:bg-[#f0ebdf] hover:text-gray-400 text-black"
              : "bg-black hover:bg-gray-800 text-white hover:text-gray-100"
              } w-fit duration-500 ease-in-out px-8 py-2 mx-auto block capitalize`}
          >
            View product
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
