import { cache } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const optimizeImageUrl = (url) => {
    if (!url || typeof url !== 'string') return "/placeholder.png";
    return url;
};

const mapProductData = (item) => {
    // Handle both string image (list view) and array images (detail view)
    const rawImg = item.image || (item.images && item.images.find(img => img.is_primary)?.url) || item.images?.[0]?.url || "/placeholder.png";
    const primaryImg = optimizeImageUrl(rawImg);
    const imgList = item.images ? item.images.map(img => optimizeImageUrl(img.url)) : [primaryImg];

    return {
        id: item.id || item.uuid,
        title: item.name || "Product",
        heading: item.name,
        slug: item.slug || (item.name || "Product").toLowerCase().replace(/&/g, "and").replace(/,/g, "").split(" ").join("-"),
        img: primaryImg,
        imgHover: primaryImg,
        inerimgList: imgList,
        price: item.effective_price || item.sale_price,
        originalPrice: item.base_price,
        discount: item.discount_percent || (item.base_price > (item.effective_price || item.sale_price)
            ? Math.round(((item.base_price - (item.effective_price || item.sale_price)) / item.base_price) * 100)
            : 0),
        categories: item.category ? [typeof item.category === 'string' ? item.category : item.category.name] : (item.categories ? (Array.isArray(item.categories) ? item.categories.map(c => typeof c === 'string' ? c : c.name) : []) : []),
        rating: item.avg_rating,
        avg_rating: item.avg_rating,
        review_count: item.review_count || 0,
        reviews: item.review_count || 0,
        createdAt: item.created_at || new Date().toISOString(),
        _rawData: item
    };
};

export const fetchAllProducts = async () => {
    try {
        const firstPageResponse = await fetch(`${API_BASE_URL}/products?page=1`, { next: { revalidate: 600 } });
        const firstPageData = await firstPageResponse.json();

        if (!firstPageData.success || !firstPageData.data) return [];

        let allProducts = firstPageData.data.map(mapProductData);
        const lastPage = firstPageData.meta?.last_page || 1;

        if (lastPage > 1) {
            const pagePromises = [];
            for (let page = 2; page <= lastPage; page++) {
                pagePromises.push(
                    fetch(`${API_BASE_URL}/products?page=${page}`, { next: { revalidate: 600 } })
                        .then(res => res.json())
                );
            }

            const otherPagesData = await Promise.all(pagePromises);
            otherPagesData.forEach(data => {
                if (data.success && data.data) {
                    allProducts = [...allProducts, ...data.data.map(mapProductData)];
                }
            });
        }

        return allProducts;
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
};

export const fetchSingleProduct = async (slug) => {
    try {
        let fetchUrl = `${API_BASE_URL}/products/${slug}`;
        if (typeof window !== 'undefined') {
            const loc = localStorage.getItem('userLocation');
            const pin = localStorage.getItem('userPincode');
            const params = new URLSearchParams();
            if (loc) params.append('location', loc);
            if (pin) params.append('pincode', pin);
            if (params.toString()) fetchUrl += `?${params.toString()}`;
        }
        const response = await fetch(fetchUrl, { next: { revalidate: 300 } });
        const data = await response.json();

        if (data.success && data.data) {
            const item = data.data;
            return {
                ...mapProductData(item),
                description: item.description,
                variants: item.variants || [],
                related_products: item.related_products || [],
                insights: item.insights || null,
                faqs: item.faqs || null,
                stats: item.stats || null
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching single product:", error);
        return null;
    }
};

export const fetchProductsByCategory = async (categorySlug, page = 1, filters = {}) => {
    try {
        const url = new URL(`${API_BASE_URL}/categories/${categorySlug}/products`);
        url.searchParams.append('page', page);
        
        if (filters.price_range) {
            if (Array.isArray(filters.price_range)) {
                filters.price_range.forEach(pr => url.searchParams.append('price_range[]', pr));
            } else {
                url.searchParams.append('price_range', filters.price_range);
            }
        }
        if (filters.discount) {
            if (Array.isArray(filters.discount)) {
                filters.discount.forEach(d => url.searchParams.append('discount[]', d));
            } else {
                url.searchParams.append('discount', filters.discount);
            }
        }
        if (filters.product_type) {
            if (Array.isArray(filters.product_type)) {
                filters.product_type.forEach(pt => url.searchParams.append('product_type[]', pt));
            } else {
                url.searchParams.append('product_type', filters.product_type);
            }
        }
        if (filters.shop_for) {
            if (Array.isArray(filters.shop_for)) {
                filters.shop_for.forEach(sf => url.searchParams.append('shop_for[]', sf));
            } else {
                url.searchParams.append('shop_for', filters.shop_for);
            }
        }
        if (filters.sort_by) url.searchParams.append('sort_by', filters.sort_by);
        if (filters.per_page) url.searchParams.append('per_page', filters.per_page);

        if (typeof window !== 'undefined') {
            const loc = localStorage.getItem('userLocation');
            const pin = localStorage.getItem('userPincode');
            if (loc) url.searchParams.append('location', loc);
            if (pin) url.searchParams.append('pincode', pin);
        }

        const response = await fetch(url.toString(), { next: { revalidate: 600 } });
        const data = await response.json();

        if (data.success && data.data) {
            return {
                products: (data.data.products || []).map(mapProductData),
                category: data.data.category || null,
                meta: data.meta
            };
        }
        return { products: [], category: null, meta: null };
    } catch (error) {
        console.error(`Error fetching products for category ${categorySlug}:`, error);
        return { products: [], category: null, meta: null };
    }
};

export const fetchCategoryFilters = async (categorySlug) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${categorySlug}/filters`, { next: { revalidate: 3600 } });
        const data = await response.json();
        if (data.success) {
            return data.data;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching filters for category ${categorySlug}:`, error);
        return null;
    }
};

export const fetchCategoryPageData = async (categorySlug, page = 1, perPage = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${categorySlug}/page-data?page=${page}&per_page=${perPage}`, { next: { revalidate: 300 } });
        const data = await response.json();
        if (data.success && data.data) {
            // Map products data to match format expected by React Components
            const mappedProducts = (data.data.products_response.products || []).map(mapProductData);
            return {
                productsRes: {
                    products: mappedProducts,
                    category: data.data.products_response.category,
                    meta: data.data.products_response.meta
                },
                filtersRes: data.data.filters_response,
                categoriesList: data.data.categories_list
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching page-data for category ${categorySlug}:`, error);
        return null;
    }
};

export const fetchCommonFilters = async () => {
    try {
        // Fetching filters for 'cakes' as a proxy for common filters
        const response = await fetch(`${API_BASE_URL}/categories/cakes/filters`, { next: { revalidate: 3600 } });
        const data = await response.json();
        if (data.success) {
            return data.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching common filters:", error);
        return null;
    }
};

export const fetchHomeLayout = cache(async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home/layout`, { next: { revalidate: 300 } });
        const data = await response.json();

        if (data.success && data.data) {
            return data.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching home layout:", error);
        return null;
    }
});

export const fetchStories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home/stories`, { next: { revalidate: 300 } });
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error("Error fetching stories:", error);
        return [];
    }
};

export const fetchTestimonials = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home/testimonials`, { next: { revalidate: 300 } });
        const data = await response.json();
        return data.success ? data : null;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return null;
    }
};

export const fetchFeatures = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home/features`, { next: { revalidate: 300 } });
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error("Error fetching features:", error);
        return [];
    }
};

export const fetchVaspPlanner = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home/vasp-planner`, { next: { revalidate: 300 } });
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error("Error fetching VASP Planner:", error);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 300 } });
        const data = await response.json();

        if (data.success && data.data) {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const fetchAllProductSlugs = async () => {
    try {
        const slugs = new Set();

        const getSlug = (p) => {
            if (p.slug) return p.slug;
            const title = p.name || p.title || "product";
            return title.toLowerCase().replace(/&/g, "and").replace(/,/g, "").split(" ").join("-");
        };

        // Fetch products from main index with pagination parallelized
        const firstPageRes = await fetch(`${API_BASE_URL}/products?page=1`, { cache: 'no-store' });
        const firstPageData = await firstPageRes.json();
        
        if (firstPageData.success && firstPageData.data) {
            const items = firstPageData.data.products || firstPageData.data;
            items.forEach(p => {
                const s = getSlug(p);
                if (s) slugs.add(s);
            });
            
            const lastPage = firstPageData.meta?.last_page || 1;
            if (lastPage > 1) {
                const pagePromises = [];
                for (let page = 2; page <= lastPage; page++) {
                    pagePromises.push(fetch(`${API_BASE_URL}/products?page=${page}`, { cache: 'no-store' }).then(res => res.json()));
                }
                const pagesData = await Promise.all(pagePromises);
                pagesData.forEach(data => {
                    if (data.success && data.data) {
                        const items = data.data.products || data.data;
                        items.forEach(p => {
                            const s = getSlug(p);
                            if (s) slugs.add(s);
                        });
                    }
                });
            }
        }

        // Fetch categories to get products from each category specifically (in parallel)
        try {
            const categoriesRes = await fetch(`${API_BASE_URL}/categories`, { cache: 'no-store' });
            const categoriesData = await categoriesRes.json();
            if (categoriesData.success && categoriesData.data) {
                const catPromises = categoriesData.data.map(cat => 
                    fetch(`${API_BASE_URL}/categories/${cat.slug}/products?per_page=100`, { cache: 'no-store' })
                        .then(res => res.json())
                );
                
                const catsProductsData = await Promise.all(catPromises);
                catsProductsData.forEach(catProdData => {
                    if (catProdData.success && catProdData.data?.products) {
                        catProdData.data.products.forEach(p => {
                            const s = getSlug(p);
                            if (s) slugs.add(s);
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Failed to fetch products from categories during build", e);
        }

        // Fetch occasion products (already somewhat parallel, but keeping it clean)
        try {
            const occasionsRes = await fetch(`${API_BASE_URL}/home/occasions`, { cache: 'no-store' });
            const occasionsData = await occasionsRes.json();
            if (occasionsData.success && occasionsData.data) {
                occasionsData.data.forEach(occ => {
                    if (occ.products) {
                        occ.products.forEach(p => {
                            const s = getSlug(p);
                            if (s) slugs.add(s);
                        });
                    }
                });
            }
        } catch (e) { console.error("Occasions fetch failed", e); }

        return Array.from(slugs).map(slug => ({ slug }));
    } catch (error) {
        console.error("Error fetching all product slugs:", error);
        return [];
    }
};
export const searchProducts = async (query, scope = '') => {
    try {
        const url = new URL(`${API_BASE_URL}/search`);
        if (query) url.searchParams.append('q', query);
        if (scope) url.searchParams.append('scope', scope);

        const response = await fetch(url.toString(), { next: { revalidate: 60 } });
        const data = await response.json();

        if (data.success && data.data) {
            return {
                products: (data.data.products || []).map(item => ({
                    id: item.uuid || item.id,
                    title: item.name,
                    slug: item.slug,
                    image: item.image,
                    price: item.effective_price || item.sale_price,
                    category: item.category,
                    rating: item.avg_rating,
                    reviews: item.review_count || 0
                })),
                categories: data.data.categories || []
            };
        }
        return { products: [], categories: [] };
    } catch (error) {
        console.error("Error searching products:", error);
        return { products: [], categories: [] };
    }
};

export const fetchFeaturedCategoryGrid = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home/featured-category-grid`, { next: { revalidate: 300 } });
        const json = await response.json();
        if (json && json.success) {
            return {
                banner: json.banner,
                items: json.data || []
            };
        }
        return { banner: null, items: [] };
    } catch (error) {
        console.error("Error fetching featured category grid:", error);
        return { banner: null, items: [] };
    }
};
