import React from 'react'
import Testimonials from '../components/Testimonials';

export const metadata = {
  title: "Client Stories & Testimonials - VASP Planner",
  description: "Read what our customers are saying about our gifts, flowers, and cakes. Real voices of delight from the VASP Planner community.",
};

export default function page() {
  return (
    <div>
      <Testimonials />
    </div>
  )
}
