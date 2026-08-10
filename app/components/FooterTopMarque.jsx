import React from "react";
import Marquee from "react-fast-marquee";

export default function FooterTopMarque() {
  return (
    <div className="bg-[#000]  overflow-y-hidden">
      <div className="container mx-auto text-gray-200 py-5 text-4xl xl:text-5xl  ">
        <Marquee speed={50} gradient={false} pauseOnHover>
          <span className="mx-6 font-semibold">
            ✨ Elevate Your Elegance with Timeless Jewelry..
          </span>
          <span className="mx-6 font-semibold">
            ✨ Discover the Beauty of Handcrafted Designs..
          </span>
          <span className="mx-6 font-semibold">
            ✨ Unveil the Charm of Exquisite Pieces..
          </span>
          <span className="mx-6 font-semibold">
            ✨ Adorn Yourself with Unique Creations..
          </span>
        </Marquee>
      </div>
    </div>
  );
}
