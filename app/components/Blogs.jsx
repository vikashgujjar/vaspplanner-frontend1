"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const json = await res.json();
        if (json.success) {
          setBlogs(json.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading || blogs.length === 0) return null;

  return (
    <div className="latest-blogs relative z-10 py-16 md:py-24 bg-gray-50/30">
      <div className="text-center px-5 md:px-12 xl:px-32 w-full lg:w-[70%] mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 text-amber-600 shadow-sm border border-amber-100">
           <span className="text-xs font-bold uppercase tracking-widest">Our Journal</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
          Latest <span className="text-amber-500">Insights</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Stay updated with gifting trends, celebration tips, and heartwarming stories from the VASP Planner community.
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {blogs.map((item, index) => {
          const blogSlug = item.slug;
          // Alternate layout pattern for visual interest
          const isFlipped = index % 2 === 1;

          return (
            <div key={item.uuid} className={`group relative bg-white border border-gray-100 flex h-full ${isFlipped ? 'flex-col-reverse lg:flex-col-reverse' : 'flex-col'}`}>
              <Link href={`/blogs/${blogSlug}`} className="block aspect-[4/3] overflow-hidden">
                <img src={item.image || "/placeholder.png"} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </Link>
              <div className="p-8 space-y-4 flex flex-col items-center text-center flex-grow">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  {item.category || "Lifestyle"}
                </span>
                <Link href={`/blogs/${blogSlug}`}>
                  <h3 className="font-bold text-xl md:text-2xl text-gray-900 group-hover:text-amber-600 transition-colors leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-x-4">
                  <p className="flex items-center gap-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <FaCalendarAlt className="text-amber-500" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center gap-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <FaComments className="text-amber-500" />
                    <span>{item.comments_count || 0} comments</span>
                  </p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {item.short_description || item.description?.substring(0, 100)}...
                </p>
                <Link href={`/blogs/${blogSlug}`} className="pt-4 mt-auto text-xs font-black uppercase tracking-widest text-gray-900 hover:text-amber-600 transition-all flex items-center gap-2">
                   Read Full Article <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
