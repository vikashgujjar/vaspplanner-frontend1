import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const BlogLeft = () => {
  return (
    <>
      <aside>
        <div className="widget mb-6 custom-shadow bg-white">
          <h3
            className="widget-title relative text-[20px] mb-0 bg-[#073439] px-5 py-2 text-white capitalize"
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Search Now
          </h3>
          <div className="post-wrap p-5">
            <form className="search-form relative ">
              <label className="sr-only">Search for:</label>
              <input
                type="search"
                className="bg-transparent h-12 p-1.5 pl-4 border border-gray-200 focus:border-[#7dc243] focus:outline-none w-full block outline-none transition duration-500"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="absolute right-0 bottom-0 h-12 w-12 border-none text-white bg-[#073439]  transition duration-500 outline-none cursor-pointer flex items-center justify-center"
              >
                <IoSearchOutline />
              </button>
            </form>
          </div>
        </div>

        <section className="widget widget-peru-posts-thumb mb-6 custom-shadow">
          <h3
            className="widget-title relative text-[20px] mb-0 bg-[#073439] px-5 py-2 text-white capitalize"
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Popular Posts
          </h3>

          <div className="post-wrap p-5">
            {[
              {
                date: "April 10, 2025",
                title:
                  "Unlock Natural Vitality with VASP Planner's Premium Shilajit",
                bg: "shilajit",
                img: "/img/BlogLeft/1.webp",
              },
              {
                date: "April 11, 2025",
                title:
                  "Boost Strength and Immunity with Safed Musli from VASP Planner",
                bg: "safed-musli",
                img: "/img/BlogLeft/2.webp",

              },
              {
                date: "April 12, 2025",
                title: "VASP Planner’s Ashwagandha – The Stress-Buster You Need",
                bg: "ashwagandha",
                img: "/img/BlogLeft/3.webp",

              },

              {
                date: "April 14, 2025",
                title:
                  "Keeda Jadi (Cordyceps) – Nature’s Energy Booster from VASP Planner",
                bg: "keeda-jadi",
                img: "/img/BlogLeft/4.webp",

              },
            ].map((post, index, arr) => (
              <article
                key={index}
                className={`items-center flex  pb-2.5 ${index !== arr.length - 1
                  ? "border-b border-[#efefef] mb-2.5"
                  : ""
                  }`}
              >
                <Link href={`/blogs/${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/).join("-")}`}>
                  <div
                    className="thumb w-16 h-16 lg:w-20 lg:h-20 overflow-hidden bg-gray-300 rounded mr-4"

                  >
                    <img src={`${post.img}`} alt={post.date} className="h-full w-full rounded" />
                    {/* <span className="fullimage cover" role="img"></span> */}
                  </div>
                </Link>
                <div className="info">
                  <time
                    dateTime={post.date}
                    className="search-field text-[13px] text-[#929292] mb-1 block "
                  >
                    {post.date}
                  </time>
                  <h4 className="usmall text-base lg:text-lg font-semibold ">
                    <Link href={`/blogs/${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/).join("-")}`} className="text-[#474c40]">
                      {post.title}
                    </Link>
                  </h4>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Archives */}
        <section className="widget widget_categories mb-6 custom-shadow">
          <h3
            className="widget-title relative text-[20px] mb-0 bg-[#073439] px-5 py-2 text-white capitalize"
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Archives
          </h3>
          <ul className="post-wrap p-5">
            {[
              { month: "January", year: "2021" },
              { month: "February", year: "2021" },
              { month: "March", year: "2021" },
              { month: "April", year: "2021" },
              { month: "May", year: "2021" },
              { month: "June", year: "2021" },
            ].map(({ month, year }, index, arr) => (
              <li
                key={index}
                className={`relative pb-2.5  pl-[18px] before:absolute before:left-0 before:top-2 before:w-[7px] before:h-[7px] before:bg-[#7dc243] before:content-['']  ${index !== arr.length - 1
                  ? "border-b border-[#efefef] mb-2.5"
                  : ""
                  }`}
              >
                <Link
                  href="/"
                  passHref
                  className="flex justify-between text-[#666666]   text-sm lg:text-base"
                >
                  <p className="">{month}</p>
                  <span className="">{year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Categories */}
        <section className="widget widget_categories mb-6 custom-shadow">
          <h3
            className="widget-title relative text-[20px] mb-0 bg-[#073439] px-5 py-2 text-white capitalize"
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Categories
          </h3>

          <ul className="post-wrap p-5">
            {[
              { category: "Herbal Supplements", count: "(14)" },
              { category: "Immunity Boosters", count: "(9)" },
              { category: "Men's Health", count: "(11)" },
              { category: "Natural Energy", count: "(7)" },
              { category: "Vitality & Strength", count: "(12)" },
              { category: "Wellness Products", count: "(10)" },
            ].map(({ category, count }, index, arr) => (
              <li
                key={index}
                className={`relative pb-2.5  pl-[18px] before:absolute before:left-0 before:top-2 before:w-[7px] before:h-[7px] before:bg-[#7dc243] before:content-['']  ${index !== arr.length - 1
                  ? "border-b border-[#efefef] mb-2.5"
                  : ""
                  }`}
              >
                <Link
                  href="/"
                  passHref
                  className="flex justify-between text-[#666666] text-sm lg:text-base"
                >
                  <p className="">{category}</p>
                  <span className="">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <section className="widget widget_tag_cloud custom-shadow">
          <h3
            className="widget-title relative text-[20px] mb-0 bg-[#073439] px-5 py-2 text-white capitalize"
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Tags
          </h3>

          <div className="tagcloud p-5">
            {[
              { name: "Shilajit", count: 12 },
              { name: "Safed Musli", count: 8 },
              { name: "Ashwagandha", count: 10 },
              { name: "Kesar", count: 6 },
              { name: "Keeda Jadi", count: 4 },
            ].map((tag, index) => (
              <Link
                href={`/`}
                key={index}
                className="inline-block text-gray-600 font-normal text-sm lg:text-base py-2 px-3 border border-dashed border-gray-200 mt-2 mr-2 hover:bg-[#7DC243] hover:text-white"
              >
                {tag.name} ({tag.count})
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
};

export default BlogLeft;
