"use client";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Phone,
  Mail,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  MapPin,
  CreditCard
} from "lucide-react";
import BottomfixLinks from "./BottomfixLinks";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { commonService } from "../services/commonService";
import { toast } from "react-toastify";


const defaultFooterStructure = {
  sections: [
    {
      id: 1,
      title: "Special Occasions",
      links: [
        { id: 1, label: "Birthday Gifts", url: "/category/birthday" },
        { id: 2, label: "Anniversary Gifts", url: "/category/anniversary" },
        { id: 3, label: "Cake & Flower Combo", url: "/category/combos" },
        { id: 4, label: "Personalized Gifts", url: "/category/personalized" }
      ]
    },
    {
      id: 2,
      title: "Categories",
      links: [
        { id: 5, label: "Fresh Cakes", url: "/category/cakes" },
        { id: 6, label: "Exotic Flowers", url: "/category/flowers" },
        { id: 7, label: "Chocolates", url: "/category/chocolates" },
        { id: 8, label: "Plants", url: "/category/plants" }
      ]
    },
    {
      id: 3,
      title: "Customer Care",
      links: [
        { id: 9, label: "Track Order", url: "/track-order" },
        { id: 10, label: "Contact Us", url: "/contact" },
        { id: 11, label: "FAQ", url: "/faq" },
        { id: 12, label: "Privacy Policy", url: "/privacy-policy" }
      ]
    }
  ],
  need_help: {
    title: "Need Help?",
    contacts: []
  }
};

const Footer = () => {
  const [footerData, setFooterData] = useState(defaultFooterStructure);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pageInsights, setPageInsights] = useState(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");

    if (subscribers.includes(email.toLowerCase())) {
      toast.warning("This email is already subscribed!");
    } else {
      subscribers.push(email.toLowerCase());
      localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      toast.success("Thank you for subscribing!", {
        icon: "✨"
      });
      setEmail("");
    }
  };

  useEffect(() => {
    const getFooterData = async () => {
      const data = await commonService.fetchFooter();
      if (data) {
        setFooterData(data);
      }
      setLoading(false);
    };
    getFooterData();
  }, []);

  const pathName = usePathname();
  useEffect(() => {
    const getPageInsights = async () => {
      const segments = pathName.split('/').filter(Boolean);
      let type = "";
      let alias = "";

      if (segments.length === 0) {
        type = "home";
      } else if (segments.length === 1) {
        type = segments[0];
      } else {
        type = segments[0];
        alias = segments[1];
      }

      console.log('Fetching insights for:', { type, alias });
      const data = await commonService.fetchPageInsights(type, alias);
      if (data) {
        setPageInsights(data);
      }
    };
    getPageInsights();
  }, [pathName]);

  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "facebook": return <Facebook size={18} />;
      case "instagram": return <Instagram size={18} />;
      case "x":
      case "twitter": return <Twitter size={18} />;
      case "linkedin": return <Linkedin size={18} />;
      case "youtube": return <Youtube size={18} />;
      default: return null;
    }
  };

  const getContactIcon = (iconName) => {
    if (iconName?.includes("phone")) return <Phone size={14} className="text-amber-500" />;
    if (iconName?.includes("envelope") || iconName?.includes("email")) return <Mail size={14} className="text-amber-500" />;
    return null;
  };


  return (
    <>
      <footer className="bg-[#0f0f0f] relative overflow-hidden pb-24 md:pb-0 min-h-[500px]">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/3 rounded-full blur-[120px]" />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Top Section - About Brand (Skipped on homepage as VASPPlanner renders it dynamically) */}
        {pathName !== '/' && (pageInsights || true) && (
          <>
            <div className="relative z-10 border-b border-white/5 py-16 pb-8">
              <div className="container mx-auto px-4 md:px-6 lg:px-12">
                <div className="max-w-full mx-auto text-center">
                  {/* Decorative Element */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                    <svg className="w-5 h-5 text-amber-500/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                    </svg>
                    <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
                    {pageInsights?.title || (
                      <>
                        Celebrate Every Moment with{" "}
                        <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                          VASP Planner
                        </span>
                      </>
                    )}
                  </h2>
                  {pageInsights?.content ? (
                    <p
                      className={`text-gray-400 leading-relaxed mb-3 max-w-full mx-auto ${isAboutExpanded ? '' : 'line-clamp-3'}`}
                      dangerouslySetInnerHTML={{ __html: pageInsights.content }}
                    />
                  ) : (
                    <p className={`text-gray-400 leading-relaxed mb-3 max-w-full mx-auto ${isAboutExpanded ? '' : 'line-clamp-3'}`}>
                      VASP Planner is India's most loved online gifting platform, bringing you fresh flowers,
                      delicious cakes, and personalized gifts for every occasion. Whether it's a birthday,
                      anniversary, or a 'just because' moment, we deliver joy right to your doorstep.
                      Experience seamless gifting with our express, same-day, and midnight delivery slots
                      across major cities in India.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsAboutExpanded((prev) => !prev)}
                    className="text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors mb-8 inline-block"
                  >
                    {isAboutExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="relative z-10 border-b border-white/5 py-10">
              <div className="container mx-auto px-4 md:px-6 lg:px-12">
                <div className="grid grid-cols-1 min-[500px]:max-[650px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="flex items-center gap-4 justify-center min-[500px]:max-[650px]:justify-start sm:justify-start">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                      <Truck size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white uppercase tracking-wide text-sm">Nationwide Delivery</h3>
                      <p className="text-sm text-gray-500">Fast shipping across India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-center min-[500px]:max-[650px]:justify-start sm:justify-start">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                      <ShieldCheck size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white uppercase tracking-wide text-sm">100% Safe & Secure</h3>
                      <p className="text-sm text-gray-500">Secure payment methods</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-center min-[500px]:max-[650px]:justify-start sm:justify-start">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                      <Headphones size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white uppercase tracking-wide text-sm">24/7 Support</h3>
                      <p className="text-sm text-gray-500">Always here to help you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Footer Content */}
        <div className="relative z-10 py-14">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6">
              {/* API Sections */}
              {footerData?.sections?.map((section) => (
                <div key={section.id}>
                  <h3 className="text-amber-400 font-bold mb-5 text-xs uppercase tracking-wider">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links?.map((link) => (
                      <li key={link.id}>
                        <Link href={link.url} className="text-gray-400 text-sm hover:text-amber-300 transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}


              {/* Need Help? - From API */}
              <div>
                <h3 className="text-amber-400 font-bold mb-5 text-xs uppercase tracking-wider">
                  {footerData?.need_help?.title || "Need Help?"}
                </h3>
                <ul className="space-y-3">
                  {footerData?.need_help?.links?.map((link, index) => (
                    <li key={index}>
                      <Link href={link.url} className="text-gray-400 text-sm hover:text-amber-300 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {footerData?.need_help?.contacts?.map((contact, index) => (
                    <li key={index}>
                      <a
                        href={contact.label === "Phone" ? `tel:${contact.value}` : `mailto:${contact.value}`}
                        className="text-gray-400 text-sm hover:text-amber-300 transition-colors flex items-center gap-2"
                      >
                        {getContactIcon(contact.icon)}
                        {contact.value}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <MapPin size={14} className="text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-400 text-sm leading-relaxed">
                      SCO 54-55, 2nd Floor, Near Mukat Hospital, 34A Sector, Chandigarh, 160022
                    </span>
                  </li>
                </ul>
              </div>


              {/* Newsletter */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-amber-400 font-bold mb-5 text-xs uppercase tracking-wider">
                  {footerData?.subscribe?.title || "Subscribe Now"}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {footerData?.subscribe?.description || "Get updates on promotions and offers"}
                </p>

                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Newsletter"
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black p-2.5 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg shadow-amber-500/20"
                  >
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 border-t border-white/5 py-6">
          <div className="container mx-auto px-4 md:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright & Quick Links */}
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">
                  {footerData?.copyright || `© ${new Date().getFullYear()} VASP Planner. All rights reserved.`}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-gray-600 font-bold uppercase tracking-[0.15em]">
                  <Link href="/faqs" className="hover:text-amber-400 transition-colors">FAQs</Link>
                  <Link href="/careers" className="hover:text-amber-400 transition-colors">Careers</Link>
                  <Link href="/support" className="hover:text-amber-400 transition-colors">Support</Link>
                  <Link href="/track-order" className="hover:text-amber-400 transition-colors text-amber-500/80">Track Order</Link>
                </div>
              </div>


              {/* Social Media */}
              <div className="flex items-center gap-3">
                {footerData?.socials?.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.platform || 'Social'} page`}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
                {!footerData?.socials && (
                  <>
                    <a href="https://www.facebook.com" aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"><Facebook size={18} /></a>
                    <a href="https://www.instagram.com" aria-label="Visit our Instagram page" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"><Instagram size={18} /></a>
                  </>
                )}
              </div>


              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                {[
                  { img: "/img/footer/1.png", name: "MasterCard" },
                  { img: "/img/footer/2.png", name: "Stripe" },
                  { img: "/img/footer/3.png", name: "PayPal" },
                  { img: "/img/footer/4.png", name: "Visa" },
                  { img: "/img/footer/5.png", name: "Amazon Pay" },
                ].map((method, index) => (
                  <div key={index} title={method.name} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 hover:border-amber-500/30 transition-colors flex items-center justify-center">
                    <img
                      src={method.img}
                      alt={method.name}
                      className="h-4 w-auto object-contain brightness-0 invert opacity-70"
                    />
                  </div>
                ))}
              </div>

            </div>

            {/* Company Info & Credits */}
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
              <div className="text-center md:text-left">
                <p className="flex items-center gap-1 justify-center md:justify-start">
                  <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Company Address: #144 KGA Road Domlur layout, Banglore, 560071 India
                </p>
                <p className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-amber-500" />
                    +91-1234567890
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} className="text-amber-500" />
                    info@vaspplanner.com
                  </span>
                </p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-gray-500">
                  Designed by
                  <a
                    href="https://www.futuretouch.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
                  >
                    Future IT Touch
                  </a>
                  <span className="text-red-500">❤️</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <BottomfixLinks />
    </>
  );
};

export default Footer;