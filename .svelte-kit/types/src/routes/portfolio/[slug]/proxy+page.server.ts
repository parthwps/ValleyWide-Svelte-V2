// @ts-nocheck
import axios from 'axios';
import { STRAPI_API } from '$env/static/private';


export const load = async ({ params, fetch }: Parameters<PageLoad>[0]) => {
    const url = 'https://vwapi.netdevs.net/api/portfolios?filters[slug][$eq]='+params.slug+'&populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }    
    const response = await axios.get(url, { headers });

    const urlporfolios = 'https://vwapi.netdevs.net/api/portfolios?fields[0]=title&fields[1]=slug&populate[2]=featuredImage';
    const portfolios = await axios.get(urlporfolios, {headers});

    const urlSiteSettings = 'https://vwapi.netdevs.net/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    return {
        portfolio: response.data,
        portfolios: portfolios.data,
        fallback: siteSettings.data
    }
    // const response = await axios.get(url, { headers });

	// let randomCat = response.data.data[0].attributes.categories.data;
	// randomCat = randomCat[Math.floor(Math.random() * randomCat.length ) ].id;

    // const rpUrl = 'https://vwapi.netdevs.net/api/portfolios?filters[categories][id][$eq]='+randomCat+'&populate=deep,2';
    // const rData = await axios.get(rpUrl, { headers });
    // const rPortfolios = getRandomPortfolios(rData.data.data, 2);
    // const portfolio = response.data;
    // return {
    //     portfolio,
    //     rPortfolios
    // };

    // function getRandomPortfolios(arr, count) {
    //     const shuffled = [...arr].sort(() => 0.5 - Math.random());
    //     return shuffled.slice(0, count);
    // }
}