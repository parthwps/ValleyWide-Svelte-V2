// @ts-nocheck
import axios from 'axios';
import { STRAPI_API } from '$env/static/private';
export const load = async ({ params, fetch }: Parameters<PageLoad>[0]) => {
    const url = 'https://vwapi.netdevs.net/api/blogs?filters[slug][$eq]=' + params.slug + '&populate=deep';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const response = await axios.get(url, { headers });

    const urlblog = 'https://vwapi.netdevs.net/api/blogs?populate=deep';
    const blogs = await axios.get(urlblog, { headers }); 
    return {
        page: response.data,
        blogs: blogs.data,
        num: Math.ceil(Math.random() * 10)
    }
}
