const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const commonService = {
    fetchFooter: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/footer`, { next: { revalidate: 3600 } });
            const data = await response.json();
            if (data.success && data.data) {
                return data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching footer data:", error);
            return null;
        }
    },

    fetchPageInsights: async (type, alias = "") => {
        try {
            let url = `${API_BASE_URL}/page-insights?type=${type}`;
            if (alias) {
                url += `&alias=${alias}`;
            }
            const response = await fetch(url, { next: { revalidate: 1800 } });
            const data = await response.json();
            if (data.success && data.data) {
                return data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching page insights:", error);
            return null;
        }
    },

    fetchPageContent: async (slug) => {
        try {
            const response = await fetch(`${API_BASE_URL}/pages/${slug}`, { next: { revalidate: 1800 } });
            const data = await response.json();
            if (data.success && data.data) {
                return data.data;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching page content for ${slug}:`, error);
            return null;
        }
    }
};
