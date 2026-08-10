import React from "react";
import SlugInerPage from "./SlugInerPage";
import { fetchCategories, fetchCategoryPageData } from "../../services/productService";

export const generateStaticParams = async () => {
  try {
    const categories = await fetchCategories();
    if (!categories || !Array.isArray(categories)) {
      console.warn("Categories not found or not an array in generateStaticParams.");
      return [];
    }
    console.log(`Generating static paths for ${categories.length} categories.`);
    return categories.map((cat) => ({
      slug: cat.slug || "",
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for categories:", error);
    return [];
  }
};

export const dynamicParams = true;

export const revalidate = 300;

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page) || 1;
  const perPage = parseInt(resolvedSearchParams.per_page) || 10;

  let initialProducts = [];
  let initialCategoryInfo = null;
  let initialMeta = null;
  let initialFilters = null;

  try {
    const pageData = await fetchCategoryPageData(slug, page, perPage);
    if (pageData) {
      initialProducts = pageData.productsRes?.products || [];
      initialCategoryInfo = pageData.productsRes?.category || null;
      initialMeta = pageData.productsRes?.meta || null;
      initialFilters = pageData.filtersRes || null;
    }
  } catch (error) {
    console.error("Error pre-fetching category page data:", error);
  }

  return (
    <div>
      <SlugInerPage
        slug={slug}
        initialProducts={initialProducts}
        initialCategoryInfo={initialCategoryInfo}
        initialMeta={initialMeta}
        initialFilters={initialFilters}
        initialPage={page}
        initialPerPage={perPage}
      />
    </div>
  );
}
