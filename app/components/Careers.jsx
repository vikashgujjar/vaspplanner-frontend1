"use client";
import React, { useState } from "react";
import PolicyLayout from "./PolicyLayout";
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart, TrendingUp, Users } from "lucide-react";
import ApplyFormModal from "./ApplyFormModal";

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const jobCategories = [
    { title: "Creative & Design", icon: <Star size={20} />, count: "2 Openings" },
    { title: "Tech & Product", icon: <TrendingUp size={20} />, count: "1 Opening" },
    { title: "Operations", icon: <Users size={20} />, count: "3 Openings" }
  ];

  const openings = [
    {
      title: "Senior UI/UX Designer",
      type: "Full-time",
      location: "Chandigarh, India",
      desc: "Help us design the next generation of premium gifting experiences."
    },
    {
      title: "Logistics Specialist",
      type: "Full-time",
      location: "Bangalore, India",
      desc: "Optimize our delivery network for flowers, cakes, and gifts."
    },
    {
      title: "Customer Success Lead",
      type: "Full-time",
      location: "Mohali, India",
      desc: "Drive happiness for our valued gifting customers."
    }
  ];

  const handleApply = (title) => {
    setSelectedJob(title);
    setIsModalOpen(true);
  };

  return (
    <>
      <PolicyLayout
        title="Join Our Team"
        subtitle="Careers"
        breadcrumb="Careers"
        icon={Briefcase}
      >
        <div className="p-8 md:p-12 lg:p-16">
          {/* Why VASP Planner? */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-6 border border-pink-100 shadow-sm text-pink-600">
              <Heart size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Spread Joy with Us</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Build the Future of <span className="text-pink-600">Gifting</span></h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              At VASP Planner, we are on a mission to make gifting seamless and memorable. We're looking for passionate individuals who love to innovate, collaborate, and spread joy across India.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {jobCategories.map((cat, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-600 mb-6 shadow-md shadow-pink-500/10 transition-transform group-hover:scale-110">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{cat.count}</p>
              </div>
            ))}
          </div>

          {/* Open Positions */}
          <div className="space-y-8 max-w-4xl mx-auto mb-20">
            <h3 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-widest text-center">Open <span className="text-amber-500">Positions</span> ➔</h3>
            {openings.map((job, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-pink-200 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-wide group-hover:text-pink-600 transition-colors">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500">
                      <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                        <Clock size={14} className="text-amber-500" /> {job.type}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                        <MapPin size={14} className="text-pink-500" /> {job.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 pt-2">{job.desc}</p>
                  </div>
                  <button
                    onClick={() => handleApply(job.title)}
                    className="px-8 py-3 bg-[#0f0f0f] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="p-10 md:p-16 bg-[#0f0f0f] rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center justify-center gap-3">
                Can't find a <span className="text-amber-400">Match?</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                If you think you have something special to contribute but don't see a role that fits, we'd still love to hear from you. Send your resume and a short cover letter to our recruitment team.
              </p>
              <button
                onClick={() => handleApply("Spontaneous Application")}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-black rounded-2xl hover:bg-amber-400 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95"
              >
                Apply Spontaneously
              </button>
            </div>
          </div>
        </div>
      </PolicyLayout>

      <ApplyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob}
      />
    </>
  );
}
