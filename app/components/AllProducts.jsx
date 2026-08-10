"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Filter from "../category/[slug]/Filter";
import ProductAyurvedCard from "./ProductAyurvedCard";
import SEOContent from "./SEOContent";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Package,
  Loader2,
  Filter as FilterIcon,
  X
} from "lucide-react";

export default function AllProducts({ productData = [], filters }) {
  const [sortBy, setSortBy] = useState("newest");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sortedData = [...productData].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      return 0;
    });
    setSortedProducts(sortedData);
    setLoading(false);
  }, [sortBy, productData]);

  // Pagination logic
  const rowPerPage = 12;
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / rowPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndexOfItem = currentPage * rowPerPage;
  const startIndexOfItem = lastIndexOfItem - rowPerPage;
  const currentProducts = sortedProducts.slice(startIndexOfItem, lastIndexOfItem);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const sortOptions = [
    { value: "newest", label: "Featured" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK (Match Category) */}
      {/* ============================================== */}
      <section className="relative bg-[#0c0c0c] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/img/heroSection/2swiper.webp')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c]/95 to-[#0c0c0c]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-rose-500/8 rounded-full blur-[100px]" />

        <div className="relative z-10 pt-6 pb-30">
          <div className="container mx-auto px-4 md:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm mb-10">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-700" />
              <span className="text-amber-400 font-medium">All Products</span>
            </nav>

            {/* Main Content */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full mb-8">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-amber-300 text-sm font-semibold tracking-wide">Universal Collection</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                Our Collection
              </h1>

              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                Discover our handpicked selection of premium gifts, décor, and tokens of affection for every special moment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f8f9fa] rounded-t-[50px]" />
      </section>

      {/* Mobile Filter Overlay */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm lg:hidden">
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl overflow-y-auto flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <Filter
              setSortedProducts={setSortedProducts}
              productData={productData}
              filters={filters}
            />
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* SECTION 2: PRODUCTS GRID & INTERFACE */}
      {/* ============================================== */}
      <section className="relative pb-16 bg-[#f8f9fa] -mt-4">
        <div className="mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Desktop Sidebar Filter */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0">
              <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-0">
                <Filter
                  setSortedProducts={setSortedProducts}
                  productData={productData}
                  filters={filters}
                />
              </div>
            </aside>

            {/* Main Listing Area */}
            <main className="flex-1 min-w-0">
              {/* Premium Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                    <Package size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">{totalProducts} Products</h3>
                    <p className="text-gray-500 text-sm">Showing {startIndexOfItem + 1}-{Math.min(lastIndexOfItem, totalProducts)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filter Toggle */}
                  {/* <button
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
                  >
                    <FilterIcon size={18} />
                    <span className="font-semibold">Filters</span>
                  </button> */}

                  {/* Enhanced Sort Dropdown */}
                  <div className="relative flex-1 sm:flex-none">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="w-full sm:w-auto flex items-center justify-between gap-4 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all"
                    >
                      <span className="text-gray-700 font-medium">
                        {sortOptions.find(opt => opt.value === sortBy)?.label}
                      </span>
                      <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${showSortDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {showSortDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                              className={`w-full px-5 py-3 text-left transition-colors ${sortBy === option.value ? "bg-violet-50 text-violet-600 font-bold" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Products Rendering */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-600" size={24} />
                  </div>
                  <p className="mt-6 text-gray-500 font-medium animate-pulse">Loading collection...</p>
                </div>
              ) : currentProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {currentProducts.map((elm, index) => (
                      <ProductAyurvedCard key={elm.id || index} product={elm} showViewMore={false} />
                    ))}
                  </div>

                  {/* Premium Pagination Styling */}
                  {totalPages > 1 && (
                    <div className="mt-14 flex flex-col items-center gap-6">
                      <div className="flex items-center flex-wrap justify-center gap-2">
                        <button
                          onClick={handlePrev}
                          disabled={currentPage === 1}
                          className={`w-12 h-12 rounded-xl border items-center justify-center transition-all hidden md:flex shadow-sm ${currentPage === 1 ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100" : "bg-white border-gray-200 text-gray-600 hover:bg-violet-600 hover:border-violet-600 hover:text-white hidden md:flex"}`}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-2 overflow-x-auto px-2 no-scrollbar">
                          {getPageNumbers().map((page, index) => (
                            <React.Fragment key={index}>
                              {page === '...' ? (
                                <span className="px-2 text-gray-400">...</span>
                              ) : (
                                <button
                                  onClick={() => handlePageClick(page)}
                                  className={`w-12 h-12 rounded-xl font-bold transition-all shadow-sm ${currentPage === page ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-violet-500/30" : "bg-white border border-gray-200 text-gray-600 hover:bg-violet-50 hover:border-violet-200"}`}
                                >
                                  {page}
                                </button>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        <button
                          onClick={handleNext}
                          disabled={currentPage === totalPages}
                          className={`w-12 h-12 hidden md:flex rounded-xl border items-center justify-center transition-all shadow-sm ${currentPage === totalPages ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100" : "bg-white border-gray-200 text-gray-600 hover:bg-violet-600 hover:border-violet-600 hover:text-white"}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm font-medium">Page {currentPage} of {totalPages}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 italic text-gray-400">
                  <Package size={48} className="mb-4 opacity-20" />
                  <p className="text-lg">No products found in our collection.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* SEO & FAQ Section */}
      <SEOContent
        title="Our Premium Product Collection"
        description="<p>Welcome to our comprehensive collection of <strong>premium products</strong>. We have meticulously curated our inventory to offer only the highest quality items, ranging from exquisite home décor to personal care and luxury gifts.</p><p>Every product in our catalog undergoes a rigorous quality check to ensure it meets our standards of excellence. Whether you're shopping for a special occasion or enhancing your daily lifestyle, our diverse range provides perfect solutions for every need.</p>"
        faqs={[
          { question: "Are all products in your collection authentic?", answer: "Yes, we guarantee 100% authenticity for every product. We source directly from manufacturers and authorized distributors to ensure you receive genuine items." },
          { question: "How often do you add new products?", answer: "We update our collections weekly with new arrivals and seasonal trends. Be sure to check back often or subscribe to our newsletter for the latest updates." },
          { question: "Do you offer bulk discounts?", answer: "Yes, we offer special pricing for bulk orders or corporate gifting. Please contact our support team for a personalized quote." },
          { question: "Can I return a product if it doesn't meet my expectations?", answer: "We have a student-friendly 15-day return policy. If you're not satisfied, you can initiate a return or exchange through our website with ease." }
        ]}
      />

    </div>
  );
}