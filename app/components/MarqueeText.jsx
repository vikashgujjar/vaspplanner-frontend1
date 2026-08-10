import React from 'react'
import Marquee from "react-fast-marquee";

export default function MarqueeText() {
  return (
    <>
         <div className="w-full bg-[#000] text-white py-3 ">
      <Marquee gradient={false} speed={50} pauseOnHover>
        <ul className="flex gap-6 text-sm md:text-xl list-none mx-4 md:mx-10">
          <li> Certified 5C Diamonds - </li>
          <li> Lifetime Buy-Back & Exchange -</li>
          <li> Timeless Designs -</li>
          <li> Meticulous Craftsmanship -</li>
          <li> Dedicated Assistance -</li>
          <li> Certified 5C Diamonds - </li>
          <li> Lifetime Buy-Back & Exchange -</li>
          <li> Timeless Designs -</li>
        </ul>
      </Marquee>
    </div>
    </>
  )
}
