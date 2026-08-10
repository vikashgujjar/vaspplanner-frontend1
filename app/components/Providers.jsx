


"use client"

import store from '../store/store'
import React from 'react'
import { Provider } from 'react-redux'
import SyncProvider from './SyncProvider'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
