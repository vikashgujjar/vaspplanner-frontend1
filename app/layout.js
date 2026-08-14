

import { Montserrat } from "next/font/google";
import "./globals.css";


import Footer from "./components/Footer";
import Providers from "./components/Providers";
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
        {/* Montserrat's Google-Fonts subset covering the currency range (includes ₹) isn't
            auto-preloaded by next/font, so it's discovered late via CSS. Preloading it directly
            closes that chain. NOTE: this filename is content-hashed and WILL change on the next
            font-related rebuild — if this stops matching, re-check the hash in the deployed
            `_next/static/css/*.css` file that declares the Montserrat @font-face for unicode-range
            u+20a0-20ab,u+20ad-20c0 and update the href below. */}
        <link
          rel="preload"
          href="/_next/static/media/1f173e5e25f3efee-s.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
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
