"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  ShieldCheck,
  ChevronDown,
  Heart
} from "lucide-react";
import LanguagePop from "./LanguagePop";
import { useSelector } from "react-redux";

export default function TopBar() {
  const [langPop, setLangPop] = useState(false);

  const wishList = useSelector((state) => state.wish.wishlist);

  return (
    <>
      {langPop && <LanguagePop langPop={langPop} setLangPop={setLangPop} />}

      <div>
        <div className="bg-[#7DC243] text-center text-sm text-white py-2">
          SAFETY FIRST: BIGGER PROTECTION FOR A BRIGHTER FUTURE!
        </div>

        <div className="px-5 md:px-12 xl:px-32 hidden xl:flex justify-between border-b py-2 border-gray-200">
          <ul className="flex items-center gap-x-4 text-sm">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            {/* <li><Link href="#compare">Compare</Link></li> */}
            <li className="relative">
              <Link href="/wishlist">Wishlist</Link>
              <span className="absolute -top-2">
                {/* <LuMessageCircleHeart  className="text-[#7DC243] text-lg lg:text-xl"  /> */}
                <span className="bg-[#7DC243] text-white text-xs absolute -right-5 top-2 rounded-full w-4 h-4 flex items-center justify-center ">
                  {wishList.length}
                </span>
              </span>
            </li>
          </ul>

          <ul className="flex items-center gap-x-4 text-sm">
            <li className="flex items-center gap-x-2">
              <ShieldCheck size={16} />
              <span>100% Secure delivery without contacting the courier</span>
            </li>

            <li>
              <span className="border-l-2 h-6 mx-3 border-gray-200"></span>
            </li>

            <li>
              <a href="tel:+91-123456789" className="text-[#7DC243]">
                Need help? Call Us: <span>+91-123456789</span>
              </a>
            </li>

            <li>
              <span className="border-l-2 h-6 mx-3 border-gray-200"></span>
            </li>

            <li className="flex items-center gap-x-4">
              <button
                onClick={() => setLangPop(true)}
                className="flex items-center gap-x-1 text-sm"
              >
                <span>English</span>
                <ChevronDown
                  size={14}
                  className={`${langPop ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              <button className="flex items-center gap-x-1 text-sm">
                <span>USD</span>
                <ChevronDown size={14} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
