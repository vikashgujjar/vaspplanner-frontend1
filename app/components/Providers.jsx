


"use client"

import store from '../store/store'
import React from 'react'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import SyncProvider from './SyncProvider'

// Lazy-loaded so react-toastify's JS/CSS ship as a separate chunk after
// initial render instead of blocking the first paint on every page.
const ToastContainer = dynamic(() => import('./ToastContainerLazy'), { ssr: false });

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <SyncProvider>
        {children}
        <ToastContainer autoClose={5000} theme="dark" position="top-right" />
      </SyncProvider>
    </Provider>
  )
}
