import React from 'react'
import ShippingPolicy from '../components/ShippingPolicy';

export const metadata = {
  title: "Shipping & Delivery Policy - VASP Planner",
  description: "Learn about VASP Planner's shipping and delivery policies, including our service areas (Bangalore, Hisar, Chandigarh, Mohali, etc.) and delivery time slots.",
};

export default function page() {
  return (
    <div>
      <ShippingPolicy />
    </div>
  )
}
