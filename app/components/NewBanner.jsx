import React from "react";

export default function NewBanner() {
  return (
    <div className="new-banner bg-[#F3F1EC] hidden lg:block">
      <div className="container mx-auto px-5 md:px-12 xl:px-32 py-5 md:py-10   ">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh] bg-red-500 lg:max-h-[800px  ]  ">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-[50%]">
              <div>
                <img
                  src="/img/NewBanner/4.webp"
                  alt="New Collection"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-black flex justify-center flex-col items-center text-white p-6 sm:p-4">
                <h5 className="text-xl sm:text-2xl lg:text-3xl capitalize text-center">
                  Exclusive Collection
                </h5>
                <button className="group text-center bg-black text-white px-5 py-2 text-sm sm:text-lg uppercase rounded-lg shadow-md mt-3 flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300">
                  View Details
                  <span className="text-white block group-hover:block group-hover:text-black   group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 h-[50%]">
              <div className="bg-black flex justify-center flex-col items-center text-white p-6 sm:p-4">
                <h5 className="text-xl sm:text-2xl lg:text-3xl capitalize text-center">
                  Timeless Elegance
                </h5>
                <button className="group text-center bg-black text-white px-5 py-2 text-sm sm:text-lg uppercase rounded-lg shadow-md mt-3 flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300">
                  View Details
                  <span className="text-white block group-hover:block group-hover:text-black   group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              </div>
              <div>
                <img
                  src="/img/NewBanner/3.webp"
                  alt="Elegant Jewelry"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-[50%]">
              <div>
                <img
                  src="/img/NewBanner/2.webp"
                  alt="Luxury Designs"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-black flex justify-center flex-col items-center text-white p-6 sm:p-4">
                <h5 className="text-xl sm:text-2xl lg:text-3xl capitalize text-center">
                  Luxury Designs
                </h5>
                <button className="group text-center bg-black text-white px-5 py-2 text-sm sm:text-lg uppercase rounded-lg shadow-md mt-3 flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300">
                  View Details
                  <span className="text-white block group-hover:block group-hover:text-black   group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 h-[50%]">
              <div className="bg-black flex justify-center flex-col items-center text-white p-6 sm:p-4">
                <h5 className="text-xl sm:text-2xl lg:text-3xl capitalize text-center">
                  Handcrafted Perfection
                </h5>
                <button className="group text-center bg-black text-white px-5 py-2 text-sm sm:text-lg uppercase rounded-lg shadow-md mt-3 flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300">
                  View Details
                  <span className="text-white block group-hover:block group-hover:text-black   group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              </div>
              <div>
                <img
                  src="/img/NewBanner/1.webp"
                  alt="Handmade Craft"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
