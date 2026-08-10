"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import MyCart from "./MyCart";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BottomfixLinks() {
  const pathname = usePathname();
  const [cart, setCart] = useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartLengthTotal = cartItems.reduce((accum, curntVal) => accum + curntVal.qnty, 0);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path) => pathname === path;

  const NavItem = ({ href, icon: Icon, label }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={`flex flex-col items-center gap-0 transition-all duration-300 relative group ${active ? "scale-105" : ""
          }`}
      >
        {/* Active Indicator */}
        {active && (
          <div className="absolute -top-1 w-1 h-1 bg-pink-600 rounded-full animate-pulse"></div>
        )}

        {/* Icon Container */}
        <div
          className={`p-2 rounded-2xl transition-all duration-300 relative ${active
            ? "bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-200/50"
            : "bg-pink-50 group-hover:bg-pink-100"
            }`}
        >
          <Icon
            size={20}
            className={`transition-all duration-300 ${active
              ? "text-pink-600"
              : "text-pink-400 group-hover:text-pink-600"
              }`}
          />

          {/* Sparkle Effect on Active */}
          {active && (
            <HiSparkles
              size={12}
              className="absolute -top-1 -right-1 text-yellow-400 animate-pulse"
            />
          )}
        </div>

        {/* Label */}
        <span
          className={`text-xs font-bold transition-all duration-300 ${active
            ? "text-pink-600"
            : "text-pink-400 group-hover:text-pink-600"
            }`}
        >
          {label}
        </span>

        {/* Active Underline */}
        {active && (
          <div className="absolute -bottom-2 w-8 h-1 bg-pink-600 rounded-full"></div>
        )}
      </Link>
    );
  };

  return (
    <>
      <div className="fixed z-50 bottom-0 inset-x-0 md:hidden w-full">
        {/* Backdrop Blur Effect */}
        {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-xl"></div> */}

        <div className="relative bg-gradient-to-b from-white to-white rounded-t-[40px] shadow-[0_-8px_30px_rgba(0,0,0,0.1)] pt-2 pb-3 border-t border-pink-200/50">
          <div className="flex items-center justify-around px-2 relative">
            <NavItem href="/" icon={FaHome} label="Home" />
            <NavItem href="/wishlist" icon={FaHeart} label="Wishlist" />

            {/* Center Cart - Elevated & Enhanced */}
            <div className="relative -mt-16 flex flex-col items-center">
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-br from-pink-600 via-pink-500 to-pink-400 rounded-full shadow-[0_15px_40px_rgba(83,161,79,0.5)] hover:shadow-[0_18px_45px_rgba(83,161,79,0.6)] transition-all hover:scale-110 active:scale-95 border-[6px] border-white group"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink/20 to-pink/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <FaShoppingCart size={22} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
                {isMounted && cartLengthTotal > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(239,68,68,0.5)] ring-4 ring-white z-20 animate-bounce">
                    {cartLengthTotal}
                  </span>
                )}
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-pink/30 animate-ping"></div>
              </Link>
            </div>

            <NavItem href="/category/all-products" icon={AiFillProduct} label="Products" />
            <NavItem href="/user/profile" icon={FaUserAlt} label="Profile" />
          </div>
        </div>
      </div>

      <MyCart cart={cart} setCart={setCart} />
    </>
  );
}