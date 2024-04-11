import { STRAPI_API } from '$env/static/private';

export async function load() {
    const url = 'https://vwapi.netdevs.net/api/privacy-policy-page?populate=*';
    const response = await fetch(url, {
        headers: { 'Authorization': 'bearer ' + STRAPI_API },
    });
    return response.json();
}