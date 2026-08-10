


"use client";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const showcaseData = [
  {
    title: "Sale 20% Off",
    topheading: "EXPRESS BLOOMS",
    subtitle: "Fresh Red Roses Bouquet",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800",
    buttonText: "Shop Flowers",
    description:
      "Nothing says love like a bouquet of freshly picked red roses. Perfect for anniversaries or surprises, delivered within 2 hours.",
  },
  {
    title: "Sale 68% Off ",
    topheading: "  REVIVE NATURALLY.",
    subtitle: "Premium Safed Musli Extract",
    image: "/img/ShowCase/Musli.webp",

    buttonText: "Read More",
    description:
      "Morbi eget congue lectus. Donec eleifend ultricies urna et euismod. Sed consectetur tellus eget odio aliquet, vel vestibulum tellus sollicitudin.",
  },
  {
    title: "New Arrival",
    topheading: "PERSONALIZED JOY",
    subtitle: "Custom Photo Coffee Mugs",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
    buttonText: "Personalize Now",
    description:
      "Turn your favorite memories into lasting keepsakes with our custom photo mugs. A thoughtful gift that adds a personal touch to every sip.",
  },
  {
    title: "Holiday Offer",
    topheading: "CURATED HAMPERS",
    subtitle: "Premium Gift Baskets",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800",
    buttonText: "View Hampers",
    description:
      "Explore our luxury hampers featuring chocolates, dry fruits, and gourmet treats. Perfect for corporate gifting or festive celebrations.",
  },
  {
    title: "Kids Special",
    topheading: "ADORABLE COMPANIONS",
    subtitle: "Cuddly Teddy Bears",
    image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800",
    buttonText: "Shop Teddies",
    description:
      "Soft, cuddly, and perfect for a warm hug. Our collection of premium plush toys is the perfect addition to any gift combo.",
  },



];

export default function ShowCase() {
  const [showIndex, setShowIndex] = useState(0);

  useEffect(() => {
    const interId = setInterval(() => {
      setShowIndex((prev) => (prev >= showcaseData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interId);
  }, []);

  return (
    <div className="lg:pl-20 xl:pl-32">
      <div
        className="relative bg-gray-100 lg:bg-transparent lg:bg-[url(/img/ShowCase/bg-new.webp)] lg:rounded-l-full   h-[75vh] md:h-[80vh] my-10 lg:my-20   ">
        {showcaseData.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${showIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              } flex flex-col lg:flex-row text-center lg:text-start items-start lg:items-center gap-4 lg:gap-x-10 justify-center py-5 lg:py-16 px-5 md:px-12 lg:px-0 xl:pl-0`}
          >
            <div
              className="mx-auto lg:mx-0 h-[250px] w-[250px] xl:h-[500px] md:h-[170px] md:w-[170px] lg:w-[300px] lg:h-[300px]  xl:w-[38%] bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="w-full lg:w-[50%] space-y-5">
              <h6 className="text-white text-lg lg:text-xl relative">
                {item.topheading}
                <img
                  src="/img/ShowCase/shape2.png"
                  alt="showCase"
                  className="absolute inset-0 -top-2 left-0 md:left-[28%] lg:-top-2 lg:-left-2 xl:-left-4 -z-10"
                />
              </h6>
              <h5 className="text-black font-bold text-2xl md:text-4xl xl:text-5xl font-serif">
                {item.title}
              </h5>
              <h5 className="text-black font-bold   text-2xl lg:text-4xl xl:text-5xl font-serif">
                All <span className="text-[#7DC243]">{item.subtitle && item.subtitle}</span>

              </h5>
              <p className="text-base md:text-lg">{item.description}</p>
              <button className="flex mx-auto lg:mx-0 group items-center gap-x-2 px-5 py-2 lg:px-8 bg-[#7DC243] text-white font-bold rounded-3xl">
                {item.buttonText}
                <FaLongArrowAltRight className="group-hover:translate-x-2 duration-200 ease-in transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
