"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import BottomFilter from "./BottomFilter";
import { fetchProductsByCategory, fetchCategories, fetchCategoryFilters } from "../../services/productService";
import ProductAyurvedCard from '../../components/ProductAyurvedCard';
import SEOContent from "../../components/SEOContent";
import {
  ChevronRight,
  ChevronLeft,
  Grid3X3,
  LayoutList,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Play,
  Package,
  Star,
  Heart,
  Shield,
  Truck,
  HeadphonesIcon,
  RotateCcw,
  Flame,
  Award,
  Loader2,
  SlidersHorizontal,
  ShoppingBag
} from "lucide-react";

export default function SlugInerPage({
  slug,
  initialProducts = [],
  initialCategoryInfo = null,
  initialMeta = null,
  initialFilters = null,
  initialPage = 1,
  initialPerPage = 10
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [categoryInfo, setCategoryInfo] = useState(initialCategoryInfo);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [sortedProducts, setSortedProducts] = useState(initialProducts);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mobileFilterCount, setMobileFilterCount] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [paginationMeta, setPaginationMeta] = useState(initialMeta);
  const [activeFilters, setActiveFilters] = useState({
    price_range: [],
    discount: [],
    product_type: [],
    shop_for: []
  });

  const isFirstRender = useRef(true);
  const prevSlug = useRef(slug);

  const cartList = useSelector((state) => state.cart?.cartItem || []);
  const cartTotalAmount = cartList.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.qnty) || 1)), 0);
  const cartTotalCount = cartList.reduce((sum, item) => sum + (parseInt(item.qnty) || 1), 0);

  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const perPageFromUrl = parseInt(searchParams.get("per_page")) || 10;

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    setPerPage(perPageFromUrl);
  }, [perPageFromUrl]);

  useEffect(() => {
    // If slug changes, reset categories and fetch new filters
    if (prevSlug.current !== slug) {
      prevSlug.current = slug;
      const loadCategoryData = async () => {
        const [categoriesList, filtersData] = await Promise.all([
          fetchCategories(),
          fetchCategoryFilters(slug)
        ]);

        setCategoryFilters(filtersData);

        const currentCat = categoriesList.find(c => c.slug === slug);
        if (currentCat) {
          setCategoryInfo(prev => ({
            ...currentCat,
            ...prev,
            name: currentCat.name || prev?.name,
            description: currentCat.description || prev?.description
          }));
        }
      };

      loadCategoryData();
    }
  }, [slug]);

  useEffect(() => {
    // Skip client fetching on initial render if page aligns with initial pre-fetched page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const loadProducts = async () => {
      setLoading(true);
      const { products: productsData, category: fetchedCategory, meta } = await fetchProductsByCategory(
        slug,
        currentPage,
        { ...activeFilters, sort_by: sortBy, per_page: perPage }
      );
      console.log("Fetched products:", productsData);
      if (fetchedCategory) {
        setCategoryInfo(prev => ({
          ...prev,
          ...fetchedCategory,
          name: fetchedCategory.name || prev?.name,
          description: fetchedCategory.description || prev?.description
        }));
      }

      setProducts(productsData);
      setSortedProducts(productsData);
      setPaginationMeta(meta);
      setLoading(false);

      // Scroll to top of product section
      const productSection = document.getElementById('product-section');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (slug) {
      loadProducts();
    }
  }, [slug, currentPage, sortBy, activeFilters, perPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= (paginationMeta?.last_page || 1)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("per_page", newPerPage.toString());
    params.set("page", "1"); // Reset to page 1 to prevent issues
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (type, values) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: values
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };
  const humanReadableSlug = categoryInfo?.insights?.title || categoryInfo?.name || slug?.split("-").join(" ") || "Products";
  const categoryDescription = categoryInfo?.insights?.content || categoryInfo?.description || `Premium quality products curated just for you.`;

  const heroTitle = categoryInfo?.name || slug?.split("-").join(" ") || "Products";
  const heroDescription = categoryInfo?.description || `Explore our exclusive collection of ${heroTitle}. Premium quality products curated just for you.`;

  const sortOptions = [
    { value: "newest", label: "Featured / Newest" },
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Customer Rating" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "price_low", label: "Price: Low to High" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <BottomFilter
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onCountChange={setMobileFilterCount}
      />

      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK */}
      {/* ============================================== */}
      <section className="relative bg-[#0c0c0c] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/img/heroSection/2swiper.webp')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c]/95 to-[#0c0c0c]" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-rose-500/8 rounded-full blur-[100px]" />

        <div className="relative z-10 pt-6 pb-10 md:pt-6 md:pb-10">
          <div className="container mx-auto px-4 md:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm mb-10">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-700" />
              <Link href="/all-products" className="text-gray-500 hover:text-white transition-colors">Collections</Link>
              <ChevronRight size={14} className="text-gray-700" />
              <span className="text-amber-400 capitalize font-medium">{heroTitle}</span>
            </nav>

            {/* Main Content */}
            <div className="text-center max-w-4xl mx-auto">
              {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full mb-8">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-amber-300 text-sm font-semibold tracking-wide">Premium Collection</span>
              </div> */}

              <h1 className="text-3xl capitalize md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide">
                {heroTitle.split(' ')[0] || ''}{" "}
                <span className="text-capitalize bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  {heroTitle.split(' ').slice(1).join(' ') || ''}
                </span>
              </h1>

              {heroDescription && (
                heroDescription.includes('<') ? (
                  <div
                    className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto [&_p]:mb-4 last:[&_p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: heroDescription }}
                  />
                ) : (
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                    {heroDescription}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f8f9fa] rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION: SUBCATEGORIES - QUICK NAV */}
      {/* ============================================== */}
      {categoryInfo?.subcategories?.length > 0 && (
        <section className="bg-[#f8f9fa] pb-4 -mt-2">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
              <span className="text-gray-400 text-sm font-medium whitespace-nowrap">Explore:</span>
              {categoryInfo.subcategories.map((sub) => (
                <Link
                  key={sub.uuid}
                  href={`/category/${sub.slug}`}
                  className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-violet-500 hover:text-violet-600 hover:shadow-md transition-all whitespace-nowrap"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================== */}
      {/* SECTION 2: PRODUCTS - LIGHT */}
      {/* ============================================== */}
      <section id="product-section" className="relative pb-10 md:pb-16 bg-[#f8f9fa]">
        <div className="mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="hidden lg:block w-[320px] flex-shrink-0">
              <div className="sticky top-6">
                <Filter 
                  activeFilters={activeFilters} 
                  onFilterChange={handleFilterChange} 
                  filters={categoryFilters} 
                />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col min-[500px]:max-[650px]:flex-row sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-5 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 min-w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                    <Package size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-nowrap text-lg">{paginationMeta?.total || sortedProducts.length} Products</h3>
                    <p className="text-gray-500 text-sm text-nowrap">Showing page {currentPage} of {paginationMeta?.last_page || 1}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* View Toggle */}
                  {/* <div className="hidden sm:flex items-center p-1.5 bg-gray-100 rounded-xl">
                    <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow text-violet-600" : "text-gray-400 hover:text-gray-600"}`}>
                      <Grid3X3 size={18} />
                    </button>
                    <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow text-violet-600" : "text-gray-400 hover:text-gray-600"}`}>
                      <LayoutList size={18} />
                    </button>
                  </div> */}

                  {/* Sort */}
                  <div className="relative flex-1 sm:flex-none">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="w-full sm:w-auto flex items-center justify-between gap-4 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
                    >
                      <span className="text-gray-700 font-medium">{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                      <ChevronDown size={18} className={`text-gray-400 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {showSortDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 z-50 overflow-hidden py-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                              className={`w-full px-4 py-3 text-left transition-colors ${sortBy === option.value ? "bg-violet-50 text-violet-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Page Length Selector */}
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={perPage}
                      onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
                      className="w-full sm:w-auto px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-gray-700 font-medium cursor-pointer focus:outline-none"
                    >
                      <option value="5">5 per page</option>
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                    </select>
                  </div>

                  {/* Mobile Filter Trigger */}
                  <button
                    onClick={() => setShowFilterModal(true)}
                    className="lg:hidden relative flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
                  >
                    <SlidersHorizontal size={18} className="text-violet-600" />
                    <span className="text-gray-700 font-medium">Filter</span>
                    {mobileFilterCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {mobileFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-600" size={24} />
                  </div>
                  <p className="mt-6 text-gray-500 font-medium animate-pulse">Fetching amazing gifts & setups...</p>
                </div>
              ) : sortedProducts.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${viewMode === "grid" ? (sortedProducts.length === 1 ? "grid-cols-1 sm:grid-cols-2 max-w-xl" : sortedProducts.length === 2 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4") : "grid-cols-1"}`}>
                    {sortedProducts.map((product, index) => (
                      <ProductAyurvedCard key={product.id || index} product={product} showViewMore={false} />
                    ))}
                  </div>

                  {/* Explore Trending Categories if results are small */}
                  {sortedProducts.length <= 3 && (
                    <div className="mt-12 p-6 bg-gradient-to-br from-violet-50/60 to-purple-50/60 border border-violet-100 rounded-3xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-base">Explore More Popular Collections</h4>
                          <p className="text-gray-500 text-xs">Discover trending decorations and gifts curated for you</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          { name: 'Birthday Specials', slug: 'birthday', emoji: '🎂' },
                          { name: 'Baby Welcome', slug: 'welcome-baby-balloon', emoji: '👶' },
                          { name: 'Haldi Ceremonies', slug: 'haldi', emoji: '🌼' },
                          { name: 'Romantic Anniversary', slug: 'anniversary', emoji: '💍' },
                          { name: 'Corporate Events', slug: 'corporate-decoration', emoji: '🏢' },
                          { name: 'Artisanal Cakes', slug: 'cake-collection', emoji: '🍰' },
                          { name: 'Festival Celebrations', slug: 'festival', emoji: '✨' },
                        ].map((cat, idx) => (
                          <Link
                            key={idx}
                            href={`/category/${cat.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-violet-600 text-gray-700 hover:text-white rounded-xl text-xs font-semibold shadow-sm border border-gray-200/80 hover:border-violet-600 transition-all group"
                          >
                            <span>{cat.emoji}</span>
                            <span>{cat.name}</span>
                            <ArrowRight size={13} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 italic text-gray-400">
                  <Package size={48} className="mb-4 opacity-20" />
                  <p>No products found in this category yet.</p>
                </div>
              )}

              {/* Pagination */}
              {paginationMeta && paginationMeta.last_page > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center transition-all shadow-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-400 hover:bg-violet-600 hover:border-violet-600 hover:text-white'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === paginationMeta.last_page ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-12 h-12 rounded-xl font-bold transition-all ${page === currentPage ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30" : "bg-white border border-gray-200 text-gray-600 hover:bg-violet-600 hover:border-violet-600 hover:text-white shadow-sm"}`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="text-gray-400">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === paginationMeta.last_page}
                    className={`w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center transition-all shadow-sm ${currentPage === paginationMeta.last_page ? 'opacity-50 cursor-not-allowed' : 'text-gray-400 hover:bg-violet-600 hover:border-violet-600 hover:text-white'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* SEO & FAQ Section */}
      <SEOContent
        title={categoryInfo?.insights?.title || `Exploring ${humanReadableSlug}`}
        description={categoryInfo?.insights?.content || `Discover our exclusive selection of <strong>${humanReadableSlug}</strong>. At our store, we prioritize quality, authenticity, and design to bring you the very best in premium gifting and lifestyle products.`}
        faqs={categoryInfo?.faqs || [
          { question: `What makes your ${humanReadableSlug} unique?`, answer: `Our ${humanReadableSlug} are handpicked from verified artisans and top-tier brands to ensure unparalleled quality and craftsmanship.` },
          { question: `Can I get fast delivery for ${humanReadableSlug}?`, answer: `Absolutely! Most items in our ${humanReadableSlug} collection are eligible for express delivery within 24-48 hours depending on your city.` },
          { question: `Are there any discounts available on ${humanReadableSlug}?`, answer: `Yes, we frequently offer seasonal promotions and special member discounts on our ${humanReadableSlug} collection. Keep an eye on our newsletter for exclusive deals.` },
          { question: `How can I track my ${humanReadableSlug} order?`, answer: `Once your order is shipped, you will receive a tracking ID via SMS and email. You can also track your order directly from your profile page.` }
        ]}
        stats={categoryInfo?.stats}
      />

      {/* Floating Sticky Go to Checkout Bar when products in cart */}
      {cartList.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg bg-gray-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl shadow-gray-950/50 border border-white/15 flex items-center justify-between animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 flex-shrink-0">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-300 font-medium">
                {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} in Cart
              </p>
              <p className="text-base font-extrabold text-white">
                ₹{cartTotalAmount.toLocaleString()}
              </p>
            </div>
          </div>
          <Link
            href="/checkout"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>Go to Checkout</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

    </div>
  );
}