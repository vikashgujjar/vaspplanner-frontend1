import { redirect } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { fetchSingleProduct, fetchAllProducts, fetchAllProductSlugs } from "../../services/productService";

export const generateStaticParams = async () => {
  try {
    const slugs = await fetchAllProductSlugs();
    if (!slugs || !Array.isArray(slugs)) {
      console.warn("Product slugs Not found or not an array during build.");
      return [];
    }
    console.log(`Generating static paths for ${slugs.length} products.`);
    return slugs.map((item) => ({
      slug: String(item.slug || ""),
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
};

export const dynamicParams = true;

export const revalidate = 300;

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const singleProduct = await fetchSingleProduct(slug);

  if (!singleProduct) {
    return {
      title: "Product Not Found | VASP Planner",
    };
  }

  const description =
    singleProduct.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    `Buy ${singleProduct.title} online at VASP Planner. Same-day and midnight delivery available.`;

  return {
    title: `${singleProduct.title} | VASP Planner`,
    description,
    openGraph: {
      title: singleProduct.title,
      description,
      images: singleProduct.img ? [singleProduct.img] : [],
    },
  };
};

export default async function page({ params }) {
  const { slug } = await params;
  const singleProduct = await fetchSingleProduct(slug);
  console.log(singleProduct);
  // Remove the global fetchAllProducts call during build to prevent build-time performance issues
  // const allProducts = await fetchAllProducts();

  return (
    <div>
      <ProductDetails
        slug={slug}
        singleProduct={singleProduct}
        relatedProducts={singleProduct?.related_products}
      />
    </div>
  );
}
