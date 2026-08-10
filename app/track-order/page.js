import React from 'react'
import TrackOrder from '../components/TrackOrder';

export const metadata = {
  title: "Track Your Order - VASP Planner",
  description: "Get real-time updates on your VASP Planner order. Enter your order ID and email to see the current status of your package.",
};

export default function page() {
  return (
    <div>
      <TrackOrder />
    </div>
  )
}
