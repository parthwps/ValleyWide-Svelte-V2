import axios from 'axios';

import { STRAPI_API } from '$env/static/private';
export async function load() {
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const url = 'https://vwapi.netdevs.net/api/article?populate=deep';
    const response = await axios.get(url, { headers });
    const urlCategories = 'https://vwapi.netdevs.net/api/blog-categories?populate=deep';
    const categories = await axios.get(urlCategories, { headers }); 

    const urlSiteSettings = 'https://vwapi.netdevs.net/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 
    return {
        page: response.data,
        categories: categories.data,
        fallback: siteSettings.data
    }
}