"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// swiper/css is imported globally in app/globals.css
// Custom prev/next buttons are used via prevEl/nextEl refs, so Swiper's
// own default nav-button CSS is never rendered — no need to import it.
import { ChevronLeft, ChevronRight,  } from "lucide-react";
import Link from "next/link";

const Beauty = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-[#F3F1EC] mb-8">
      <div className="px-5 md:px-12 xl:px-32 relative  container mx-auto">
        <button
          ref={prevRef}
          className="absolute hidden  lg:block left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          ref={nextRef}
          className="absolute hidden lg:block right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight size={24} />
        </button>

        <Swiper
          loop={true}
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper && swiper.params && swiper.params.navigation && prevRef.current && nextRef.current) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                if (swiper.navigation) {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }
            });
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-4"
        >
          {[
            {
              img: "/img/beauty/beauty1.webp",
              title: "Contact Us",
              link:"/contact-us",
              text: "Have any questions? Get in touch, and we’ll assist you right away.",
              button: "Learn More",
            },
            {
              img: "/img/beauty/beauty2.webp",
              title: "Visit Our Stores",
              link:"/about",

              text: "Explore our stunning jewelry collection in person at our stores.",
              button: "Locate Store",
            },
            {
              img: "/img/beauty/beauty3.webp",
              title: "Try At Home",
              text: "Experience luxury at home with our hassle-free Try at Home .",
              button: "Book Appointment",
              link:"tel:+91 9448387231",
            },
          ].map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                href={item.link}                style={{ background: `url(${item.img})` }}
                className={`relative   text-white flex flex-col items-center text-center shadow-lg rounded-lg overflow-hidden md:m-5 md`}
              >
                <div className="p-8 flex-grow relative z-20 ">
                  <h2 className="text-2xl lg:text-3xl font-serif ">
                    {item.title.split(" ")[0]}{" "}
                    <span className="not-italic">
                      {item.title.split(" ")[1]}
                    </span>{" "}
                    <span className="not-italic">
                      {item.title.split(" ")[2]}
                    </span>
                  </h2>
                  <p className="mt-4 ">{item.text}</p>
                  <button className="mt-6 bg-[#1D3B3F] cursor-pointer text-white py-2 px-6 rounded-lg transition hover:bg-[#14292C]">
                    {item.button}
                  </button>
                </div>
                <div className="absolute bg-black/40 inset-0 " />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Beauty;
