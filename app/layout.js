

import { Montserrat } from "next/font/google";
import "./globals.css";


import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FooterTopMarque from "./components/FooterTopMarque";
import Providers from "./components/Providers";
import TopBar from "./components/TopBar";
import MyNav from "./components/MyNav";
import TrackingProvider from "./components/TrackingProvider";
import BottomfixLinks from "./components/BottomfixLinks";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const metadata = {
  title: "VASP Planner | Online Gifts, Flowers & Cakes Delivery in India",
  description:
    "VASP Planner is your premier destination for online gifting. Send fresh flowers, delicious cakes, and personalized gifts across India with same-day and midnight delivery.",
};



import { fetchHomeLayout } from "./services/productService";
import { Suspense } from "react";

async function NavWrapper() {
  try {
    const layoutData = await fetchHomeLayout();
    return <MyNav initialLayoutData={layoutData} />;
  } catch (error) {
    return <MyNav initialLayoutData={null} />;
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://admin.vaspplanner.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://admin.vaspplanner.com" />
      </head>
      <body
        className={`${montserrat.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <TrackingProvider>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<div className="h-20 bg-[#0f0f0f] animate-pulse" />}>
                <NavWrapper />
              </Suspense>
              <main className="flex-1 min-h-[calc(100vh-300px)]">
                {children}
              </main>
              <Footer />
              <BottomfixLinks />
            </div>
          </TrackingProvider>
        </Providers>
      </body>
    </html>
  );
}
