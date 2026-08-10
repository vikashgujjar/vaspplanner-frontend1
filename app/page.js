import React from "react";
import HeroSection from "./components/HeroSection";
import ProductAyurved from "./components/ProductAyurved";
import WhyGifting from "./components/WhyGifting";
import OfferPorductValid from "./components/OfferPorductValid";
import CakeCategory from "./components/CakeCategory";
import VASPPlanner from "./components/VASPPlanner";
import Testmonails from "./components/Testmonails";
import CategoriesSlider from "./components/Shop";
import VideoSection from "./components/VideoSection";
import CategorySectionSlider from "./components/CategorySectionSlider";
import CategoryGridShowcase from "./components/CategoryGridShowcase";
import MobileOfferSection from "./components/MobileOfferSection";

import {
  fetchStories,
  fetchTestimonials,
  fetchFeatures,
  fetchProductsByCategory,
  fetchCategories,
  fetchFeaturedCategoryGrid,
  fetchVaspPlanner
} from "./services/productService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function page() {
  let banners = [];
  let categories = [];
  let sections = [];
  let occasions = [];
  let features = [];
  let stories = [];
  let testimonials = null;
  let cakes = [];
  let featuredGrid = { banner: null, items: [] };
  let categorySliders = [];
  let planner = null;

  try {
    // Single unified parallel fetch with ISR caching (revalidate: 300)
    const [
      bannersRes,
      categoriesData,
      sectionsRes,
      occasionsRes,
      featuresData,
      storiesData,
      testimonialsData,
      cakesData,
      featuredGridData,
      slidersRes,
      plannerData
    ] = await Promise.all([
      fetch(`${API_BASE_URL}/home/banners`, { next: { revalidate: 300 } }).catch(() => null),
      fetchCategories(),
      fetch(`${API_BASE_URL}/home/sections`, { next: { revalidate: 300 } }).catch(() => null),
      fetch(`${API_BASE_URL}/home/occasions`, { next: { revalidate: 300 } }).catch(() => null),
      fetchFeatures(),
      fetchStories(),
      fetchTestimonials(),
      fetchProductsByCategory('cake-collection'),
      fetchFeaturedCategoryGrid(),
      fetch(`${API_BASE_URL}/home/category-sliders`, { next: { revalidate: 300 } }).catch(() => null),
      fetchVaspPlanner()
    ]);

    if (bannersRes) {
      const bannersJson = await bannersRes.json().catch(() => null);
      if (bannersJson && bannersJson.success) banners = bannersJson.data || [];
    }
    categories = categoriesData || [];

    if (sectionsRes) {
      const sectionsJson = await sectionsRes.json().catch(() => null);
      if (sectionsJson && sectionsJson.success) sections = sectionsJson.data || [];
    }

    if (occasionsRes) {
      const occasionsJson = await occasionsRes.json().catch(() => null);
      if (occasionsJson && occasionsJson.success) occasions = occasionsJson.data || [];
    }

    features = featuresData || [];
    stories = storiesData || [];
    testimonials = testimonialsData;
    cakes = cakesData?.products || [];
    featuredGrid = featuredGridData || { banner: null, items: [] };
    planner = plannerData;

    if (slidersRes) {
      const slidersJson = await slidersRes.json().catch(() => null);
      if (slidersJson && slidersJson.success) categorySliders = slidersJson.data || [];
    }
  } catch (err) {
    console.error("Failed to fetch page data on server:", err);
  }

  const hasSections = sections && sections.length > 0;
  const priorityKeys = ['hero', 'top_categories', 'occasions', 'why_choose_us'];

  return (
    <>
      {hasSections ? (
        <>
          {sections.filter(sec => sec.is_active).map((sec) => {
            if (sec.type === 'category_slider' && sec.slider_data) {
              return <CategorySectionSlider key={sec.id} slider={sec.slider_data} />;
            }

            switch (sec.key) {
              case 'hero':
                return <HeroSection key={sec.id} banners={banners} />;
              case 'top_categories':
                return <CategoriesSlider key={sec.id} initialData={categories} />;
              case 'occasions':
                return <ProductAyurved key={sec.id} initialData={occasions} />;
              case 'why_choose_us':
                return <WhyGifting key={sec.id} initialData={features} />;
              case 'featured_category_grid':
                return <CategoryGridShowcase key={sec.id} initialData={featuredGrid.items} initialBanner={featuredGrid.banner} />;
              case 'video_stories':
                return <VideoSection key={sec.id} initialData={stories} />;
              case 'trending_products':
                return (
                  <React.Fragment key={sec.id}>
                    <OfferPorductValid />
                    <CakeCategory initialData={cakes} />
                  </React.Fragment>
                );
              case 'testimonials':
                return <Testmonails key={sec.id} initialData={testimonials} />;
              case 'mobile_offer':
                return (
                  <div key={sec.id} className="container mx-auto px-4 my-6">
                    <MobileOfferSection />
                  </div>
                );
              case 'vasp_planner':
                return <VASPPlanner key={sec.id} initialData={planner} />;
              default:
                return null;
            }
          })}
        </>
      ) : (
        <>
          <HeroSection banners={banners} />
          <CategoriesSlider initialData={categories} />
          <ProductAyurved initialData={occasions} />
          <WhyGifting initialData={features} />
          {categorySliders && categorySliders.length > 0 ? (
            categorySliders.map((slider) => (
              <CategorySectionSlider key={slider.id} slider={slider} />
            ))
          ) : (
            <>
              <OfferPorductValid />
              <CakeCategory initialData={cakes} />
            </>
          )}
          <VideoSection initialData={stories} />
          <Testmonails initialData={testimonials} />
          <div className="container mx-auto px-4 my-6">
            <MobileOfferSection />
          </div>
        </>
      )}
    </>
  );
}
