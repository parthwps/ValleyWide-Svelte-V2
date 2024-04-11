import { STRAPI_API } from '$env/static/private';
import axios from 'axios';

export async function load() {
    const url = 'https://vwapi.netdevs.net/api/about-us?populate=*';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }  
    const response = await axios.get(url, { headers });

    // const response = await fetch(url, {
    //     headers: { 'Authorization': 'bearer ' + STRAPI_API },
    // });
    const urlTestimonials = 'https://vwapi.netdevs.net/api/testimonials?populate=deep';
    const testimonials = await axios.get(urlTestimonials, { headers }); 

    // return response.json();
    return {
        about: response.data,
        testimonials: testimonials.data,
    }
}