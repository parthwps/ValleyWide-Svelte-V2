<script lang="ts">
    export let data;
    let page = data.data.attributes;
    let seo = page.seo;
    import Seo from "$lib/components/Seo.svelte"
    import {Container} from 'sveltestrap';
    import Cta from '$lib/components/layout/Cta.svelte';
	import PageBanner from '$lib/components/layout/PageBanner.svelte';
    // import { fade, fly } from "svelte/transition";
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';
    const url = "https://api.valleywidebuilders.com/";

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});

</script>
<svelte:head>
    <Seo metaTitle = {seo.metaTitle || page.title || 'Privacy Policy'}
    metaDescription={seo.metaDescription}
    metaImage={seo.metaImage}
    metaSocial={seo.metaSocial}
    keywords={seo.keywords}
    metarobots={seo.metarobots}
    structuredData={seo.structuredData}
    canonicalURL={seo.canonicalURL} />
</svelte:head>
<PageBanner title="{data.data.attributes.title ? data.data.attributes.title : 'Privacy Policy'}" extraClass="privacy" subTitle="{data.data.attributes.Subheading ? data.data.attributes.Subheading : ''}"  banner="{url}{data.data.attributes.Cover.data.attributes.url}"/>

<section class="content">
    <Container class="mw-1000 h-text">
        <h2 class="text-center mb-5 text-animate secondary-font" in:textAnimate id="privacy_heading" gsap-duration="1.5" gsap-start="top 90%">{data.data.attributes.Heading ? data.data.attributes.Heading : ''}</h2>
        <div in:fadeIn id="privacy_content" gsap-duration="1" gsap-start="top 90%">{@html data.data.attributes.Content ? data.data.attributes.Content : ''}</div>
    </Container>
</section>
<Cta/>
<style lang="scss">
.content{
    padding: 0 1.375rem;
    h2 {
        color: $black-color;
        justify-content: center;
    }
    :global(p){
        line-height: 1.7rem !important; 
        text-align: justify;       
    }
    :global(h3){
        padding-bottom: 0.971rem;
        font-size: 2.25rem;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: $black-color;
        font-weight: 400;
    }         
    :global(img){
        height: 1.2rem;
    }    
}
</style>