import React from "react";

export default function JewellerySection() {
  return (
    <div className="bg-[#F3F1EC]">
      <div className="container mx-auto px-5 md:px-12 xl:px-32 pt-10 xl:py-16  xl:pb-0  relative">
        <div className=" flex flex-col  lg:flex-row justify-between gap-6">
          {/* Small Image & Text */}
          <div className="w-full  lg:w-[250px] flex flex-col space-y-10 items-center lg:items-start">
            <img
              src="/img/JewellerySection/2.webp"
              alt="Vajra Jewels"
              className="w-full xl:h-[350px] lg:max-w-[250px] h-auto object-cover object-center"
            />
            <p className="mt-3 text-center lg:text-left">
              Embrace yourself in Vajra Jewels’ diamond jewellery and fall in
              love with diamonds all over again.
            </p>

            {/* below xl scree  */}
            <div className="flex flex-col items-center text-center px-6 text-white  xl:px-12 bg-[#000] py-4 xl:py-20 xl:hidden  w-full xl:w-[35%] ">
              <h3 className="text-2xl md:text-3xl font-semibold italic">
                <span className="block">True. Beautiful.</span> Forever.
              </h3>

              {/* Logo Image */}
              <div className="my-3 md:py-0 xl:my-6">
                <img
                  src="/img/logos/logoHorizontal.webp"
                  alt="Vajra Jewels"
                  className="w-full max-w-[100px] md:max-w-[120px] lg:max-w-[70px]  h-auto"
                />
              </div>

              {/* Description */}
              <div className="hidden  text-gray-100 text-justify xl:max-w-2xl">
                <p>
                  Vajra Jewels' diamond jewellery embodies the timeless allure
                  of the most precious gem. Each piece is a masterpiece of fine
                  craftsmanship, meticulously designed with attention to detail
                  and set with the highest quality lab-grown diamonds. The
                  result is a collection that is both breathtaking and
                  enduring—a true symbol of beauty and lasting value.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-1">
                <a
                  href="/about"
                  className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 transition-all rounded-md"
                >
                  Know More
                </a>
              </div>
            </div>
          </div>

          {/* Large Image */}
          <img
            src="/img/JewellerySection/3.webp"
            alt="Vajra Jewels"
            className="object-cover object-right-top lg:object-bottom w-full lg:w-[650px] h-[350px] md:h-auto lg:h-[650px]"
          />

          {/* Centered Text Box */}
          <div className="xl:flex flex-col items-center text-center px-6 text-black md:px-12 bg-[#000] py-10 lg:py-12 hidden xl:absolute right-1/2 lg:right-[35%] w-[90%] lg:w-[35%] bottom-[0%]  lg:translate-x-0">
            <h3 className="text-2xl md:text-3xl font-semibold italic">
              <span className="block text-white">True. Beautiful.</span> Forever.
            </h3>

            {/* Logo Image */}
            <div className="my-1">
              <img
                src="/img/logo.webp"
                alt="Vajra Jewels"
                className="w-full max-w-[100px]  lg:max-w-[130px] h-auto rounded-3xl"
              />
            </div>

            {/* Description */}
            <div className="text-gray-100 max-w-2xl">
              <p>
                Vajra Jewels' diamond jewellery embodies the timeless allure of
                the most precious gem. Each piece is a masterpiece of fine
                craftsmanship, meticulously designed with attention to detail
                and set with the highest quality lab-grown diamonds. The result
                is a collection that is both breathtaking and enduring—a true
                symbol of beauty and lasting value.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <a
                href="/about"
                className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 transition-all rounded-md"
              >
                Know More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
