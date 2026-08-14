"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Heart,
  Star,
  StarHalf,
  CheckCircle,
  Sparkles,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addWishAsync, removeWishAsync } from "../store/wishListSlice";
import { addToCartAsync, removeFromCartAsync, updateCartQuantityAsync } from "../store/cartSlice";
import { savePendingCartAction } from "../utils/pendingCart";
import AuthModal from "./AuthModal";

export default function ProductAyurvedCard({ product }) {
  const router = useRouter();
  const {
    id,
    img,
    name,
    title,
    imgHover,
    inerimgList,
    heading,
    description = "",
    price,
    rating: rawRating,
    avg_rating,
    review_count,
    reviews,
    discount = 0,
    categories = [],
    slug: productSlug,
  } = product || {};

  const displaySlug = productSlug || title?.toLowerCase()?.replace(/&/g, "and")?.replace(/,/g, "")?.split(" ")?.join("-") || "";

  const isBakery = categories?.some(cat =>
    cat.toLowerCase().includes('cake') || cat.toLowerCase().includes('bakery')
  ) || heading?.toLowerCase().includes('cake') || heading?.toLowerCase().includes('bakery');

  // Ensure rating is a valid number, priority to API avg_rating
  const finalRating = avg_rating ? parseFloat(avg_rating) : (rawRating ? parseFloat(rawRating) : 0);
  const finalReviews = review_count || reviews || 0;

  const wishList = useSelector((state) => state.wish.wishlist);
  const cartList = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  const getCartItem = (productId) => {
    return cartList?.find((item) =>
      String(item.id) === String(productId) ||
      String(item.product_id) === String(productId) ||
      String(item.variant_id) === String(productId) ||
      String(item.uuid) === String(productId) ||
      String(item.product_uuid) === String(productId) ||
      (product?.uuid && (
        String(item.id) === String(product.uuid) ||
        String(item.product_id) === String(product.uuid) ||
        String(item.uuid) === String(product.uuid) ||
        String(item.product_uuid) === String(product.uuid)
      )) ||
      (product?.id && (
        String(item.id) === String(product.id) ||
        String(item.product_id) === String(product.id) ||
        String(item.uuid) === String(product.id)
      ))
    );
  };

  const currentCartItem = getCartItem(id);
  const cartQuantity = currentCartItem ? (currentCartItem.qnty || currentCartItem.quantity || 1) : 0;

  const isWishList = (productId) => {
    return wishList?.some((elm) =>
      String(elm.id) === String(productId) ||
      String(elm.uuid) === String(productId) ||
      String(elm.product_id) === String(productId) ||
      String(elm.product_uuid) === String(productId) ||
      (product?.uuid && (
        String(elm.id) === String(product.uuid) ||
        String(elm.uuid) === String(product.uuid) ||
        String(elm.product_id) === String(product.uuid) ||
        String(elm.product_uuid) === String(product.uuid)
      ))
    );
  };

  const isInCart = (productId) => {
    return cartQuantity > 0;
  };

  const handleAddToCart = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!isLoggedIn) {
      toast.info("Please login to continue adding item to cart", { icon: "🔐" });
      savePendingCartAction({
        product: { ...product, qnty: 1 },
        quantity: 1,
        redirectUrl: window.location.pathname
      });
      router.push("/user/login");
      return;
    }

    const isOutOfStock = product?._rawData?.stock_status === 'out_of_stock' || product?._rawData?.stock === 0;
    if (isOutOfStock) {
      toast.warning("Sorry, this item is currently out of stock", { icon: "🚫" });
      return;
    }

    dispatch(addToCartAsync({ ...product, qnty: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Added to cart", { icon: "🛍️" });
      })
      .catch((error) => {
        toast.error(typeof error === 'string' ? error : "Failed to add to cart");
      });
  };

  const handleIncrement = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const targetCartId = currentCartItem?.id || currentCartItem?.product_id || id;
    const newQnty = cartQuantity + 1;
    dispatch(updateCartQuantityAsync({
      productId: targetCartId,
      qnty: newQnty,
      type: 'increment'
    }));
  };

  const handleDecrement = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const targetCartId = currentCartItem?.id || currentCartItem?.product_id || id;
    const newQnty = cartQuantity - 1;
    if (newQnty <= 0) {
      dispatch(removeFromCartAsync(targetCartId));
      toast.info("Removed from cart", { icon: "🗑️" });
    } else {
      dispatch(updateCartQuantityAsync({
        productId: targetCartId,
        qnty: newQnty,
        type: 'decrement'
      }));
    }
  };

  const handleWishListToogle = (prod) => {
    if (!prod) return;

    if (!isLoggedIn) {
      toast.info("Please login to manage your wishlist", { icon: "🔐" });
      setIsAuthModalOpen(true);
      return;
    }

    const targetId = prod.id || prod.uuid || prod.product_id;
    if (isWishList(targetId)) {
      dispatch(removeWishAsync(targetId));
      toast.error("Removed from wishlist", {
        icon: "💔",
        style: { borderRadius: "12px" },
      });
    } else {
      dispatch(addWishAsync(prod));
      toast.success("Added to wishlist", {
        icon: "💚",
        style: { borderRadius: "12px" },
      });
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);


  const originalPrice =
    discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} size={12} className="text-amber-400 fill-amber-400" />
      );
    }
    if (hasHalf) {
      stars.push(
        <StarHalf key="half" size={12} className="text-amber-400 fill-amber-400" />
      );
    }
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          size={12}
          className="text-gray-200"
        />
      );
    }
    return stars;
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .card-wrapper {
          perspective: 1000px;
        }
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
        }
        
        .image-overlay {
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.03) 100%
          );
        }
        
        
        .discount-badge {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          animation: float 3s ease-in-out infinite;
        }
        
        .wishlist-btn {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .wishlist-btn:hover {
          transform: scale(1.1);
        }
        
        .wishlist-btn:active {
          transform: scale(0.95);
        }
        
        .cart-btn:not(.bg-red-500):not(.bg-gray-400) {
          background: linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%);
          background-size: 200% 200%;
        }
        
        .cart-btn {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .cart-btn:hover {
          background-position: 100% 100%;
          transform: scale(1.05);
          box-shadow: 0 8px 24px -4px rgba(5, 150, 105, 0.4);
        }
        
        .cart-btn:active {
          transform: scale(0.98);
        }
        
        .leaf-accent {
          animation: pulse-soft 4s ease-in-out infinite;
        }
        
        .price-tag {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        
        .skeleton-loading {
          background: linear-gradient(
            90deg,
            #f3f4f6 0%,
            #e5e7eb 50%,
            #f3f4f6 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .modal-backdrop {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .modal-content {
          animation: modalSlideIn 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .thumbnail-btn {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .thumbnail-btn:hover {
          transform: scale(1.05);
        }
        
        .thumbnail-btn.active {
          box-shadow: 0 0 0 2px #059669;
        }
      `}</style>

      <div className="card-wrapper h-full">
        <div
          className="product-card relative bg-white rounded-2xl md:rounded-3xl overflow-hidden h-full flex flex-col border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.15)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 pointer-events-none z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-50/80 to-transparent rounded-bl-[100%]" />
          </div>

          {/* Image Section */}
          <div className="relative bg-gradient-to-b from-stone-50 to-stone-100/50 overflow-hidden">
            {/* Discount Badge */}
            {discount > 0 && (
              <span className="discount-badge absolute top-2 left-2 md:top-3 md:left-3 z-20 text-white text-[10px] md:text-xs font-semibold py-1 px-2.5 md:py-1.5 md:px-3 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles size={12} />
                {discount}% OFF
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => handleWishListToogle(product)}
              className="wishlist-btn absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 p-2 md:p-2.5 rounded-full shadow-md z-20 group"
              aria-label={mounted && isWishList(id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {mounted && isWishList(id) ? (
                <Heart size={18} className="text-rose-500 fill-rose-500 transition-transform group-hover:scale-110" />
              ) : (
                <Heart size={18} className="text-gray-400 group-hover:text-rose-400 transition-colors" />
              )}
            </button>

            {/* Product Image */}
            <Link
              href={`/product/${displaySlug}`}
              className="block relative h-[180px] md:h-[240px] overflow-hidden"
            >
              {/* Skeleton loader */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton-loading" />
              )}

              <Image
                src={img && img.trim() ? (isHovered && imgHover ? imgHover : img) : "/placeholder.png"}
                alt={heading || "Product image"}
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                className={`object-cover transition-all duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"
                  } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  // If image fails to load (e.g. 404 Unsplash), fallback to placeholder
                  setImageLoaded(true); // Still set to true to show the placeholder image instead of skeleton
                  const target = e.target;
                  if (target.src !== window.location.origin + "/placeholder.png") {
                    target.src = "/placeholder.png";
                  }
                }}
              />

              {/* Subtle overlay gradient */}
              <div className="image-overlay absolute inset-0 pointer-events-none" />
            </Link>
          </div>

          {/* Content Section */}
          <div className="p-2 md:p-5 flex-1 flex flex-col">
            {/* Rating */}
            {finalRating >= 0 && (
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(finalRating)}
                </div>
                <span className="text-[10px] md:text-xs text-gray-500 font-medium">
                  {finalRating > 0 ? `(${finalRating.toFixed(1)})` : "(New)"}
                  {finalReviews > 0 && ` • ${finalReviews}`}
                </span>
              </div>
            )}

            <Link
              href={`/product/${displaySlug}`}
              className="flex-1 flex flex-col group/title"
              title={heading || name || title}
            >
              {/* Category Label */}
              {categories && categories.length > 0 && (
                <span className="text-[10px] md:text-xs font-bold text-violet-600 uppercase tracking-widest mb-1">
                  {categories[0]}
                </span>
              )}

              {/* Title */}
              <h3
                title={heading || name || title}
                className="font-semibold text-xs md:text-sm text-gray-800 line-clamp-2  leading-snug mb-1 md:mb-2 min-h-[2.4rem] transition-all duration-200"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: isHovered ? 2 : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: isHovered ? 'hidden' : 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {heading || name || title}
              </h3>
            </Link>

            {/* Price & Cart Section */}
            <div className="flex items-end justify-between gap-3 pt-3 border-t border-gray-100/80">
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-2xl font-bold text-gray-900">
                    ₹{price?.toLocaleString()}
                  </span>
                  {discount > 0 && (
                    <span className="line-through text-xs md:text-sm text-gray-400 font-medium">
                      ₹{originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <div className="price-tag inline-flex items-center gap-1 text-[10px] md:text-xs text-emerald-700 font-semibold px-2 py-1 rounded-full">
                    <Sparkles size={12} />
                    Save ₹{(originalPrice - price)?.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Quantity Stepper (+ -) or Add to Cart Button */}
              {mounted && cartQuantity > 0 ? (
                <div 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="inline-flex items-center bg-emerald-50 border-2 border-emerald-500 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={handleDecrement}
                    className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-emerald-800 hover:bg-emerald-200 transition-colors font-bold active:scale-90"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-7 md:w-8 text-center text-xs md:text-sm font-black text-emerald-900 select-none">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-emerald-800 hover:bg-emerald-200 transition-colors font-bold active:scale-90"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={product?._rawData?.stock_status === 'out_of_stock' || product?._rawData?.stock === 0}
                  className={`cart-btn px-4 py-2 md:px-5 md:py-2.5 rounded-xl shadow-md text-white text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 active:scale-95 ${
                    (product?._rawData?.stock_status === 'out_of_stock' || product?._rawData?.stock === 0)
                      ? "bg-gray-400 cursor-not-allowed grayscale"
                      : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/30"
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingBag size={16} />
                  <span>Add</span>
                </button>
              )}
            </div>

            {/* Go to Checkout Button when quantity > 0 */}
            {mounted && cartQuantity > 0 && (
              <Link
                href="/checkout"
                onClick={(e) => e.stopPropagation()}
                className="w-full mt-3 py-2 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all group active:scale-98"
              >
                <span>Go to Checkout</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* Natural/Bakery Badge */}
          {isBakery && (
            <div className="absolute top-[10px] left-[10px] right-auto hidden lg:block">
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[9px] md:text-[10px] font-semibold px-2 py-1 rounded-full">
                <CheckCircle size={12} />
                <span>100% Natural</span>
              </div>
            </div>
          )}
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => {
            setIsAuthModalOpen(false);
            setIsLoggedIn(true);
          }}
        />
      </div>
    </>
  );
}