import axios from 'axios';
import { STRAPI_API } from '$env/static/private';

export async function load(){
    const url = 'https://api.ulfbuilt.com/api/menus/1?nested&populate=*';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    };
    const urlSiteSettings = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    try {
        const response = await axios.get(url, { headers });
        return {
            data: response.data,
            fallback: siteSettings.data
        }
    } catch (error) {
        console.log(error);
    }    
}