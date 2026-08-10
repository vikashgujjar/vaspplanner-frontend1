"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineArrowForwardIos, MdOutlineShoppingBag } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { RiCloseLargeFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import SearchProduct from "./SearchProduct";

export default function Nav() {
  const cart = useSelector((state) => state.cart.cartItem || []);

  const totalCartItem = cart.reduce((accum, curVal) => accum + (curVal.qnty || 0), 0);

  const navItems = [
    {
      title: "Birthday",
      link: "/category/birthday",
      listImg: [
        {
          img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400&auto=format&fit=crop",
          title: "Birthday Cakes",
          link: "/category/cakes",
        },
        {
          img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=400&auto=format&fit=crop",
          title: "Birthday Balloons",
          link: "/category/balloon-decor",
        },
      ],
      subcategories: [
        { title: "Cakes", link: "/category/cakes" },
        { title: "Flowers", link: "/category/flowers" },
        { title: "Combos", link: "/category/all-products" },
        { title: "Decorations", link: "/category/balloon-decor" },
      ],
    },
    {
      title: "Flowers",
      link: "/category/flowers",
      listImg: [
        {
          img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=400&auto=format&fit=crop",
          title: "Roses",
          link: "/category/flowers",
        },
        {
          img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400&auto=format&fit=crop",
          title: "Lilies",
          link: "/category/flowers",
        },
      ],
      subcategories: [
        { title: "Roses", link: "/category/flowers" },
        { title: "Lilies", link: "/category/flowers" },
        { title: "Mixed Flowers", link: "/category/flowers" },
        { title: "Orchids", link: "/category/flowers" },
      ],
    },
    {
      title: "Occasions",
      link: "/category/occasions",
      subcategories: [
        { title: "Birthday", link: "/category/birthday" },
        { title: "Anniversary", link: "/category/anniversary" },
        { title: "Valentine's", link: "/category/valentines" },
        { title: "International", link: "/category/international" },
      ],
    },
    { title: "Cakes", link: "/category/cakes" },
    { title: "Personalised", link: "/category/personalised" },
    { title: "Plants", link: "/category/plants" },
    { title: "Balloon Decor", link: "/category/balloon-decor" },
    { title: "Chocolates", link: "/category/chocolates" },
    { title: "Luxe", link: "/category/luxe" },
    { title: "Hampers", link: "/category/hampers" },
    { title: "Lifestyle", link: "/category/lifestyle" },
    { title: "About", link: "/about" },
    { title: "Contact us", link: "/contact-us" },
  ];
  const navLinks = ["About", "products", "Blogs", "Contact us"];
  const [currentTab, setCurrentTab] = useState(null);

  const [hoveredSub, setHoveredSub] = useState(null);

  const NavHover = ({ elm }) => {
    return (
      <>
        <div className="flex justify-between items-start p-5">
          <ul className="space-y-4">
            {elm.subcategories?.map((sub, index) => (
              <li
                key={index}
                className="text-gray-700 hover:bg-[#b4a4b437]  px-4 hover:text-black cursor-pointer"
                onMouseEnter={() => setHoveredSub(sub)}
              >
                <Link href={sub.link}>{sub.title}</Link>
              </li>
            ))}
          </ul>

          {!hoveredSub ? (
            <div className="flex gap-x-4">
              {elm.listImg?.map((imgItem, imgIndex) => (
                <Link
                  href={imgItem.link}
                  key={imgIndex}
                  className="text-center"
                >
                  <img
                    src={imgItem.img}
                    alt={imgItem.title}
                    className="w-36 h-36 object-cover"
                  />
                  <p>{imgItem.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex gap-x-4">
              {hoveredSub &&
                (() => {
                  const key = Object.keys(hoveredSub).find(
                    (k) => k !== "title" && k !== "link"
                  );

                  return key && hoveredSub[key]?.list ? (
                    <div className="flex gap-x-4">
                      {hoveredSub[key].list.map((imgItem, imgIndex) => (
                        <Link
                          href={imgItem.link}
                          key={imgIndex}
                          className="text-center"
                        >
                          <img
                            src={imgItem.img}
                            alt={imgItem.title}
                            className="w-36 h-36 object-cover"
                          />
                          <p>{imgItem.title}</p>
                        </Link>
                      ))}
                    </div>
                  ) : null;
                })()}
            </div>
          )}
        </div>
      </>
    );
  };

  const [sideBarToogle, setSideBarToggle] = useState(false);

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: "0%" },
  };

  const [phoneNavDropDownTab, setphoneNavDropDownTab] = useState();


  const SideBar = () => {
    return (
      <div

        className={`${sideBarToogle ? "translate-x-0" : "-translate-x-full"} 
  w-screen h-full fixed top-0 left-0 z-[100] lg:hidden bg-black/50 lg:bg-[rgba(0,0,0,.7)] 
  transition-transform duration-700 ease-in-out`}
      >
        <div className="px-5 md:px-12 h-full md:w-[400px] bg-[#000] text-white shadow-lg">
          <ul className="space-y-5 pt-24 md:pt-24 uppercase text-sm text-center">
            {navItems.map((elm) => (
              <li key={elm.title} className="relative text-2xl">
                <div
                  onClick={(e) => {
                    // If this item has subcategories, toggle dropdown only.
                    if (elm.subcategories) {
                      e.stopPropagation();
                      setphoneNavDropDownTab((prev) =>
                        prev === elm.title ? "" : elm.title
                      );
                    }
                  }}
                  className="flex items-center gap-x-4"
                >
                  {/* 
              If the item has a link and no subcategories (i.e. it's a direct link),
              clicking should close the sidebar.
            */}
                  {elm.link && !elm.subcategories ? (
                    <Link
                      href={elm.link}
                      onClick={() => setSideBarToggle(false)}
                    >
                      {elm.title}
                    </Link>
                  ) : (
                    <span>{elm.title}</span>
                  )}

                  {!navLinks.includes(elm.title) && (
                    <MdOutlineArrowForwardIos
                      className={`${phoneNavDropDownTab === elm.title ? "rotate-90" : "rotate-0"
                        } transition-transform duration-300 ease-in-out`}
                    />
                  )}
                </div>
                {phoneNavDropDownTab === elm.title && (
                  <div className="flex justify-center">
                    <ul className="mt-3 flex flex-col items-start">
                      {elm.subcategories?.map((sub, index) => (
                        <li key={index} className="text-xl">
                          <Link
                            href={sub.link}
                            onClick={() => setSideBarToggle(false)}
                          >
                            {sub.title}
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
      </div>

    );
  };

  const userLinkList = [
    {
      link: "/user/login",
      name: "login",
    },
    {
      link: "/user/sign-up",
      name: "sign-up",
    },
    {
      link: "/user/profile",
      name: "profile",
    },
  ];

  const UserLinks = () => {
    return (
      <ul
        onMouseLeave={() => setUserLinkToggle(false)}
        className="bg-white shadow-lg rounded-lg w-[150px] p-2 absolute -right-10 top-8 border border-gray-300"
      >
        {userLinkList.map((elm, index) => (
          <li key={index} className="px-4 py-2 hover:bg-gray-100 rounded-md">
            <Link
              href={elm.link}
              className="block uppercase text-gray-700 text-base"
            >
              {elm.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const [userLinkToggle, setUserLinkToggle] = useState(false);

  const [changeNavBg, setChangeNavBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setChangeNavBg(true);
      } else {
        setChangeNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const pathName = usePathname();

  const [searchtoggle, setSearchToogle] = useState(false);


  return (
    <>
      <header
        className={`top-0 w-full z-[200] py-3 transition-all duration-300 mx-auto conatiner ${pathName === "/"
          ? changeNavBg
            ? " bg-black text-white shadow-2xl"
            : " bg-black text-white hover:text-white hover:bg-[#000] hover:shadow-2xl"
          : " bg-black shadow-2xl text-white  "
          }`}
      >
        {" "}
        <div className="px-5 md:px-12 xl:px-32 flex justify-between items-center relative container mx-auto">
          <Link href="/" className="">
            <img src="/img/newLoog.png" alt="logo" className="w-16 h-16 " />
          </Link>

          <ul className="hidden lg:flex  gap-x-5 absolute left-[50%] -translate-x-[50%]">
            {navItems.map((elm, ind) => (
              <div
                key={ind}
                className=" group"
                onMouseEnter={() => setCurrentTab(elm.title)}
                onMouseLeave={() => setCurrentTab(null)}
              >
                <li className="flex items-center uppercase gap-x-1 text-sm lg:text-nowrap ">
                  <Link href={elm.link}>{elm.title}</Link>
                  {!navLinks.includes(elm.title) && (
                    <IoIosArrowDown className="group-hover:rotate-180 transition-transform" />
                  )}
                </li>

                {!navLinks.includes(elm.title) && (
                  <div
                    className={`absolute z-10 top-[54px] -left-[100px] w-[800px] duration-500 transition-all ${elm.title === currentTab ? "h-[200px] " : "h-0"
                      } bg-white    shadow-lg overflow-hidden`}
                  >
                    <NavHover elm={elm} />
                  </div>
                )}
              </div>
            ))}
          </ul>

          <ul className="flex relative items-center gap-x-4 text-3xl sm:text-2xl font-normal">
            <button
              className="cursor-pointer text-3xl lg:text-2xl font-bold"
              onClick={() => setSearchToogle(!searchtoggle)}
            >
              <IoIosSearch />
            </button>
            <div className="relative hidden lg:block">
              <button
                onMouseEnter={() => setUserLinkToggle(true)}
                className="relative flex items-center justify-center"
              >
                <FaRegUser className="hidden lg:block  text-3xl lg:text-2xl cursor-pointer" />
                {userLinkToggle && <UserLinks />}
              </button>
            </div>

            <Link href="/cart" className="relative">
              <div className="relative">
                <MdOutlineShoppingBag className="text-3xl lg:text-2xl" />
                {totalCartItem > 0 && (
                  <span className="absolute p-2 lg:p-2 -top-1 -right-3 lg:-right-4 bg-red-600 text-white text-xs font-bold w-6 h-6  lg:text-xs flex items-center justify-center rounded-full">
                    {totalCartItem}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={() => setSideBarToggle(!sideBarToogle)}
              className="text-2xl md:text-3xl lg:hidden duration-200"
            >
              {sideBarToogle ? <RiCloseLargeFill /> : <HiMenu />}
            </button>
          </ul>
        </div>
      </header>

      {/* {sideBarToogle && <SideBar />} */}
      <SideBar />

      {searchtoggle && <SearchProduct setSearchToogle={setSearchToogle} />}
    </>
  );
}
