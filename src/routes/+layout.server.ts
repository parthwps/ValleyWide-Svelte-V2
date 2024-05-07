import axios from 'axios';
import { STRAPI_API } from '$env/static/private';

export async function load() {
    try {
        // Send multiple requests concurrently
        const [menuResponse, siteSettingsResponse] = await Promise.all([
            fetchMenu(),
            fetchSiteSettings()
        ]);

        return {
            data: menuResponse.data,
            fallback: siteSettingsResponse.data
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            error: 'Failed to fetch data'
        };
    }
}

async function fetchMenu() {
    const url = 'https://vwapi.netdevs.net/api/menus/1?nested&populate=*';
    const headers = {
        Authorization: `Bearer ${STRAPI_API}`
    };
    const response = await axios.get(url, { headers });
    return response;
}

async function fetchSiteSettings() {
    const url = 'https://vwapi.netdevs.net/api/site-setting?populate=deep,3';
    const headers = {
        Authorization: `Bearer ${STRAPI_API}`
    };
    const response = await axios.get(url, { headers });
    return response;
}
