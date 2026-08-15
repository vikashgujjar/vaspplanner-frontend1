"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// swiper/css is imported globally in app/globals.css
import { TbDeviceVisionProFilled } from "react-icons/tb";
import { IoEarthSharp } from "react-icons/io5";
import { BsCupHot } from "react-icons/bs";

// Card data array
const whyChooseData = [
  {
    id: 1,
    title: "Freshness Guaranteed",
    description:
      "From handpicked flowers to freshly baked cakes, we ensure the highest quality for every order.",
    image: "/img/whychoose/1.webp",
  },
  {
    id: 2,
    title: "Express Delivery",
    description:
      "Surprise your loved ones with same-day, 2-hour, or midnight delivery across major cities.",
    image: "/img/whychoose/2.webp",
  },
  {
    id: 3,
    title: "Personalized Touch",
    description:
      "Add a personal flair to your gifts with custom messages, photos, and unique wrapping options.",
    image: "/img/whychoose/3.webp",
  },
  {
    id: 4,
    title: "Wide Variety",
    description:
      "Explore a massive collection of flowers, cakes, chocolates, teddies, and bespoke gift hampers.",
    image: "/img/whychoose/4.webp",
  },
  {
    id: 5,
    title: "Secure Payments",
    description:
      "Shop with confidence using our secure and multiple payment options for a hassle-free experience.",
    image: "/img/whychoose/5.webp",
  },
  {
    id: 6,
    title: "Dedicated Support",
    description:
      "Our team is always ready to assist you in making your gifting experience smooth and joyful.",
    image: "/img/whychoose/6.webp",
  },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const WhyChoose = ({ initialData = null }) => {
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/home/why-choose-us`);
          const json = await res.json();
          if (json.success && json.data) {
            setData(json.data);
          }
        } catch (err) {
          console.error("Failed to fetch why-choose-us data:", err);
        }
      };
      fetchData();
    }
  }, [initialData]);

  const items = data?.items?.length > 0 ? data.items : [];
  const bannerImage = data?.banner || "/img/about/abouthero.webp";
  const subTitle = data?.sub_title || "Why Choose";
  const title = data?.title || "VASP Planner";

  return (
    <div className="w-full pb-10 lg:py-16">
      <div className="text-center mb-10 px-6">
        <p className="text-xl text-gray-800">{subTitle}</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl italic text-gray-900">
          {title}
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-10 xl:px-24 py-5 lg:py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start lg:items-center">
        <div className="left text-base md:text-lg space-y-5 leading-relaxed text-gray-700">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <div key={item.id || idx} className="flex flex-col lg:flex-row items-center text-center lg:text-start lg:items-start gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-tl-2xl bg-[#7DC243] flex items-center justify-center text-white shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <TbDeviceVisionProFilled className="text-xl lg:text-3xl" />
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-y-1 lg:gap-2">
                  <h5 className="font-semibold text-xl lg:text-2xl text-gray-800">
                    {item.title}
                  </h5>
                  <p className="text-gray-500 text-base lg:text-lg leading-relaxed text-pretty">
                    {item.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col lg:flex-row items-center text-center lg:text-start lg:items-start gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-tl-2xl bg-[#7DC243] flex items-center justify-center text-white shrink-0">
                  <TbDeviceVisionProFilled className="text-xl lg:text-3xl" />
                </div>

                <div className="flex-1 flex flex-col gap-y-1 lg:gap-2">
                  <h5 className="font-semibold text-xl lg:text-2xl text-gray-800">
                    Our Vision
                  </h5>
                  <p className="text-gray-500 text-base lg:text-lg leading-relaxed text-pretty">
                    To be the top choice for gifting in India, connecting people
                    through heartfelt surprises and exceptional delivery experiences
                    for every occasion.
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center text-center lg:text-start lg:items-start gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-tl-2xl bg-[#7DC243] flex items-center justify-center text-white shrink-0">
                  <IoEarthSharp className="text-xl lg:text-3xl" />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h5 className="font-semibold text-lg lg:text-xl text-gray-800">
                    Our Mission
                  </h5>
                  <p className="text-gray-500 text-base lg:text-lg leading-relaxed text-pretty">
                    To provide a wide range of premium gifts, fresh flowers, and
                    decadent cakes with seamless delivery options, helping you
                    celebrate life’s special moments with ease.
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center text-center lg:text-start lg:items-start gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-tl-2xl bg-[#7DC243] flex items-center justify-center text-white shrink-0">
                  <BsCupHot className="text-xl lg:text-3xl" />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h5 className="font-semibold text-lg lg:text-xl text-gray-800">
                    Our Motto
                  </h5>
                  <p className="text-gray-500 text-base lg:text-lg leading-relaxed text-pretty">
                    Creating smiles, one gift at a time. We prioritize freshness,
                    punctuality, and customer satisfaction in all our gifting
                    solutions.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="right">
          <img
            src={bannerImage}
            alt={title}
            className="w-full rounded-xl border border-gray-200 shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
