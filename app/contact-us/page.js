// "use client"
import React from 'react'
import Link from 'next/link'
import { FaGreaterThan } from 'react-icons/fa6'
import Contact from '../components/Contact'

export const metadata = {
  title: "Contact VASP Planner - We're Here to Help",
  description:
    "Get in touch with VASP Planner for any questions, support, or inquiries. We're here to assist you with your gift planning and wellness journey.",
};


export default function page() {
  return (
    <>

      <Contact />
    </>


  )
}
