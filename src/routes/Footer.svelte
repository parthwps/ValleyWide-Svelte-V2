<script lang="ts">
import { Col, Container, Row } from 'sveltestrap';
import { onMount } from "svelte";
import axios from 'axios';
import { fadeIn } from '$lib/GsapAnimation.js';
const domain = "https://api.ulfbuilt.com"
import { PUBLIC_STRAPI_API } from '$env/static/public';

let promise = fetchCta();
async function fetchCta(){
    const url = 'https://api.ulfbuilt.com/api/footer?populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + PUBLIC_STRAPI_API
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data.data.attributes.widget;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

let promiseSite = fetchSiteSettings();
async function fetchSiteSettings(){
    const url = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + PUBLIC_STRAPI_API
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data.data.attributes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMount(() => {
    promise = fetchCta();
    promiseSite = fetchSiteSettings();
});	

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>
<div class="pre-footer">
    <Container>
        <Row>
            <Col>
                <div class="pre-footer__btt" on:click="{scrollToTop}">
                    <svg width="30" height="11" viewBox="0 0 30 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.44043 8.96631L15.4066 1.71729L28.5605 8.96631" stroke="white" stroke-width="2" stroke-linecap="square"/>
                    </svg>
                    <span>TOP</span>    
                </div>
            </Col>
        </Row>
    </Container>
</div>
<footer class="footer">
    <!-- <Animate> -->
        <Container>
            <Row>
                {#await promise}
                {:then widgets}     
                    {#each widgets as widget, index}
                        <Col class="footer__col">
                            <div class="footer__widget1 footer--widget" in:fadeIn id="footer-items{index}" gsap-duration="1" gsap-delay={index/2}>
                                {#if widget.title }
                                    <div class="footer__widget__heading">
                                        <h5>{widget.title}</h5>
                                    </div>
                                {/if}
                                {#each widget.item as item}
                                    <div class="footer__widget footer__widget--item">
                                        {@html item.item ? item.item : ''}
                                    </div>                            
                                {/each}
                            </div>                  
                        </Col>
                    {/each}
                {/await}
            </Row>        
            <Row>
                <Col>
                    {#await promiseSite}
                    {:then siteSettings}   
                    <div class="footer__post-footer">
                        <div class="footer__post-footer__social">
                            {#if siteSettings.SiteDetails.fbLink}
                            <span class="footer__post-footer__social__icon footer__post-footer__social__icon--fb">
                                <a href="{siteSettings.SiteDetails.fbLink ? siteSettings.SiteDetails.fbLink : '#'}" target="_blank">
                                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6965 11.2879L11.245 7.70923H7.8112V5.38702C7.8112 4.40751 8.28995 3.45368 9.82892 3.45368H11.3899V0.406921C11.3899 0.406921 9.97382 0.164795 8.61829 0.164795C5.78981 0.164795 3.94085 1.87802 3.94085 4.98164V7.70923H0.796875V11.2879H3.94085V19.9403C4.57184 20.0393 5.21751 20.0907 5.87602 20.0907C6.53453 20.0907 7.1802 20.0393 7.8112 19.9403V11.2879H10.6965Z" fill="white"/>
                                    </svg>                                    
                                </a>
                            </span>
                            {/if}
                            {#if siteSettings.SiteDetails.ytLink}
                            <span class="footer__post-footer__social__icon footer__post-footer__social__icon--yt">
                                <a href="{siteSettings.SiteDetails.ytLink ? siteSettings.SiteDetails.ytLink : '#'}" target="_blank">
                                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.466 2.15357C16.2771 1.4437 15.7176 0.884243 15.0059 0.693477C13.7182 0.348631 8.55655 0.348633 8.55655 0.348633C8.55655 0.348633 3.39486 0.348631 2.10719 0.693477C1.39732 0.884243 0.837859 1.44187 0.647093 2.15357C0.302247 3.44124 0.302246 6.12664 0.302246 6.12664C0.302246 6.12664 0.302247 8.81204 0.647093 10.0997C0.836025 10.8096 1.39549 11.369 2.10719 11.5598C3.39486 11.9047 8.55655 11.9047 8.55655 11.9047C8.55655 11.9047 13.7182 11.9047 15.0059 11.5598C15.7158 11.369 16.2752 10.8114 16.466 10.0997C16.8109 8.81204 16.8109 6.12664 16.8109 6.12664C16.8109 6.12664 16.8109 3.44124 16.466 2.15357ZM6.90569 8.60293V3.65035L11.1943 6.12664L6.90569 8.60293Z" fill="white"/>
                                    </svg>                                                                      
                                </a>
                            </span>   
                            {/if}
                            {#if siteSettings.SiteDetails.liLink}
                            <span class="footer__post-footer__social__icon footer__post-footer__social__icon--insta">
                                <a href="{siteSettings.SiteDetails.liLink ? siteSettings.SiteDetails.liLink : '#'}" aria-label="Linkedin" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#ffffff" viewBox="0 0 50 50">
                                        <path d="M 8 3.0097656 C 4.53 3.0097656 2.0097656 5.0892187 2.0097656 7.9492188 C 2.0097656 10.819219 4.59 12.990234 8 12.990234 C 11.47 12.990234 13.990234 10.870625 13.990234 7.890625 C 13.830234 5.020625 11.36 3.0097656 8 3.0097656 z M 3 15 C 2.45 15 2 15.45 2 16 L 2 45 C 2 45.55 2.45 46 3 46 L 13 46 C 13.55 46 14 45.55 14 45 L 14 16 C 14 15.45 13.55 15 13 15 L 3 15 z M 18 15 C 17.45 15 17 15.45 17 16 L 17 45 C 17 45.55 17.45 46 18 46 L 27 46 C 27.552 46 28 45.552 28 45 L 28 30 L 28 29.75 L 28 29.5 C 28 27.13 29.820625 25.199531 32.140625 25.019531 C 32.260625 24.999531 32.38 25 32.5 25 C 32.62 25 32.739375 24.999531 32.859375 25.019531 C 35.179375 25.199531 37 27.13 37 29.5 L 37 45 C 37 45.552 37.448 46 38 46 L 47 46 C 47.55 46 48 45.55 48 45 L 48 28 C 48 21.53 44.529063 15 36.789062 15 C 33.269062 15 30.61 16.360234 29 17.490234 L 29 16 C 29 15.45 28.55 15 28 15 L 18 15 z"></path>
                                    </svg>
                                </a>
                            </span>
                            {/if}
                            {#if siteSettings.SiteDetails.igLink}
                            <span class="footer__post-footer__social__icon footer__post-footer__social__icon--insta">
                                <a href="{siteSettings.SiteDetails.igLink ? siteSettings.SiteDetails.igLink : '#'}" aria-label="Instagram" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#ffffff" viewBox="0 0 50 50">
                                        <path d="M 16.5 5 C 10.16639 5 5 10.16639 5 16.5 L 5 31.5 C 5 37.832757 10.166209 43 16.5 43 L 31.5 43 C 37.832938 43 43 37.832938 43 31.5 L 43 16.5 C 43 10.166209 37.832757 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 36.211243 8 40 11.787791 40 16.5 L 40 31.5 C 40 36.211062 36.211062 40 31.5 40 L 16.5 40 C 11.787791 40 8 36.211243 8 31.5 L 8 16.5 C 8 11.78761 11.78761 8 16.5 8 z M 34 12 C 32.895 12 32 12.895 32 14 C 32 15.105 32.895 16 34 16 C 35.105 16 36 15.105 36 14 C 36 12.895 35.105 12 34 12 z M 24 14 C 18.495178 14 14 18.495178 14 24 C 14 29.504822 18.495178 34 24 34 C 29.504822 34 34 29.504822 34 24 C 34 18.495178 29.504822 14 24 14 z M 24 17 C 27.883178 17 31 20.116822 31 24 C 31 27.883178 27.883178 31 24 31 C 20.116822 31 17 27.883178 17 24 C 17 20.116822 20.116822 17 24 17 z"></path>
                                    </svg>
                                </a>
                            </span>
                            {/if}                                  
                        </div>
                        <div class="footer__post-footer__paragraph">
                            <p>{siteSettings.SiteDetails.OperatingHours ? siteSettings.SiteDetails.OperatingHours.replace(/(<([^>]+)>)/gi, "") : ''}</p>
                        </div>
                    </div>
                    {/await}
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</footer>
<style lang="scss">
    :global(.col.footer__col){
        &:nth-child(3){
            display: none;
        }
        @include media-max(sm){
            flex: 100%;
            margin-bottom: 3rem;
            p{
                max-width: 20rem;
            }
        }
    }
    :global(.footer__widget--item p) {
        width: 80%;
        @include media-max(ipadmini){
            width: 100%;
        }
    }
    :global(.footer__widget--item p br) {
        display: none;
    }
    .footer svg{
        width:22px;
        height:22px;
        @include media-max(sm){
            width: 34px;
            height: 34px;    
        }
    }
</style>