const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const locationService = {
    getCountries: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/locations/countries`, { cache: 'no-store' });
            return await response.json();
        } catch (error) {
            console.error('Error fetching countries:', error);
            return { success: false, data: [] };
        }
    },

    getStates: async (countryId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/locations/states/${countryId}`, { cache: 'no-store' });
            return await response.json();
        } catch (error) {
            console.error('Error fetching states:', error);
            return { success: false, data: [] };
        }
    },

    getCities: async (stateId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/locations/cities/${stateId}`, { cache: 'no-store' });
            return await response.json();
        } catch (error) {
            console.error('Error fetching cities:', error);
            return { success: false, data: [] };
        }
    }
};
