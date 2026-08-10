import React from 'react'
import CheckOut from '../components/CheckOut';


export const metadata = {
  title: "Checkout | Vajra Jewels",
  description:
    "Securely complete your purchase at Vajra Jewels. Review your order, enter your details, and enjoy a seamless checkout experience for exquisite jewelry category.",
};

export default function page() {

  return (
    <div>
      <CheckOut />
    </div>
  )
}
