import React from 'react'
import RefundPolicy from '../components/RefundPolicy';

export const metadata = {
    title: "Refund Policy - VASP Planner",
    description: "Read VASP Planner's Refund Policy to understand our terms for returns, refunds, and exchanges. We ensure a transparent process for your satisfaction.",
};

export default function page() {
    return (
        <div>
            <RefundPolicy />
        </div>
    )
}
