import UserProfile from '../../components/UserProfile'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    }>
      <UserProfile />
    </Suspense>
  )
}
