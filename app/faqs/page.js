import React from 'react'
import FAQ from '../components/Faq';

export const metadata = {
  title: "Frequently Asked Questions - VASP Planner",
  description: "Find answers to your questions about ordering, delivery, payments, and more at VASP Planner. Our help center is here to assist you.",
};

export default function page() {
  return (
    <div>
      <FAQ />
    </div>
  )
}
