"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ArrowLeft,
  ArrowRight,
  Tag,
  BookOpen,
  Quote,
  Send,
  Bookmark,
  TrendingUp
} from "lucide-react";

export default function BlogInner({ currentBlog }) {
  const { author, category, date, para, title, imageUrl, link, heading } = currentBlog;

  const blogList = [
    {
      id: 1,
      title: "The Secret to Choosing the Perfect Birthday Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      date: "April 10, 2026",
      readTime: "5 min read",
      category: "Cakes"
    },
    {
      id: 2,
      title: "Why Fresh Flowers are the Ultimate Token of Love",
      image: "https://images.unsplash.com/photo-1522673607200-1648482ce486?w=800&q=80",
      date: "April 5, 2026",
      readTime: "7 min read",
      category: "Flowers"
    },
    {
      id: 3,
      title: "How Personalised Gifts Create Lasting Memories",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      date: "March 28, 2026",
      readTime: "6 min read",
      category: "Gifts"
    },
    {
      id: 4,
      title: "The Essential Guide to Corporate Gifting Etiquette",
      image: "https://images.unsplash.com/photo-1621535948301-1eec0b4d4580?w=800&q=80",
      date: "March 20, 2026",
      readTime: "8 min read",
      category: "Corporate"
    },
  ];

  const popularTags = ["Cakes", "Flowers", "Gifts", "Hampers", "Birthday", "Anniversary", "Corporate", "Celebration"];

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
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 pt-16 pb-24 md:pt-20 md:pb-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8 justify-center">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-700" />
              <Link href="/blog" className="text-gray-500 hover:text-white transition-colors">Blogs</Link>
              <ChevronRight size={14} className="text-gray-700" />
              <span className="text-amber-400 font-medium truncate max-w-[200px]">{heading}</span>
            </nav>

            {/* Category Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-full">
                <BookOpen size={14} className="text-violet-400" />
                <span className="text-violet-300 text-sm font-semibold">{category || "Ayurveda"}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 max-w-4xl mx-auto leading-tight">
              {heading || title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span>{author || "VASP Planner"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-400" />
                <span>{date || "January 31, 2025"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-blue-400" />
                <span>1.8K views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f8f9fa] rounded-t-[50px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 2: BLOG CONTENT - LIGHT */}
      {/* ============================================== */}
      <section className="relative py-8 md:py-12 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              {/* Featured Image */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden mb-8">
                <div className="relative h-[250px] sm:h-[350px] md:h-[450px]">
                  <Image
                    src={imageUrl?.toLowerCase() || "/img/blogs/shilajit.webp"}
                    alt={title || "Blog Image"}
                    fill
                    className="object-cover"
                  />
                  {/* Floating Stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white transition-all">
                        <Heart size={16} className="text-red-500" />
                        <span className="text-sm font-semibold">490</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white transition-all">
                        <MessageCircle size={16} className="text-blue-500" />
                        <span className="text-sm font-semibold">20</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-all">
                      <Bookmark size={16} />
                      <span className="text-sm font-semibold hidden sm:inline">Save</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-8 lg:p-10 mb-8">
                <article className="prose prose-lg max-w-none">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {title || heading}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {para || "At VASP Planner, we believe that every gift tells a story. Our mission is to help you celebrate life's most precious moments with premium products that exude love and care. From our hand-picked flowers to our gourmet cakes and bespoke hampers, we ensure that your emotions are delivered with perfection."}
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    Whether you are planning a surprise birthday party or expressing your gratitude to a corporate client, VASP Planner provides a seamless gifting experience. Our logistic network is optimized for speed and quality, ensuring that your gifts reach their destination fresh and on time, every single time.
                  </p>

                  {/* Blockquote */}
                  <div className="relative bg-gradient-to-br from-[#0c0c0c] to-gray-900 rounded-2xl p-6 md:p-8 my-8 overflow-hidden">
                    <div className="absolute top-4 left-4 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <Quote size={24} className="text-amber-400" />
                    </div>
                    <p className="text-white/90 italic text-base md:text-lg leading-relaxed pl-0 md:pl-16 pt-12 md:pt-0">
                      "Gifting is an art of expressing what words often fail to convey. At VASP Planner, we take this responsibility seriously, delivering joy and creating memories that last a lifetime through our dedicated service."
                    </p>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[60px]" />
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our commitment to excellence extends beyond our products. We prioritize transparency and reliability in every transaction. With real-time tracking, secure payments, and 24/7 customer support, we empower you to send love across distances with complete peace of mind.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
                    Why Choose VASP Planner?
                  </h3>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Freshest flowers sourced from premium farms",
                      "Gourmet cakes baked fresh for every order",
                      "Personalised gifts with high-quality printing",
                      "Express, Same-day, and Midnight delivery options",
                      "Premium packaging to ensure transit safety"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight size={14} className="text-black" />
                        </div>
                        <span className="text-gray-600 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-gray-100">
                  <Tag size={18} className="text-gray-400" />
                  {["Cakes", "Flowers", "Gifts", "Hampers"].map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-100 hover:bg-amber-100 hover:text-amber-600 text-gray-600 text-sm font-medium rounded-lg cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share & Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm font-medium">Share:</span>
                    {[
                      { icon: Facebook, color: "hover:bg-blue-500" },
                      { icon: Twitter, color: "hover:bg-sky-500" },
                      { icon: Linkedin, color: "hover:bg-blue-700" },
                      { icon: Link2, color: "hover:bg-gray-700" },
                    ].map((social, index) => (
                      <button key={index} className={`w-9 h-9 bg-gray-100 ${social.color} hover:text-white rounded-lg flex items-center justify-center transition-all`}>
                        <social.icon size={16} />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium text-sm transition-colors">
                      <ArrowLeft size={16} />
                      Prev
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium text-sm transition-colors">
                      Next
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Box */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-8 mb-8">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <User size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{author || "Dr. Ananya Verma"}</h4>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Author</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      Dr. Ananya Verma is an Ayurvedic practitioner who shares insights on natural healing and herbal remedies at VASP Planner. With over 15 years of experience in traditional medicine.
                    </p>
                    <div className="flex items-center gap-2">
                      {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                        <button key={index} className="w-8 h-8 bg-gray-100 hover:bg-violet-500 hover:text-white rounded-lg flex items-center justify-center text-gray-500 transition-all">
                          <Icon size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  Comments (2)
                </h3>

                {/* Comment List */}
                <div className="space-y-6 mb-8">
                  {[
                    {
                      name: "John Jones",
                      date: "January 24, 2025",
                      image: "/img/blogs/cmt1.webp",
                      comment: "VASP Planner has the best collection of birthday cakes! I recently ordered a chocolate truffle cake and it was delicious and delivered right on time.",
                      replies: [
                        {
                          name: "Steven Smith",
                          date: "January 24, 2025",
                          image: "/img/blogs/cmt2.webp",
                          comment: "VASP Planner exceeded my expectations! From start to finish, their service was outstanding. Highly recommended!"
                        }
                      ]
                    },
                    {
                      name: "John Doe",
                      date: "January 24, 2025",
                      image: "/img/blogs/cmt3.webp",
                      comment: "The packaging of the flowers was secure, delivery was prompt, and the freshness was noticeable. Thank you, VASP Planner for making the anniversary special!",
                      replies: []
                    }
                  ].map((comment, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                        <Image
                          src={comment.image}
                          alt={comment.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h5 className="font-bold text-gray-900">{comment.name}</h5>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">{comment.comment}</p>
                          <button className="text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies.map((reply, rIndex) => (
                        <div key={rIndex} className="flex gap-4 p-4 bg-violet-50 rounded-2xl ml-8 md:ml-12">
                          <Image
                            src={reply.image}
                            alt={reply.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h5 className="font-bold text-gray-900 text-sm">{reply.name}</h5>
                              <span className="text-xs text-gray-400">{reply.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{reply.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Leave a Comment</h4>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Your Email *"
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Website (optional)"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                    <textarea
                      rows={4}
                      placeholder="Write your comment..."
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all resize-none"
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-0.5"
                    >
                      <Send size={18} />
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-5 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  </button>
                </div>
              </div>

              {/* Trending Posts */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-violet-500" />
                  Trending Posts
                </h3>
                <div className="space-y-4">
                  {blogList.map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.title.toLowerCase().replace(/:/g, "").split(" ").join("-")}`}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-violet-50 transition-colors group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-1 left-1 text-white text-[10px] font-bold">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-violet-600 transition-colors">
                          {blog.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                          <Calendar size={12} />
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-violet-500" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Cakes", count: 12 },
                    { name: "Flowers", count: 8 },
                    { name: "Personalised", count: 6 },
                    { name: "Hampers", count: 5 },
                    { name: "Corporate Gifting", count: 9 },
                  ].map((cat, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-violet-50 hover:text-violet-600 transition-colors group"
                    >
                      <span className="font-medium text-sm">{cat.name}</span>
                      <span className="px-2 py-1 bg-gray-200 group-hover:bg-violet-500 group-hover:text-white text-xs font-bold rounded-lg transition-colors">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag size={18} className="text-violet-500" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-600 hover:text-white text-gray-600 text-sm font-medium rounded-lg cursor-pointer transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#0c0c0c] to-gray-900 rounded-2xl p-6 text-center overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-[50px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/20 rounded-full blur-[40px]" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Send size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Subscribe Newsletter</h4>
                  <p className="text-gray-400 text-sm mb-4">Get the latest wellness tips delivered to your inbox</p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 mb-3"
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: RELATED POSTS - DARK */}
      {/* ============================================== */}
      <section className="relative py-16 bg-[#0c0c0c] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <BookOpen size={14} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">Keep Reading</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Related <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Articles</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogList.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.title.toLowerCase().replace(/:/g, "").split(" ").join("-")}`}
                className="group bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-violet-500/30 transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-violet-500 text-white text-xs font-bold rounded-lg">
                    {blog.category}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}