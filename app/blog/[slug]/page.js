import React from "react";
import BlogInner from "../../components/BlogInner";
import { notFound } from "next/navigation";

export const metadata = {
  title: "VASP Planner Blog - Celebration Tips & Gifting Insights",
  description: "Stay updated with the latest gifting trends, celebration tips, and heartwarming stories at the VASP Planner Blog. Learn more about cakes, flowers, and personalised gifts.",
};

const blogs = [
  {
    author: "VASP Team",
    category: "Gourmet Cakes",
    date: "April 10, 2026",
    para: "Learn how to select the right flavors, sizes, and designs to make every birthday celebration truly unforgettable. From chocolate truffle to red velvet, we cover it all.",
    title: "The Secret to Choosing the Perfect Birthday Cake",
    heading: "The Secret to Choosing the Perfect Birthday Cake",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    link: "/the-secret-to-choosing-the-perfect-birthday-cake",
  },
  {
    author: "admin",
    category: "Exotic Flowers",
    date: "April 5, 2026",
    para: "Explore the language of flowers and find out which blooms best express your feelings for anniversaries, birthdays, and special moments.",
    title: "Why Fresh Flowers are the Ultimate Token of Love",
    heading: "Why Fresh Flowers are the Ultimate Token of Love",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-1648482ce486?w=800&q=80",
    link: "/why-fresh-flowers-are-the-ultimate-token-of-love",
  },
  {
    author: "VASP Team",
    category: "Personalised Gifts",
    date: "March 28, 2026",
    para: "Discover the emotional impact of a custom-made gift and why it always stands out in a world of mass-produced items. Tips for personalisation included.",
    title: "How Personalised Gifts Create Lasting Memories",
    heading: "How Personalised Gifts Create Lasting Memories",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    link: "/how-personalised-gifts-create-lasting-memories",
  },
  {
    author: "admin",
    category: "Luxury Hampers",
    date: "March 20, 2026",
    para: "From selecting the right hamper to timing your delivery, here's everything you need to know about professional gifting etiquette for corporate clients.",
    title: "The Essential Guide to Corporate Gifting Etiquette",
    heading: "The Essential Guide to Corporate Gifting Etiquette",
    imageUrl: "https://images.unsplash.com/photo-1621535948301-1eec0b4d4580?w=800&q=80",
    link: "/the-essential-guide-to-corporate-gifting-etiquette",
  }
];

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .split(/\s+/)
      .join("-"),
  }));
}
export const dynamicParams = true;

const page = async ({ params }) => {
  const { slug } = await params;
  const currentBlog = blogs.find((blog) => (blog.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .join("-") == slug))

  if (!currentBlog) {
    return notFound();
  }

  return (
    <>
      <BlogInner currentBlog={currentBlog} />
    </>
  );
};

export default page;
