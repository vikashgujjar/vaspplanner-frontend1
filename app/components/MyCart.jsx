import React from "react";
import {
  Minus,
  Plus,
  Trash2,
  X,
  Heart,
  Star,
  ShoppingCart,
  Eye
} from "lucide-react";
import VASPPlannerData from "../VASPPlannerData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantityAsync,
  removeFromCartAsync,
  fetchCartItems
} from "../store/cartSlice";

import AuthModal from "./AuthModal";

export default function MyCart({ cart, setCart }) {
  const cartList = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
    if (token) {
      dispatch(fetchCartItems());
    }
  }, [dispatch]);

  // Calculate totals
  const subtotal = cartList.reduce((acc, item) => acc + (item.price * item.qnty), 0);
  const savings = cartList.reduce((acc, item) => acc + (400 * item.qnty), 0);
  const totalCoins = cartList.length * 50;

  const handleCheckoutClick = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
    if (!token) {
      setShowAuthModal(true);
    } else {
      setCart(false);
      router.push("/checkout");
    }
  };

  // Only calculate and render actual content after mounting on client
  if (!isMounted) {
    return (
      <div
        className={`${cart ? "translate-x-0" : "translate-x-full"
          } duration-500 transition-transform fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end`}
      >
        <div className="bg-white overflow-y-auto h-full w-full md:w-[60%] lg:w-[50%] xl:w-[35%] shadow-2xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between p-5">
              <div>
                <h6 className="font-bold text-xl">Your Cart</h6>
                <p className="text-sm text-gray-500">Loading...</p>
              </div>
              <button
                onClick={() => setCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartList.length < 1) {
    return (
      <div
        className={`${cart ? "translate-x-0" : "translate-x-full"
          } duration-500 transition-transform fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end`}
      >
        <div className="bg-white overflow-y-auto h-full w-full md:w-[60%] lg:w-[50%] xl:w-[35%] shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between p-5">
              <div>
                <h6 className="font-bold text-xl">Your Cart</h6>
                <p className="text-sm text-gray-500">0 items</p>
              </div>
              <button
                onClick={() => setCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Empty Cart Content */}
          <div className="flex flex-col items-center justify-center px-6 py-20">
            <div className="bg-gray-100 rounded-full p-8 mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                alt="empty Cart"
                className="h-20 w-20 opacity-60"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 text-center mb-8 max-w-sm">
              Looks like you haven't added anything to your cart yet. Start shopping now!
            </p>

            <Link
              href="/category/all-products"
              onClick={() => setCart(false)}
              className="group relative overflow-hidden uppercase font-semibold text-white px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#53a14f] to-[#4a9347] hover:from-[#4a9347] hover:to-[#53a14f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Start Shopping</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${cart ? "translate-x-0" : "translate-x-full"
          } duration-500 transition-transform fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end`}
      >
        <div className="bg-gray-50 overflow-y-auto h-full w-full md:w-[60%] lg:w-[50%] xl:w-[35%] shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
            <div className="flex items-center justify-between p-5">
              <div>
                <h6 className="font-bold text-xl">Your Cart</h6>
                <p className="text-sm text-gray-500">{cartList.length} {cartList.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={() => setCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Timer Banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 md:block hidden">
              <div className="text-center py-3 px-4">
                <p className="text-sm font-medium text-amber-800">
                  ⏰ Cart reserved for <span className="font-bold">05:17</span> minutes!
                </p>
              </div>
            </div>

            {/* Coins Banner */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200 md:block hidden">
              <div className="flex items-center justify-center py-3 px-4 gap-2">
                <span className="text-sm font-medium text-gray-700">Earn</span>
                <img src="/img/product/coin.png" alt="coin" className="w-5 h-5" />
                <span className="font-bold text-lg text-green-600">{totalCoins}</span>
                <span className="text-sm font-medium text-gray-700">
                  VASP Planner Coins
                </span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {cartList.map((elm, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={elm.img}
                          alt={elm.title}
                          className="h-24 w-24 md:h-28 md:w-28 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          -33%
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
                          {elm.title}
                        </h5>
                        <button
                          onClick={() => dispatch(removeFromCartAsync(elm.id))}
                          className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        20gm : ₹999 @33% off (80 servings)
                      </p>

                      {/* Price and Quantity */}
                      <div className="flex items-end justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs md:text-xl font-bold text-green-600">
                              ₹{elm.price}
                            </span>
                            <span className="line-through text-xs md:text-sm text-gray-400">
                              ₹{+elm.price + 400}
                            </span>
                          </div>
                          <p className="text-xs text-green-600 font-medium">
                            You save ₹{400 * elm.qnty}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 px-1 md:px-3 py-1 md:py-2 rounded-lg border border-gray-200">
                          <button
                            onClick={() => dispatch(updateCartQuantityAsync({ productId: elm.id, qnty: elm.qnty - 1, type: 'decrement' }))}
                            className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-500 transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-base font-semibold w-6 text-center">
                            {elm.qnty}
                          </span>
                          <button
                            onClick={() => dispatch(updateCartQuantityAsync({ productId: elm.id, qnty: elm.qnty + 1, type: 'increment' }))}
                            className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-500 transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Better Benefits Section */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 md:p-5 p-2 rounded-xl border border-green-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <Star size={20} className="fill-white" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-gray-800 mb-1">
                    Add for Better Benefits
                  </h5>
                  <p className="text-sm text-gray-600 md:block hidden">
                    Combine with these items for faster results
                  </p>
                </div>
              </div>

              <Swiper
                autoplay={{
                  delay: 30000,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper"
                breakpoints={{
                  0: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 2, spaceBetween: 12 },
                  1024: { slidesPerView: 2, spaceBetween: 15 },
                }}
              >
                {VASPPlannerData.slice(0, 6).map((product, index) => {
                  const {
                    img,
                    title,
                    imgHover,
                    heading,
                    description,
                    price,
                    rating,
                    discount,
                    slug,
                  } = product;
                  return (
                    <SwiperSlide key={index}>
                      <div className="card group bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border border-gray-100">
                        <div className="relative">
                          <span className="absolute top-2 left-2 z-10 bg-green-500 text-white text-[10px] font-semibold py-1 px-2 rounded-full shadow-sm">
                            -{discount}%
                          </span>
                          <img
                            src={img}
                            alt={heading}
                            className="w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                          />
                          <div className="absolute w-full top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <img
                              src={imgHover}
                              alt={heading}
                              className="w-full object-cover"
                            />
                            <button className="absolute left-2 bottom-2 bg-white/90 backdrop-blur-sm flex items-center text-gray-800 text-[10px] font-medium rounded-full px-2 py-1 gap-1 shadow-sm">
                              Earn
                              <img
                                src="/img/product/coin.png"
                                alt="coin"
                                className="w-3 h-3"
                              />
                              <span>17</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <p className="font-medium text-sm text-gray-800 line-clamp-2">
                            {heading}
                          </p>
                          <hr className="border-gray-200" />
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                              <span>₹{price}</span>
                              <span className="line-through font-normal text-xs text-gray-400">
                                ₹{parseInt(price) + 50}
                              </span>
                            </div>
                            <div className="text-yellow-400 items-center gap-x-0.5 text-xs sm:text-sm hidden md:flex">
                              {[...Array(5)].map((_, i) => {
                                const ratingVal = parseFloat(rating) || 0;
                                return (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(ratingVal) ? "fill-current" : (i < ratingVal ? "fill-current opacity-50" : "text-gray-200")}
                                  />
                                );
                              })}
                            </div>
                            <div className="flex text-yellow-400 items-center gap-x-0.5 text-xs sm:text-sm md:hidden">
                              <Star size={14} className="fill-current" /> {parseFloat(rating) > 0 ? parseFloat(rating).toFixed(1) : "New"}
                            </div>
                          </div>
                          <Link
                            href={`/product/${product.slug || product.title.toLowerCase().replace(/&/g, "and").replace(/,/g, "").split(" ").join("-")}`}
                            className="text-white text-xs w-full py-2 text-center flex items-center justify-center rounded-md bg-[#53a14f] hover:bg-[#4a9347] transition-all duration-300 font-medium shadow-sm"
                          >
                            <ShoppingCart size={16} className="mr-1" />
                            <span>Add to Cart</span>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          {/* Sticky Footer with Checkout */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 z-100 shadow-lg">
            <div className="p-4 space-y-3">
              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartList.length} items)</span>
                  <span className="font-medium">₹{subtotal + savings}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Savings</span>
                  <span className="font-medium">- ₹{savings}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-green-600">₹{subtotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between">
                {/* Checkout Button */}
                <button onClick={handleCheckoutClick} className="cursor-pointer w-full flex-auto group px-2 relative overflow-hidden uppercase font-bold text-xs md:text-base text-white py-3.5 rounded-lg bg-gradient-to-r from-[#53a14f] to-[#4a9347] hover:from-[#4a9347] hover:to-[#53a14f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <span className="relative z-10 flex text-nowrap items-center justify-center gap-2">
                    <ShoppingCart size={20} />
                    Proceed to Checkout
                  </span>
                  <div className="absolute inset-0 cursor-pointer bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
                {/* Checkout Button */}
                <Link href="/cart" onClick={() => setCart(false)} className="cursor-pointer w-full flex-auto">
                  <button className="group px-2 relative overflow-hidden w-full uppercase font-bold text-xs md:text-base text-white py-3.5 rounded-lg bg-gradient-to-r from-[#53a14f] to-[#4a9347] hover:from-[#4a9347] hover:to-[#53a14f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ShoppingCart size={20} />
                      View Cart
                    </span>
                    <div className="absolute inset-0 bg-white cursor-pointer opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                </Link>
              </div>

              {/* Continue Shopping Link */}
              <button
                onClick={() => setCart(false)}
                className="w-full text-center text-sm text-gray-600 hover:text-green-600 font-medium transition-colors py-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}