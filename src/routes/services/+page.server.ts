import { STRAPI_API } from '$env/static/private';
import axios from 'axios';

export async function load() {
    const url = 'https://vwapi.netdevs.net/api/our-services-page?populate=*';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }  
    const response = await axios.get(url, { headers });

    const urlPortfolios = 'https://vwapi.netdevs.net/api/portfolios?fields[0]=title&fields[1]=slug&populate[2]=featuredImage';
    // const urlPortfolios = 'https://vwapi.netdevs.net/api/portfolios?populate=deep';
    const portfolios = await axios.get(urlPortfolios, { headers }); 

    const urlSiteSettings = 'https://vwapi.netdevs.net/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    // return response.json();
    return {
        services: response.data,
        portfolios: portfolios.data,
        fallback: siteSettings.data
    }
}

