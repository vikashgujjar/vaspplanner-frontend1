"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  Calendar,
  User,
  Tag,
  ArrowRight,
  Clock,
  BookOpen,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  Heart,
  MessageCircle,
  Eye,
  Filter,
  Bookmark,
  Share2
} from "lucide-react";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", count: 4, color: "from-amber-500 to-yellow-500" },
    { name: "Cakes", count: 1, color: "from-rose-500 to-pink-500" },
    { name: "Flowers", count: 1, color: "from-emerald-500 to-teal-500" },
    { name: "Gifts", count: 1, color: "from-blue-500 to-indigo-500" },
    { name: "Corporate", count: 1, color: "from-purple-500 to-violet-500" },
  ];

  const blogs = [
    {
      id: 1,
      author: "VASP Team",
      category: "Cakes",
      date: "April 10, 2026",
      para: "Learn how to select the right flavors, sizes, and designs to make every birthday celebration truly unforgettable. From chocolate truffle to red velvet, we cover it all.",
      title: "The Secret to Choosing the Perfect Birthday Cake",
      heading: "The Secret to Choosing the Perfect Birthday Cake",
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      readTime: "5 min read",
      views: 2450,
      likes: 890,
      featured: true
    },
    {
      id: 2,
      author: "admin",
      category: "Flowers",
      date: "April 5, 2026",
      para: "Explore the language of flowers and find out which blooms best express your feelings for anniversaries, birthdays, and special moments.",
      title: "Why Fresh Flowers are the Ultimate Token of Love",
      heading: "Why Fresh Flowers are the Ultimate Token of Love",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-1648482ce486?w=800&q=80",
      readTime: "7 min read",
      views: 1890,
      likes: 670,
      featured: true
    },
    {
      id: 3,
      author: "VASP Team",
      category: "Gifts",
      date: "March 28, 2026",
      para: "Discover the emotional impact of a custom-made gift and why it always stands out in a world of mass-produced items. Tips for personalisation included.",
      title: "How Personalised Gifts Create Lasting Memories",
      heading: "How Personalised Gifts Create Lasting Memories",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      readTime: "6 min read",
      views: 2100,
      likes: 740,
      featured: true
    },
    {
      id: 4,
      author: "admin",
      category: "Corporate",
      date: "March 20, 2026",
      para: "From selecting the right hamper to timing your delivery, here's everything you need to know about professional gifting etiquette for corporate clients.",
      title: "The Essential Guide to Corporate Gifting Etiquette",
      heading: "The Essential Guide to Corporate Gifting Etiquette",
      imageUrl: "https://images.unsplash.com/photo-1621535948301-1eec0b4d4580?w=800&q=80",
      readTime: "8 min read",
      views: 1250,
      likes: 335,
      featured: false
    }
  ];

  const popularPosts = [...blogs].sort((a, b) => b.views - a.views).slice(0, 4);
  const featuredBlogs = blogs.filter(blog => blog.featured);

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "from-gray-500 to-gray-600";
  };

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter(blog => blog.category === activeCategory);

  const getBlogLink = (heading) => {
    return `/blog/${heading.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/).join("-")}`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK */}
      {/* ============================================== */}
      <div className="relative overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/img/commonBanner/1.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0f0f0f]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10 py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase">
                  Our Journal
                </span>
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide uppercase">
                Gifting <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Insights</span>
              </h1>

              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                Discover the art of gifting, party inspiration, and heartfelt celebration stories from the VASP Planner team.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} className="text-amber-500" />
                <span className="text-amber-400">Blogs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* SECTION 2: FEATURED POSTS - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-16 md:py-20 bg-gray-50">

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full mb-4">
                <TrendingUp size={16} className="text-amber-500" />
                <span className="text-amber-600 text-sm font-medium">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured <span className="text-amber-500">Articles</span>
              </h2>
            </div>
            <Link
              href="#all-posts"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all mt-4 md:mt-0"
            >
              View All Posts
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Featured Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogs.map((blog, index) => (
              <Link
                key={blog.id}
                href={getBlogLink(blog.heading)}
                className={`group ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <div className={`relative rounded-3xl overflow-hidden h-full ${index === 0 ? "min-h-[400px] lg:min-h-[500px]" : "min-h-[250px]"}`}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(blog.category)} text-white text-xs font-medium rounded-full uppercase tracking-tighter`}>
                      {blog.category}
                    </span>
                  </div>

                  {/* Bookmark Icon */}
                  <div className="absolute top-4 right-4 text-white">
                    <Bookmark size={18} />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4 text-white/70 text-sm mb-3">
                      <span className="flex items-center gap-1 font-bold">
                        <Calendar size={14} className="text-amber-500" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1 font-bold">
                        <Clock size={14} className="text-amber-500" />
                        {blog.readTime}
                      </span>
                    </div>
                    <h3 className={`font-bold text-white group-hover:text-amber-300 transition-colors ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {blog.title}
                    </h3>
                    {index === 0 && (
                      <p className="text-gray-300 mt-3 line-clamp-2">{blog.para}</p>
                    )}
                    <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {blog.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {blog.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: CATEGORIES - DARK */}
      {/* ============================================== */}
      <section className="relative py-12 bg-[#0f0f0f] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-white/5 text-gray-400 border border-white/10 hover:border-amber-500/30 hover:text-amber-400"
                  }`}
              >
                {category.name}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${activeCategory === category.name ? "bg-white/20" : "bg-white/10"
                  }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 4: ALL BLOG POSTS - LIGHT */}
      {/* ============================================== */}
      <section id="all-posts" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100">
                  <BookOpen size={16} className="text-amber-600" />
                  <span className="text-amber-800 text-sm font-bold uppercase tracking-tight">
                    {activeCategory === "All" ? "Latest Articles" : activeCategory}
                  </span>
                </div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{filteredBlogs.length} articles found</span>
              </div>

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <article key={blog.id} className="group">
                    <Link href={getBlogLink(blog.heading)}>
                      <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`px-4 py-1.5 bg-gradient-to-r ${getCategoryColor(blog.category)} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg`}>
                              {blog.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta */}
                          <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-1">
                              <User size={12} className="text-amber-500" />
                              {blog.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-amber-500" />
                              {blog.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
                            {blog.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-6">
                            {blog.para}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                            <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold">
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-amber-500" />
                                {blog.readTime}
                              </span>
                            </div>
                            <span className="flex items-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                              Read Article
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 mt-16">
                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm">
                  <ChevronLeft size={20} />
                </button>
                {[1].map((page) => (
                  <button
                    key={page}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${page === 1
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-amber-500/20"
                      : "bg-white text-gray-600 hover:bg-amber-500 hover:text-white"
                      }`}
                  >
                    {String(page).padStart(2, '0')}
                  </button>
                ))}
                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2 space-y-8">
              {/* Search */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Search size={18} className="text-amber-500" />
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-inner"
                  />
                  <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 shadow-lg shadow-amber-500/5">
                <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                  <TrendingUp size={18} className="text-amber-600" />
                  Trending
                </h3>
                <div className="space-y-6">
                  {popularPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={getBlogLink(post.heading)}
                      className="flex items-start gap-4 group"
                    >
                      <span className="text-2xl font-black text-amber-500/20 group-hover:text-amber-500 group-hover:scale-110 transition-all">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <Eye size={10} className="text-amber-500" />
                            {post.views}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#0f0f0f] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-black/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-16 -mt-16" />
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                  <Sparkles size={24} className="text-black" />
                </div>
                <h3 className="font-black text-xl mb-3 uppercase tracking-tight">Stay Fresh</h3>
                <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                  Join our community for weekly celebration tips and exclusive gifting offers.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter email..."
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-all"
                  />
                  <button className="w-full px-5 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/20">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Tag size={18} className="text-gray-600" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Cakes", "Flowers", "Gifts", "Hampers", "Surprise", "Corporate", "Wedding", "Birthday"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-amber-400 hover:text-amber-600 cursor-pointer transition-all shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;