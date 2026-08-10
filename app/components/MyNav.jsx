"use client";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronDown,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchHomeLayout, searchProducts } from "../services/productService";
import { setError, setLocation, setPincode, setStatus } from "../store/locationSlice";

export default function PremiumHeader({ initialLayoutData }) {
  const [navCategories, setNavCategories] = useState(initialLayoutData?.navigation?.slice(0, 10) || []);
  const [loading, setLoading] = useState(!initialLayoutData);
  const [mounted, setMounted] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef(null);
  const searchRefMobile = useRef(null);
  const [OnScroll, setOnScroll] = useState(true);
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.location);
  const cartItems = useSelector((state) => state?.cart?.cartItem || []);
  const cartItemCount = cartItems.reduce((acc, item) => acc + (item.qnty || 1), 0);
  const wishList = useSelector((state) => state.wish.wishlist);
  const wishListItemCount = wishList?.length || 0;

  const [pincodeInput, setPincodeInput] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Load location from localStorage or detect on mount
  useEffect(() => {
    setMounted(true);

    const handleAuthChange = () => {
      const token = localStorage.getItem("userToken");
      const userData = localStorage.getItem("userData");
      if (token) {
        setIsLoggedIn(true);
        const user = userData ? JSON.parse(userData) : null;
        setUserEmail(user?.email || "User");
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    };

    handleAuthChange();

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    const savedLocation = localStorage.getItem("userLocation");
    const savedPincode = localStorage.getItem("userPincode");

    if (savedLocation) {
      dispatch(setLocation(savedLocation));
      if (savedPincode) dispatch(setPincode(savedPincode));
    } else {
      setIsLocationOpen(true);
    }

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserEmail("");
    setIsMobileMenuOpen(false);
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  const handleDetectLocation = async (silent = false) => {
    if (!navigator.geolocation) {
      if (!silent) alert("Geolocation is not supported by your browser");
      return;
    }

    if (!silent) dispatch(setStatus("loading"));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using a free reverse geocoding API (BigDataCloud or similar)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            { cache: 'no-store' }
          );
          const data = await response.json();
          const locationName = data.city || data.locality || data.principalSubdivision || "Detected Location";
          const pc = data.postcode || "";

          dispatch(setLocation(locationName));
          dispatch(setPincode(pc));
          dispatch(setStatus("succeeded"));

          localStorage.setItem("userLocation", locationName);
          localStorage.setItem("userPincode", pc);

          if (!silent) setIsLocationOpen(false);
        } catch (error) {
          console.error("Error fetching location name:", error);
          dispatch(setError("Failed to fetch location name"));
          dispatch(setStatus("failed"));
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        if (!silent) {
          alert("Unable to retrieve your location. Please enter it manually.");
          dispatch(setStatus("failed"));
        }
      }
    );
  };

  const fetchAreaFromPincode = async (pincode) => {
    try {
      // For India, we can use api.postalpincode.in
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, { cache: 'no-store' });
      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        return `${postOffice.Name}, ${postOffice.District}`;
      }

      // Fallback to BigDataCloud reverse geocoding with a search query if possible, 
      // but bigdatacloud's free client is specifically for coordinates.
      // So if the common Indian API fails, we return null and fallback to just the pincode.
      return null;
    } catch (error) {
      console.error("Error fetching area from pincode:", error);
      return null;
    }
  };

  const handleManualLocationSubmit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const input = pincodeInput.trim();
      if (input) {
        dispatch(setStatus("loading"));

        // Check if input is a 6-digit pincode (common in India)
        const isPincode = /^\d{6}$/.test(input);

        let finalLocation = input;

        if (isPincode) {
          const areaName = await fetchAreaFromPincode(input);
          if (areaName) {
            finalLocation = areaName;
            dispatch(setPincode(input));
            localStorage.setItem("userPincode", input);
          }
        }

        dispatch(setLocation(finalLocation));
        localStorage.setItem("userLocation", finalLocation);
        dispatch(setStatus("succeeded"));
        setIsLocationOpen(false);
        setPincodeInput("");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideDesktop = searchRef.current && searchRef.current.contains(event.target);
      const isClickInsideMobile = searchRefMobile.current && searchRefMobile.current.contains(event.target);
      if (!isClickInsideDesktop && !isClickInsideMobile) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!initialLayoutData) {
      const getLayout = async () => {
        setLoading(true);
        const data = await fetchHomeLayout();
        if (data && data.navigation) {
          setNavCategories(data.navigation.slice(0, 9));
        }
        setLoading(false);
      };
      getLayout();
    }
  }, [initialLayoutData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setOnScroll(false)
      } else {
        setOnScroll(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const visibleCategories = navCategories.slice(0, 8);
  const moreCategories = navCategories.slice(8);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchCategories([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchProducts(searchQuery);
      setSearchResults(results.products || []);
      setSearchCategories(results.categories || []);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const popularProducts = searchResults.slice(0, 4);

  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const getBlogLink = (heading) => {
    return `/blog/${heading.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/).join("-")}`;
  };

  const ProductSearchItem = ({ product, onClick }) => {
    return (
      <Link
        href={`/product/${product.slug || product.title?.toLowerCase()?.replace(/&/g, "and")?.replace(/,/g, "")?.split(" ")?.join("-")}`}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2.5 hover:bg-amber-500/10 rounded-lg transition-all group"
      >
        <div className="relative w-14 h-14 flex-shrink-0 bg-white/5 rounded-lg overflow-hidden border border-white/10 group-hover:border-amber-500/30 transition-colors">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=crop";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white group-hover:text-amber-300 line-clamp-1 transition-colors">
            {product.title}
          </p>
          {product.rating && (
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="text-amber-400 fill-amber-400" size={12} />
              <span className="text-xs text-gray-400 font-medium">{product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-gray-500">({product.reviews})</span>
              )}
            </div>
          )}
          {product.category && (
            <span className="text-xs text-gray-500 mt-0.5 block">
              {product.category}
            </span>
          )}
        </div>
        {product.price && (
          <div className="flex-shrink-0 text-right">
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through block">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-amber-400">
              ₹{product.price}
            </span>
          </div>
        )}
      </Link>
    );
  };

  const SearchDropdown = () => {
    const showSearchResults = searchFocused && searchQuery.trim();
    const showInitialContent = searchFocused && !searchQuery.trim();

    if (!showInitialContent && !showSearchResults) return null;

    return (
      <div className="absolute top-full left-0 w-full bg-[#1a1a1a] mt-2 rounded-xl shadow-2xl border border-white/10 max-h-[420px] overflow-y-auto z-50">
        {showInitialContent && navCategories.length > 0 && (
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
              <h3 className="text-sm font-bold text-white">Top Categories</h3>
              <Sparkles className="text-amber-400 ml-auto" size={16} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {navCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.uuid || cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => {
                    setSearchFocused(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-3 p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10">
                    <span className="text-lg">{cat.icon || "🎁"}</span>
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-amber-300 font-medium">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {isSearching && (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Searching for products...</p>
          </div>
        )}

        {showSearchResults && !isSearching && (
          <div className="p-5">
            {searchCategories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Menu size={14} />
                  Found in Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {searchCategories.map((cat) => (
                    <Link
                      key={cat.uuid || cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => {
                        setSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Search size={14} />
              Products ({searchResults.length})
            </h3>
            <ul className="space-y-1">
              {searchResults.length > 0 ? (
                searchResults.slice(0, 8).map((product) => (
                  <li key={product.id}>
                    <ProductSearchItem
                      product={product}
                      onClick={() => {
                        setSearchFocused(false);
                        setSearchQuery("");
                      }}
                    />
                  </li>
                ))
              ) : (
                <div className="py-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                    <Search className="text-gray-600" size={36} />
                  </div>
                  <p className="text-white font-semibold text-base mb-2">No products found</p>
                  <p className="text-gray-500 text-sm">Try searching with different keywords</p>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const MobileSidebar = () => {
    const sidebarMenuItems = navCategories.map(cat => ({
      id: cat.slug,
      title: cat.name,
      icon: cat.icon || "🎁",
      link: `/category/${cat.slug}`,
      hasSubmenu: cat.sub_categories?.length > 0,
      submenu: cat.sub_categories?.map(sub => ({
        title: sub.name,
        link: `/category/${sub.slug}`
      }))
    }));

    const additionalLinks = [
      { title: "All Products", link: "/category/all-products", icon: "🛍️" },
      { title: "Our Team", link: "/our-team", icon: "👥" },
      { title: "Careers", link: "/careers", icon: "💼" },
      { title: "About Us", link: "/about-us", icon: "🏢" },
      { title: "Contact Us", link: "/contact-us", icon: "📍" },
      { title: "Blogs", link: "/blog", icon: "📝" },
      { title: "My Wishlist", link: "/wishlist", icon: "❤️" },
    ];

    return (
      <div
        className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} duration-300 transition-transform fixed bg-black/70 backdrop-blur-sm inset-0 z-[999] flex justify-start lg:hidden`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
        }}
      >
        <div className="w-[85%] sm:w-[75%] md:w-[60%] bg-[#0f0f0f] h-full overflow-y-auto shadow-2xl border-r border-white/10">
          {/* Mobile Menu Header */}
          <div className="sticky top-0 bg-[#0f0f0f]/95 backdrop-blur-md z-10 border-b border-white/10">
            <div className="flex justify-between items-center p-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/img/Ayutramartlogo.webp" alt="VASP Planner Logo" className="h-[50px] brightness-0 invert" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-4 pb-4 space-y-3">
              <Link href={isLoggedIn ? "/user/profile/" : "/user/login/"}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
                >
                  <User size={20} />
                  <span>{isLoggedIn ? "Account" : "Login / Sign Up"}</span>
                </button>
              </Link>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full bg-white/5 border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all hover:bg-red-500/10 hover:border-red-500/30 group"
                >
                  <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
                  <span className="group-hover:text-red-400 transition-colors">Logout</span>
                </button>
              )}
            </div>
          </div>

          <div className="px-4 py-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2 px-2">
              <span className="w-1 h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></span>
              SHOP
            </h3>

            <nav>
              <ul className="space-y-1">
                {sidebarMenuItems.map((item) => (
                  <li key={item.id}>
                    {!item.hasSubmenu ? (
                      <Link
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all group border border-transparent hover:border-amber-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-gray-300 font-medium group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ArrowRight className="text-gray-600 group-hover:text-amber-400 transition-colors" size={16} />
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all group border border-transparent hover:border-amber-500/20"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-gray-300 font-medium group-hover:text-amber-300 transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <ChevronDown
                            className={`text-gray-500 transition-all duration-300 ${expandedMenus[item.id] ? "rotate-180 text-amber-400" : ""}`}
                            size={16}
                          />
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${expandedMenus[item.id] ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                          <ul className="ml-11 space-y-1 border-l-2 border-amber-500/20 pl-4 py-1">
                            {item.submenu.map((subItem, index) => (
                              <li key={index}>
                                <Link
                                  href={subItem.link}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-2.5 px-3 text-sm text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="border-t border-white/10 my-3 mx-4"></div>

          <div className="px-4 py-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2 px-2">
              <span className="w-1 h-4 bg-gray-600 rounded-full"></span>
              MORE
            </h3>
            <ul className="space-y-1">
              {additionalLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group border border-transparent hover:border-amber-500/20"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-300 font-medium group-hover:text-amber-300 transition-colors flex-1">
                      {item.title}
                    </span>
                    <ArrowRight className="text-gray-600 group-hover:text-amber-400 transition-colors" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 px-4 py-6 mt-8">
            <p className="text-xs text-gray-600 text-center">
              © 2024 VASP Planner. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="bg-[#0f0f0f] sticky z-[999] top-0">
      {/* Top Bar - Hidden on Mobile */}
      {OnScroll && (
        <div className="hidden md:block border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2 text-xs">
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-amber-400" />
                  Free Delivery above ₹999
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" />
                  Premium Quality Guaranteed
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <Link href="/track-order" className="hover:text-amber-300 transition-colors">Track Order</Link>
                <span className="text-white/20">|</span>
                <Link href="/support" className="hover:text-amber-300 transition-colors">Help</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between gap-4 ${!OnScroll ? 'py-1' : 'py-3'}`}>
            {/* Mobile Menu Button */}
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img src="/img/Ayutramartlogo.webp" alt="VASP Planner Logo" className="h-[50px] md:h-[60px] brightness-0 invert" />
            </Link>

            {/* Location Selector - Desktop */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl transition-all group border border-white/10 hover:border-amber-500/30 w-[170px]"
                aria-label="Select Delivery Location"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-amber-400" />
                </div>
                <div className="text-left overflow-hidden min-w-0 flex-1">
                  <div className="text-xs text-gray-500 font-medium leading-tight">Deliver to</div>
                  <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1 w-full">
                    <span className="truncate flex-1">
                      {mounted ? locationState.location : "Select Location"}
                    </span>
                    <ChevronDown size={14} className="text-gray-500 flex-shrink-0" />
                  </div>
                </div>
              </button>

              {isLocationOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLocationOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 bg-[#1a1a1a] shadow-2xl rounded-xl p-5 w-80 border border-white/10 z-20">
                    <h3 className="text-base font-bold mb-1 text-white">Select Delivery Location</h3>
                    <p className="text-xs text-gray-500 mb-4">Enter your area to check delivery options</p>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Enter pincode or city"
                        value={pincodeInput}
                        onChange={(e) => setPincodeInput(e.target.value)}
                        onKeyDown={handleManualLocationSubmit}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm text-white placeholder:text-gray-500 transition-all"
                      />
                    </div>
                    <button
                      onClick={() => handleDetectLocation()}
                      disabled={locationState.status === "loading"}
                      className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black py-3 rounded-lg transition-all text-sm font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {locationState.status === "loading" ? "Detecting..." : "Detect My Location"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-6 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for gifts, cakes, flowers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full py-3.5 px-5 pr-14 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm text-white placeholder:text-gray-500 transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-500 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center cursor-pointer hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20">
                    <Search className="text-black" size={16} />
                  </div>
                </div>
              </div>
              <SearchDropdown />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-300 hover:text-amber-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1">
                  <Menu size={24} />
                </div>
              </button>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden text-gray-300 hover:text-amber-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1">
                  <Search size={22} />
                </div>
              </button>

              {/* Same Day Delivery */}
              <Link
                href="/category/same-day"
                className="hidden min-[500px]:max-[650px]:flex sm:flex md:flex flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1">
                  <Truck size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 hidden md:flex group-hover:text-amber-300 transition-colors">
                  Same Day
                </span>
              </Link>

              {/* Currency */}
              <Link
                href="/wishlist"
                className="hidden md:flex flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl relative"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1 relative">
                  <Heart size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                  {mounted && wishListItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {wishListItemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-500 group-hover:text-amber-300 transition-colors">
                  Wishlist
                </span>
              </Link>

              {/* Corporate */}
              <Link
                href="/corporate"
                className="hidden lg:flex flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1">
                  <Building2 size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 group-hover:text-amber-300 transition-colors">
                  Corporate
                </span>
              </Link>

              {/* Careers */}
              <Link
                href="/careers"
                className="hidden xl:flex flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1">
                  <Briefcase size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 group-hover:text-amber-300 transition-colors">
                  Careers
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className=" flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl relative hidden md:flex"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors mb-1 relative">
                  <ShoppingCart size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                  {mounted && cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-500 group-hover:text-amber-300 transition-colors hidden md:block">
                  Cart
                </span>
              </Link>

              {/* User */}
              <div className="flex items-center gap-1">
                <Link
                  href={isLoggedIn ? "/user/profile" : "/user/login"}
                  className="flex flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl"
                  aria-label={isLoggedIn ? "User Account" : "Login or Sign Up"}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-lg flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-colors mb-1 border border-amber-500/20">
                    <User size={20} className="text-amber-400" />
                  </div>
                  <span className="text-[10px] font-medium hidden md:block text-gray-500 group-hover:text-amber-300 transition-colors">
                    {isLoggedIn ? "Account" : "Login"}
                  </span>
                </Link>

                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    aria-label="Logout from account"
                    className="flex flex-col items-center group transition-all p-2 hover:bg-white/5 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-red-500/10 transition-colors mb-1 border border-white/10 group-hover:border-red-500/30">
                      <LogOut size={20} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                    </div>
                    <span className="text-[10px] hidden md:block font-medium text-gray-500 group-hover:text-red-400 transition-colors">
                      Logout
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Expandable */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileSearchOpen ? "max-h-[500px] pb-4" : "max-h-0"}`}>
            <div className="relative w-full" ref={searchRefMobile}>
              <input
                type="text"
                placeholder="Search for gifts, cakes, flowers..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-4 pr-12 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm text-white placeholder:text-gray-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <Search className="text-black" size={14} />
                </div>
              </div>
              <SearchDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-gradient-to-b from-[#0f0f0f] to-[#141414] border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex relative items-center justify-between gap-1">
            {visibleCategories.map((category, index) => (
              <div
                key={index}
                className="group"
                onMouseEnter={() => (category.mega_menu || category.sub_categories?.length > 0) && setActiveMegaMenu(category.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-1 px-4 py-3.5 text-sm font-medium text-gray-400 hover:text-amber-300 transition-colors whitespace-nowrap relative"
                >
                  {category.name}
                  {(category.mega_menu || category.sub_categories?.length > 0) && <ChevronDown size={14} className="opacity-50" />}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>

                  {/* Mega Menu or Simple Dropdown */}
                  {category.has_dropdown && activeMegaMenu === category.name && (
                    <div className="absolute top-full left-[0vw] right-auto mx-auto bg-[#1a1a1a] shadow-2xl border border-white/10 z-50 rounded-b-2xl overflow-hidden" style={{ width: category.mega_menu ? '100vw' : 'auto', maxWidth: category.mega_menu ? '1200px' : '280px' }}>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500"></div>

                      {category.mega_menu ? (
                        /* Full Mega Menu */
                        <div className="p-8">
                          <div className="grid grid-cols-12 gap-8">
                            {/* Featured Section */}
                            <div className="col-span-4 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl p-6 border border-amber-500/20">
                              <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="text-amber-400" size={20} />
                                <div>
                                  <h3 className="text-lg font-bold text-white">{category.mega_menu.featured?.title}</h3>
                                  <p className="text-xs text-gray-500">{category.mega_menu.featured?.subtitle}</p>
                                </div>
                              </div>
                              <ul className="space-y-2">
                                {category.mega_menu.featured?.items.map((item, idx) => (
                                  <li key={idx}>
                                    <Link
                                      href={item.link}
                                      className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-all group"
                                    >
                                      <span className="text-2xl">{item.icon}</span>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-semibold text-gray-300 group-hover:text-amber-300 transition-colors">
                                            {item.name}
                                          </span>
                                          {item.badge && (
                                            <span className={`${item.badgeColor || "bg-amber-500"} text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase`}>
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                      </div>
                                      <ArrowRight className="text-gray-600 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all" size={16} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Categories Columns */}
                            <div className="col-span-5 grid grid-cols-2 gap-6">
                              {category.mega_menu.columns?.map((column, colIndex) => (
                                <div key={colIndex}>
                                  <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xl">{column.icon}</span>
                                    <h3 className="text-sm font-bold text-white">{column.title}</h3>
                                  </div>
                                  <ul className="space-y-2">
                                    {column.items.map((item, itemIndex) => (
                                      <li key={itemIndex}>
                                        <Link
                                          href={item.link}
                                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-300 transition-colors py-1.5 group"
                                        >
                                          {item.emoji && <span className="text-base">{item.emoji}</span>}
                                          <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {/* Showcase Products */}
                            <div className="col-span-3 space-y-4">
                              {category.mega_menu.showcaseProducts?.map((product, idx) => (
                                <Link
                                  key={idx}
                                  href={product.link}
                                  className="group block relative overflow-hidden rounded-xl border border-white/10 hover:border-amber-500/30 transition-all"
                                >
                                  <div className="aspect-[4/5] relative">
                                    <img
                                      src={product.image}
                                      alt={product.title}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=crop";
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                                    <div className="absolute top-3 right-3">
                                      <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                        {product.badge}
                                      </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                      <h4 className="font-bold text-white text-base mb-1">{product.title}</h4>
                                      <p className="text-gray-400 text-xs mb-2">{product.subtitle}</p>
                                      <div className="flex items-center justify-between">
                                        <span className="text-amber-400 font-semibold text-sm">{product.price}</span>
                                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                                          <ArrowRight className="text-white" size={16} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Simple Dropdown for items with sub_categories but NO mega_menu */
                        <ul className="py-2">
                          {category.sub_categories?.map((sub, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/category/${sub.slug}`}
                                className="block px-6 py-2.5 text-sm text-gray-400 hover:text-amber-300 hover:bg-white/5 transition-all"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </Link>

              </div>
            ))}

            {/* More Dropdown */}
            {moreCategories.length > 0 && (
              <div
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu("More")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-3.5 text-sm font-medium text-gray-400 hover:text-amber-300 transition-colors whitespace-nowrap relative">
                  More
                  <ChevronDown size={14} className="opacity-50" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </button>

                {activeMegaMenu === "More" && (
                  <div className="absolute top-full right-0 bg-[#1a1a1a] shadow-2xl border border-white/10 z-50 rounded-b-2xl overflow-hidden min-w-[200px]">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500"></div>
                    <ul className="py-2">
                      {moreCategories.map((category, index) => (
                        <li key={index} className="relative group/item">
                          <Link
                            href={`/category/${category.slug}`}
                            className="flex items-center justify-between px-6 py-3 text-sm text-gray-400 hover:text-amber-300 hover:bg-white/5 transition-all"
                          >
                            {category.name}
                            {category.sub_categories?.length > 0 && <ChevronDown size={14} className="opacity-30 -rotate-90" />}
                          </Link>

                          {/* Nested submenu for 'More' items if needed */}
                          {category.sub_categories?.length > 0 && (
                            <div className="absolute left-full top-0 ml-px bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover/item:block min-w-[180px]">
                              <ul className="py-2">
                                {category.sub_categories.map((sub, sIdx) => (
                                  <li key={sIdx}>
                                    <Link
                                      href={`/category/${sub.slug}`}
                                      className="block px-6 py-2.5 text-sm text-gray-400 hover:text-amber-300 hover:bg-white/5 transition-all"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileSidebar />
    </header>
  );
}