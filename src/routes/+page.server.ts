import axios from 'axios';
import { STRAPI_API } from '$env/static/private';

const baseUrl = 'https://vwapi.netdevs.net/api/';

export async function load() {
    try {
        const [homeResponse, siteSettingsResponse] = await Promise.all([
            axios.get(`${baseUrl}home-page?populate=deep,3`, { headers: getHeaders() }),
            axios.get(`${baseUrl}site-setting?populate=deep,3`, { headers: getHeaders() })
        ]);

        logResponseFromCache(homeResponse);
        logResponseFromCache(siteSettingsResponse);

        return {
            home: homeResponse.data,
            fallback: siteSettingsResponse.data
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            error: 'Failed to fetch data'
        };
    }
}

function getHeaders() {
    return {
        rel: 'preconnect',
        Authorization: `Bearer ${STRAPI_API}`
    };
}

function logResponseFromCache(response) {
    if (response.fromCache) {
        console.log('Response from cache:', response.config.url);
    } else {
        console.log('Response from server:', response.config.url);
    }
}

// import axios from 'axios';
// import { STRAPI_API } from '$env/static/private';

// export async function load() {
//     const url = 'https://vwapi.netdevs.net/api/home-page?populate=deep,3';
    
//     const headers = {
//         rel: 'preconnect',
//         Authorization: 'Bearer ' + STRAPI_API
//     }    
//     const response = await axios.get(url, { headers });

//     const urlSiteSettings = 'https://vwapi.netdevs.net/api/site-setting?populate=deep,3';
//     const siteSettings = await axios.get(urlSiteSettings, { headers }); 

//     if (response.fromCache) {
//         console.log("Response from cache");
//       } else {
//         console.log("Response from server");
//       }    

//     // return response.data;
//     return {
//       home: response.data,
//       fallback: siteSettings.data
//   }
// }                                                                     