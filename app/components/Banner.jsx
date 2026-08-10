"use client"; // Ensures it runs on the client in Next.js App Router

import React from "react";

const Banner = () => {
  const BannerList=[
    { 
      id:1,
      img:"/img/banner/hot1.webp",
      name:'banner1'
    },
    { 
      id:2,
      img:"/img/banner/hot2.webp",
      name:'banner1'

    },
    { 
      id:3,
      img:"/img/banner/hot3.webp",
      name:'banner1'

    }
  ]
  return (
    <div className="w-full bg-[#F3F1EC] pb-10 md:py-10 ">  
      <div className="text-center mb-10  px-6">
        <p className="text-xl text-gray-800">Hot Deals</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl  italic text-gray-900">Vajra Jewels Diamond Jewellery</h2>
      </div>

   <div className="container mx-auto px-5 md:px-12 xl:px-32">
    <div className="grid gap-y-10 lg:gap-y-0  md:grid-cols-2  lg:grid-cols-3 gap-x-6">
      {BannerList.map((elm,index)=>(
        <div key={index}>
          <img src={elm.img} alt="" />
        </div>
      ))}
    </div>
   </div>
    </div>
  );
};

export default Banner;
