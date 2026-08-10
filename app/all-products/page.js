// import { fetchAllProducts, fetchCommonFilters } from '../services/productService';
// import BottomFilter from './BottomFilter';
// import AllProducts from '../components/AllProducts';

// export default async function page() {
//   const [products, filters] = await Promise.all([
//     fetchAllProducts(),
//     fetchCommonFilters()
//   ]);

//   return (
//     <div>
//       <BottomFilter filters={filters} />
//       <AllProducts productData={products} filters={filters} />
//     </div>
//   )
// }


import { redirect } from "next/navigation";

export default function page() {
  redirect("/category/all-products");
}
