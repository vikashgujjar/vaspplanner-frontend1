import React from "react";
import Link from "next/link";
export default function NewCategoriesJwellery() {
  const images = [
    {
      src: "//reia.diamonds/cdn/shop/files/Frame_28_500x.png?v=1721820355",
      alt: "Bracelets",
      link: "/category/bracelets",
    },
    {
      src: "//reia.diamonds/cdn/shop/files/Frame_29_500x.png?v=1721820354",
      alt: "Bangles",
      link: "/category/bangles",
    },
    {
      src: "//reia.diamonds/cdn/shop/files/Frame_30_500x.png?v=1721820354",
      alt: "Rings",
      link: "/category/rings",
    },
    {
      src: "//reia.diamonds/cdn/shop/files/Frame_31_500x.png?v=1721820354",
      alt: "Necklaces",
      link: "/category/necklaces",
    },
    {
      src: "//reia.diamonds/cdn/shop/files/Frame_32_500x.png?v=1721820461",
      alt: "Earrings",
      link: "/category/earrings",
    },
    {
      src: "//reia.diamonds/cdn/shop/files/Frame_33_500x.png?v=1721820460",
      alt: "Pendant",
      link: "/category/pendant",
    },
  ];


  const navItems = [
    {
      title: "Jewellery",
      link: "#!",
      listImg: [
        {
          img: "/img/navHoverOuter/Jewellery/1.webp",
          title: "Jewellery 1",
          link: "/category/rings",
        },
        {
          img: "/img/navHoverOuter/Jewellery/2.webp",
          title: "Jewellery 2",
          link: "/category/earrings",
        },
        {
          img: "/img/navHoverOuter/Jewellery/3.webp",
          title: "Jewellery 3",
          link: "/category/rings",
        },
      ],

      subcategories: [
        {
          title: "Rings",
          link: "/category/rings",
          rings: {
            list: [
              {
                img: "/img/NavHoverInside/rings/1.webp",
                title: "Royal Sapphire Ring",
                link: "/category/rings",
              },
              {
                img: "/img/NavHoverInside/rings/2.webp",
                title: "Platinum Eternity Band",
                link: "/category/rings",
              },
              {
                img: "/img/NavHoverInside/rings/3.webp",
                title: "Vintage Emerald Ring",
                link: "/category/necklaces",
              },
            ],
          },
        },
        {
          title: "Earrings",
          link: "/category/earrings",
          Earrings: {
            list: [
              {
                img: "/img/NavHoverInside/Earrings/1.webp",
                title: "Diamond Stud Earrings",
                link: "/category/earrings",
              },
              {
                img: "/img/NavHoverInside/Earrings/2.webp",
                title: "Golden Hoop Earrings",
                link: "/category/earrings",
              },
              {
                img: "/img/NavHoverInside/Earrings/3.webp",
                title: "Pearl Drop Earrings",
                link: "/category/earrings",
              },
            ],
          },
        },
        {
          title: "Necklaces",
          link: "/category/necklaces",
          Necklaces: {
            list: [
              {
                img: "/img/NavHoverInside/Necklaces/1.webp",
                title: "Gold Chain Necklace",
                link: "/category/necklaces",
              },
              {
                img: "/img/NavHoverInside/Necklaces/2.webp",
                title: "Diamond Pendant Necklace",
                link: "/category/necklaces",
              },
              {
                img: "/img/NavHoverInside/Necklaces/3.webp",
                title: "Pearl Strand Necklace",
                link: "/category/necklaces",
              },
            ],
          },
        },
        {
          title: "Bracelets",
          link: "/category/bracelets",
          Bracelets: {
            list: [
              {
                img: "/img/NavHoverInside/Bracelets/1.webp",
                title: "Cuff Bracelet",
                link: "/category/bracelets",
              },
              {
                img: "/img/NavHoverInside/Bracelets/2.webp",
                title: "Beaded Bracelet",
                link: "/category/bracelets",
              },
              {
                img: "/img/NavHoverInside/Bracelets/3.webp",
                title: "Chain Link Bracelet",
                link: "/category/bracelets",
              },
            ],
          },
        },

        // { title: "Bangles", link: "/category/bangles" },
        // { title: "Nose Pins", link: "/category/nose-pins" },
        // { title: "Pendants", link: "/category/pendants" },
      ],
    },
    {
      title: "Engagement",
      link: "#!",
      listImg: [
        {
          img: "/img/navHoverOuter/Engagement/1.webp",
          title: "Engagement 1",
          link: "/category/for-him",
        },
        {
          img: "/img/navHoverOuter/Engagement/2.webp",
          title: "Engagement 2",
          link: "/category/for-her",
        },
        {
          img: "/img/navHoverOuter/Engagement/3.webp",
          title: "Engagement 3",
          link: "/category/for-him",
        },
      ],
      subcategories: [
        {
          title: "For Him",
          link: "/category/for-him",
          "for-him": {
            list: [
              {
                img: "/img/NavHoverInside/forHim/1.webp",
                title: "Men's Signet Ring",
                link: "/category/for-him",
              },
              {
                img: "/img/NavHoverInside/forHim/2.webp",
                title: "Men's Wedding Band",
                link: "/category/for-him",
              },
              {
                img: "/img/NavHoverInside/forHim/3.webp",
                title: "Men's Chain Bracelet",
                link: "/category/for-him",
              },
            ],
          },
        },
        {
          title: "For Her",
          link: "/category/for-her",
          "for-her": {
            list: [
              {
                img: "/img/NavHoverInside/forHer/1.webp",
                title: "Elegant Diamond Ring",
                link: "/category/for-her",
              },
              {
                img: "/img/NavHoverInside/forHer/2.webp",
                title: "Gold Engagement Ring",
                link: "/category/for-her",
              },
              {
                img: "/img/NavHoverInside/forHer/3.webp",
                title: "Classic Pearl Ring",
                link: "/category/for-her",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Gifting",
      link: "#!",
      listImg: [
        {
          img: "/img/navHoverOuter/gift/1.webp",
          title: "gift 1",
          link: "/category/for-him",
        },
        {
          img: "/img/navHoverOuter/gift/2.webp",
          title: "gift 2",
          link: "/category/for-him",
        },
        {
          img: "/img/navHoverOuter/gift/3.webp",
          title: "gift 3",
          link: "/category/for-him",
        },
      ],

      subcategories: [
        {
          title: "For Him",
          link: "/category/for-him",
          "for-him": {
            list: [
              {
                img: "/img/NavHoverInside/forHim/1.webp",
                title: "Men's Signet Ring",
                link: "/category/for-him",
              },
              {
                img: "/img/NavHoverInside/forHim/2.webp",
                title: "Men's Wedding Band",
                link: "/category/for-him",
              },
              {
                img: "/img/NavHoverInside/forHim/3.webp",
                title: "Men's Chain Bracelet",
                link: "/category/for-him",
              },
            ],
          },
        },
        {
          title: "For Her",
          link: "/category/for-her",
          "for-her": {
            list: [
              {
                img: "/img/NavHoverInside/forHer/1.webp",
                title: "Elegant Diamond Ring",
                link: "/category/for-her",
              },
              {
                img: "/img/NavHoverInside/forHer/2.webp",
                title: "Gold Engagement Ring",
                link: "/category/for-her",
              },
              {
                img: "/img/NavHoverInside/forHer/3.webp",
                title: "Classic Pearl Ring",
                link: "/category/for-her",
              },
            ],
          },
        },
      ],
    },
    { title: "About ", link: "/about" },
    { title: "products", link: "/category/all-products" },
    { title: "Contact us", link: "/contact-us" },
  ];
  return (
    <div className="categories bg-[#f3f1ec]">
      <div className="px-5 md:px-12 xl:px-32  pt-8 md:pt-12 lg:pt-10  container mx-auto">
        <h6 className="text-2xl md:text-3xl xl:text-5xl text-center">
          Vajra category
        </h6>

        <div className=" mt-8  ">
          <div className="grid grid-cols-3 md:grid-cols-3 xl:flex xl:justify-between gap-4 md:gap-6">
            {images.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Link href={item.link} className="h-[90px] w-[90px] md:h-[150px] md:w-[150px]  rounded-full bg-white overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full rounded-full object-cover"
                  />
                </Link>
                <p className="text-center mt-2">{item.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
