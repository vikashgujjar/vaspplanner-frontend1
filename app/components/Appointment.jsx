import React from "react";
import Link from "next/link";
export default function Appointment() {
  return (
    <div className="bg-[#F3F1EC] py-10 xl:py-16">
      <div className="container mx-auto px-5 md:px-12 xl:px-32 flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
        {/* Main Image */}
        <img
          src="/img/appointment/1.webp"
          alt=""
          className="w-full md:h-[400px] md:object-center lg:h-auto lg:w-[40%] object-cover"
        />

        <div className="flex flex-col justify-between w-full  space-y-4">
          <h5 className="text-2xl md:text-3xl lg:text-6xl capitalize text-center lg:text-left">
            At the comfort <br className="hidden lg:block" />
            <span className="lg:text-7xl italic">of your home</span>
          </h5>

          <div className="flex flex-col lg:flex-row  gap-x-16 items-center lg:items-start">
            <img
              src="/img/appointment/2.webp"
              className="w-full md:w-40 md:hidden lg:block lg:w-[30%] lg:-ml-36"
              alt=""
            />
            <div className="w-full mt-4 md:mt-0 lg:w-[60%] text-center lg:text-left px-4 lg:px-0">
              <p className="text-base">
                Discover your perfect piece with our at-home try-on service.
                We'll bring our finest category to your doorstep, so you can explore premium designs in the comfort of your home.
                Try before you buy, experience unmatched craftsmanship, and find the perfect fit—hassle-free and tailored just for you!
              </p>
              <Link href="/contact-us" className="bg-[#173842] inline-block px-4 py-2 text-white mt-3 rounded">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
