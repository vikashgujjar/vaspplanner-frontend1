"use client";
import Link from "next/link";
import React from "react";
import {
  Heart,
  HeartOff,
  ChevronRight,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  Shield,
  Gift,
  RotateCcw,
  Coins,
  Star
} from "lucide-react";
import ProductAyurvedCard from "./ProductAyurvedCard";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist, clearWishlistAsync, removeWish } from "../store/wishListSlice";
import { addToCartAsync } from "../store/cartSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


import { savePendingCartAction } from "../utils/pendingCart";

export default function WishList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishList = useSelector((state) => state.wish.wishlist);

  // Calculate totals
  const totalValue = wishList.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalSavings = wishList.reduce((sum, item) => sum + ((item.originalPrice || item.price + 400) - item.price), 0);
  const coinsToEarn = wishList.length * 50;

  const handleAddAllToCart = async () => {
    if (wishList.length === 0) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    if (!token) {
      toast.info("Please login to add items to your cart", { icon: "🔐" });
      savePendingCartAction({
        product: wishList[0],
        quantity: 1,
        redirectUrl: "/wishlist"
      });
      router.push('/user/login');
      return;
    }

    try {
      const promises = wishList.map(product =>
        dispatch(addToCartAsync({ ...product, qnty: 1 }))
      );

      await Promise.all(promises);
      toast.success(`Successfully added ${wishList.length} items to cart!`);
      router.push('/cart');
    } catch (error) {
      console.error("Error adding all to cart:", error);
      toast.error("Failed to add some items to cart.");
    }
  };


  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK */}
      {/* ============================================== */}
      <section className="relative bg-[#0c0c0c] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/img/commonBanner/1.webp')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c]/95 to-[#0c0c0c]" />
        </div>

        {/* Gradient Glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 pt-16 pb-28 md:pt-24 md:pb-36">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-full mb-6">
              <Heart size={16} className="text-pink-400" />
              <span className="text-pink-300 text-sm font-semibold">My Favorites</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
                Wishlist
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
              {wishList.length > 0
                ? `You have ${wishList.length} item${wishList.length > 1 ? "s" : ""} saved for later`
                : "Save items you love and come back to them anytime"
              }
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-gray-700" />
              <span className="text-pink-400 font-medium">Wishlist</span>
            </nav>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8f9fa] rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 2: WISHLIST CONTENT - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-8 md:py-12 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          {wishList.length === 0 ? (
            /* ==================== EMPTY STATE ==================== */
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-10 md:p-14 text-center">
                {/* Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-pink-500/30">
                  <HeartOff size={44} className="text-white" />
                </div>

                {/* Text */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Your Wishlist is Empty
                </h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Looks like you haven't saved any items yet. Start exploring and add products you love!
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { emoji: "💖", label: "Save Favorites" },
                    { emoji: "🔔", label: "Price Alerts" },
                    { emoji: "🛒", label: "Quick Buy" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/category/all-products"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all hover:-translate-y-1 group"
                >
                  Start Shopping
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            /* ==================== WISHLIST WITH ITEMS ==================== */
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Heart, value: wishList.length, label: "Saved Items", gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50" },
                  { icon: Coins, value: `₹${totalValue.toLocaleString()}`, label: "Total Value", gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
                  { icon: Sparkles, value: `₹${totalSavings.toLocaleString()}`, label: "Potential Savings", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
                  { icon: Star, value: coinsToEarn, label: "Coins to Earn", gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
                ].map((stat, index) => (
                  <div key={index} className={`${stat.bg} rounded-2xl p-5 border border-gray-100`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon size={18} className="text-white" />
                      </div>
                    </div>
                    <div className="text-xl md:text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Actions Bar */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <Heart size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{wishList.length} Items in Wishlist</h3>
                    <p className="text-sm text-gray-500">Your saved favorites</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => dispatch(clearWishlistAsync())}
                    className="flex-1 text-xs text-nowrap sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                  <Link
                    href="/"
                    className="flex-1 text-xs text-nowrap sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                  >
                    <ShoppingBag size={16} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {wishList.map((product, index) => (
                  <ProductAyurvedCard key={index} product={product} />
                ))}
              </div>

              {/* Quick Add All to Cart */}
              {wishList.length > 0 && (
                <div className="mt-10 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Ready to checkout?
                    </h3>
                    <p className="text-gray-600">
                      Add all {wishList.length} items to your cart and save{" "}
                      <span className="font-bold text-pink-600">₹{totalSavings.toLocaleString()}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleAddAllToCart}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all hover:-translate-y-1 group"
                  >
                    Add All to Cart
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: FEATURES - DARK */}
      {/* ============================================== */}
      <section className="relative py-16 bg-[#0c0c0c] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders ₹999+", gradient: "from-emerald-400 to-teal-500" },
              { icon: Shield, title: "100% Authentic", desc: "Quality guaranteed", gradient: "from-blue-400 to-indigo-500" },
              { icon: Gift, title: "Special Offers", desc: "Exclusive deals", gradient: "from-pink-400 to-rose-500" },
              { icon: RotateCcw, title: "Easy Returns", desc: "7-day policy", gradient: "from-amber-400 to-orange-500" },
            ].map((feature, index) => (
              <div key={index} className="group p-5 md:p-6 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] rounded-2xl hover:border-white/15 transition-all">
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform`}>
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-bold mb-1 text-sm md:text-base">{feature.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}