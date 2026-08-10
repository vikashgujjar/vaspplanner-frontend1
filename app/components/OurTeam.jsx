"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe, 
  Users, 
  Heart, 
  Sparkles,
  ArrowRight,
  User
} from "lucide-react";

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Vihaan Sharma",
      role: "CEO & Founder",
      bio: "Visionary leader with a passion for revolutionizing the Indian gifting landscape through technology and premium craftsmanship.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 2,
      name: "Ananya Iyer",
      role: "Creative Director",
      bio: "Award-winning designer responsible for the aesthetic soul of VASP Planner. She ensures every gift we curate is a masterpiece.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 3,
      name: "Rohan Mehra",
      role: "Head of Logistics",
      bio: "The engineering brain behind our lightning-fast delivery network. Rohan ensures your love reaches on time, every time.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 4,
      name: "Sanya Gupta",
      role: "Chief Floral Stylist",
      bio: "A floral artisan who hand-picks every bloom. Sanya brings the freshness of the garden directly to your doorstep.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 5,
      name: "Arjun Varma",
      role: "Customer Success Lead",
      bio: "Passionate about people, Arjun leads our 24/7 support team to ensure every customer experience is nothing short of delight.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 6,
      name: "Priya Das",
      role: "Product Curator",
      bio: "Searching the globe for the finest personalized gifts. Priya curates our exclusive collection with an eye for detail.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&q=80",
      linkedin: "#",
      twitter: "#",
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ============================================== */}
      {/* SECTION 1: HERO BANNER - DARK */}
      {/* ============================================== */}
      <section className="relative bg-[#0c0c0c] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]" />
        </div>

        {/* Gradient Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[130px]" />

        <div className="relative z-10 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="container mx-auto px-4 text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 mb-8 text-sm font-medium">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Home</Link>
              <ChevronRight size={14} className="text-amber-500" />
              <span className="text-amber-100 uppercase tracking-widest">Our Team</span>
            </nav>

            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-md">
              <Users size={16} className="text-amber-400" />
              <span className="text-amber-100 text-xs font-bold uppercase tracking-widest">The Minds Behind VASP Planner</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
              A Team Built on <br />
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent italic">Love & Precision</span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Meet the artisans, engineers, and dreamers working around the clock to ensure your celebrations are filled with joy and perfection.
            </p>
          </div>
        </div>

        {/* Bottom Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[60px]" />
      </section>

      {/* ============================================== */}
      {/* SECTION 2: VALUES - LIGHT */}
      {/* ============================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Heart, title: "Emotion Driven", desc: "Every gift we handle is treated as a container of someone's love." },
              { icon: Sparkles, title: "Precision Crafted", desc: "From bows to icing, we obsess over every millimeter of the experience." },
              { icon: Globe, title: "Nationwide Reach", desc: "Crossing boundaries to bring smiles to every corner of India." }
            ].map((value, idx) => (
              <div key={idx} className="group p-8 rounded-[3rem] border border-gray-100 hover:border-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/5 transition-all">
                <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: TEAM GRID */}
      {/* ============================================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Our <span className="text-amber-600">Experts</span></h2>
              <p className="text-gray-500 max-w-md">Passionate individuals leading their respective crafts with excellence.</p>
            </div>
            <div className="hidden md:block">
              <button className="flex items-center gap-3 px-8 py-4 bg-[#0c0c0c] text-white rounded-full hover:bg-amber-600 transition-all font-bold group shadow-xl">
                Join Our Journey
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-96 overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Meta Cards */}
                  <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl">
                      <p className="text-gray-600 text-sm italic mb-4">"{member.bio}"</p>
                      <div className="flex items-center gap-3">
                        <Link href={member.linkedin} className="w-10 h-10 bg-[#0c0c0c] text-white rounded-xl flex items-center justify-center hover:bg-amber-600 transition-colors">
                          <Linkedin size={18} />
                        </Link>
                        <Link href={member.twitter} className="w-10 h-10 border border-gray-200 text-gray-400 rounded-xl flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors">
                          <Twitter size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 text-center group-hover:opacity-0 transition-opacity duration-300">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 4: CTA */}
      {/* ============================================== */}
      <section className="py-24 bg-[#0c0c0c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Be a Part of Our <br /><span className="text-amber-500">Expanding Family</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            We are always looking for creative decorators, master bakers, and tech visionaries to join our quest for excellence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/careers" className="px-10 py-5 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/20">
              Apply Now
            </Link>
            <Link href="/contact-us" className="px-10 py-5 border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-all">
              Contact Human Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
