import React from 'react'
import TermsCondition from '../components/TermsCondition';

export const metadata = {
  title: "Terms and Conditions - VASP Planner",
  description: "Review the terms and conditions for using VASP Planner. Understand our policies on purchases, returns, shipping, and user responsibilities.",
};


export default function page() {
  return (
    <div>
      <TermsCondition />
    </div>
  )
}
