import axios from 'axios';
import { STRAPI_API } from '$env/static/private';


export async function load(params: { params: { slug: string; }; }) {
    const url = 'https://vwapi.netdevs.net/api/team-members?filters[slug][$eq]='+params.params.slug+'&populate=deep';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const response = await axios.get(url, { headers });
    return response.data;
}                                                                     