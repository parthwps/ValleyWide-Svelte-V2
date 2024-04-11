export const prerender = 'auto';
import axios from 'axios';
import { STRAPI_API } from '$env/static/private';

export async function load() {
    const url = 'https://vwapi.netdevs.net/api/portfolio-page?populate=deep,5';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }    
    const response = await axios.get(url, { headers });

    const urlProperties = 'https://vwapi.netdevs.net/api/portfolios?fields[0]=title&fields[1]=slug';
    const properties = await axios.get(urlProperties, { headers }); 

    const urlSiteSettings = 'https://vwapi.netdevs.net/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    return {
        portfolio: response.data,
        properties: properties.data,
        fallback: siteSettings.data
    }
}                                                                     