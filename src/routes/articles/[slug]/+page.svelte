<script lang="ts">
    import { Form, FormGroup, Input, Label, Col, Container, Row } from 'sveltestrap';
    import Cta from '$lib/components/layout/Cta.svelte';
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';
    export let data;
    const url = 'https://api.ulfbuilt.com';

    $: num = data.num;
    $: num2 = data.num+3;
    $: filteredItems = data.blogs.data.slice(num, num2);
    
    $: title = data.page.data[0].attributes.title;
    $: content = data.page.data[0].attributes.blogtext;
    $: published = new Date(Date.parse(data.page.data[0].attributes.publishedAt)).toLocaleString('default', { month: 'long',  day: 'numeric' });
    $: location = data.page.data[0].attributes.location ? data.page.data[0].attributes.location : 'Vail, Colorado';
    $: minutesRead = data.page.data[0].attributes.minutesRead ? data.page.data[0].attributes.minutesRead : '2';
    
    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});
</script>
<svelte:head>
    <!-- <Seo metaTitle = {seodata.seo[0].metaTitle}
	metaDescription = {seodata.seo[0].metaDescription}
	metaImage = {url}{seodata.seo[0].metaImage.data.attributes.url}
	metaSocial = {seodata.seo[0].metaSocial}
	keywords = {seodata.seo[0].keywords}
	metarobots = {seodata.seo[0].metarobots}
	structuredData = {seodata.seo[0].structuredData}
	metaViewport = {seodata.seo[0].metaViewport}
	canonicalURL = {seodata.seo[0].canonicalURL} /> -->
</svelte:head>

<div class="cover" style="background:#1E2D39;">
<Container>
    <div class="cover__covertitle">
        <p class="pfont ptc mb-1 pt-3 article" in:slide id="single_article_pre" gsap-duration="1">Article</p>
        <!-- class="text-animate" in:textAnimate id="single_article_heading" gsap-duration="0.5" -->
        <h1 class="pfont stc mb-4 text-animate" in:textAnimate id="single_article_title" gsap-duration="1.3">{title ? title : ''}</h1>
        <p class="ptc pb-5" in:fly id="single_article_detail" gsap-duration="1" gsap-delay="1" gsap-y="10">{location} · {published}</p>
        <!-- · {minutesRead} {minutesRead > '1' || !minutesRead ? 'mins' : 'min'}. read -->
    </div>
</Container>
    
 <div class="cover__coverimg" in:fadeIn id="single_article_img" gsap-duration="1" style="background-image:url({url}{data.page.data[0].attributes.featuredimage.data.attributes.formats.large.url ? data.page.data[0].attributes.featuredimage.data.attributes.formats.large.url : data.page.data[0].attributes.featuredimage.data.attributes.url});"></div>
 
</div>
<section class="content">
    <!-- <Animate> -->
        <Container class="py-4">
            <h2 class="pb-3 sblue text-animate secondary-font" in:textAnimate id="single_article_content_heading" gsap-duration="1.3">{title ? title : ''}</h2>
            <div class="two-columns">
                <p>
                {@html content ? content : ''}
            </p>
            </div>
        </Container>
    <!-- </Animate> -->
</section>
<section class="related-articles">
    <!-- <Animate> -->
        <Container>
            <h2 class="text-center pb-4 text-animate secondary-font" in:textAnimate id="about_related_title" gsap-duration="1.3">Related Articles</h2>
            <Row>
                {#each filteredItems as blog,i (blog.id)}
                <Col md="4" class="pb-5">
                    <div in:fly id="related-items{i}" gsap-duration="1" gsap-delay={i/2} gsap-y="30">
                        <!-- <Animate> -->
                            {#if blog.attributes.featuredimage.data}
                            <div class="related-articles__easein-container">
                                <div class="easein-img">
                                    <a href="/articles/{blog.attributes.slug ? blog.attributes.slug : '#'}" class="zoomImg"> 
                                        <img loading="lazy" src="{url}{blog.attributes.featuredimage.data.attributes.formats.large.url ? blog.attributes.featuredimage.data.attributes.formats.large.url : blog.attributes.featuredimage.data.attributes.url}" alt="blogtitle" class="blog-img w-100">
                                    </a>
                                </div>
                            </div>
                            {/if}
                            <h3 class="pt-3"><a href="/articles/{blog.attributes.slug ? blog.attributes.slug : '#'}">{blog.attributes.title ? blog.attributes.title : ''}</a></h3>
                            <p>{blog.attributes.location ? blog.attributes.location : 'Vail, Colorado'} · {new Date(Date.parse(blog.attributes.publishedAt)).toLocaleString('default', { month: 'long',  day: 'numeric' })}</p>
                            <!-- {blog.attributes.minutesRead ? blog.attributes.minutesRead : '2'} {blog.attributes.minutesRead > '1' || !blog.attributes.minutesRead ? 'mins' : 'min'}. read -->
                        <!-- </Animate> -->
                    </div>
                </Col>
                {/each}
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
<Cta/>
<style lang="scss">
    :global(.article-page .dropdown.show, .article-page .dropdown-menu) {
		background-color: rgba(242, 237, 237, 0.20) !important;
	}
.cover{
    padding-top: 8rem;
    margin-bottom: 18.75rem;
    height: 48.125rem;
    @include media-max(sm){
        // height: 24.375rem;
        height: 37.375rem;
        margin-bottom: 12.5rem;
    }
    @include media-max(xs){
        height: 33.125rem;
        margin-bottom: 10rem;
        padding-top: 3rem;
    }
    &__covertitle{
        width:100%;
        max-width:50rem;
        margin: auto;
        @include media-max(ipadmini){
            padding: 0 3rem;
        }
        @include media-max(sm){
            padding: 0;
        }
        p{
            text-align: left;
            color: $gray;
            font-size: 1.125rem;
            font-weight: 500;
            font-feature-settings: 'pnum' on, 'lnum' on;
            &.article {
                color: $primary-color;
                font-size: 1.45rem;
                font-weight: 500;
            }
        }
        h1 {
            font-size: 3.45rem;
            font-weight: 400;
            color: $white-color;
            // flex-wrap: wrap;
            @include media-max(xs){
                font-size: 2.125rem;
                padding-top: 0;
            }
        }
    }
    &__coverimg{
        // height: 100vh;
        height: 39.5rem;
        width: 100%;
        max-width: 80%;
        margin-bottom: -16.25rem;
        background-size: cover;
        // align-self:flex-start;
        background-position: center;
        @include media-max(sm) {
            margin-bottom: -11.875rem;
            max-width: 100%;
        }
        @include media-max(xs){
            height: 11.75rem;
        }
    }
}
.content {
    .two-columns{
        overflow-wrap: break-word;
        gap: 3.5rem;
        font-size: 1.15rem;
        line-height: 2rem;
        padding: 3rem 0;
        @include media-max(sm){
            padding: 1rem 0;
        }
        p{
            margin: 0 .75rem 1rem .75rem;
        }
        h2{
            margin-left: .75rem;
            margin-right: .75rem;
        }
    }
    .sblue {
        color: $secondary-color;
        font-size: 2.75rem;
        @include media-max(sm){
            text-align: center;
        }
    }
}
.related-articles{
    background: #e5eef3;
    margin-bottom: 0;
    padding: 4.375rem 3.125rem 3.125rem 3.125rem;
    :global(.row){
        --bs-gutter-x: 1rem;
    }
    @include media-max(sm) {
        padding: 4.375rem 1rem 1.875rem 1rem;
    }
    h2 {
        font-size: 2.875rem;
        justify-content: center;
    }
    h3{
        margin: .5rem 0 .5rem 0;
        font-size: 1.75rem;
        font-weight: 400;
        text-wrap: nowrap;
        overflow: hidden;
        @include media-max(sm) {
            margin: 0.5rem 0 1rem 0;
        }
    }
    a{
        text-decoration: none;
        color: $secondary-color;
        font-family: $secondary-font;
    }
    p {
        color: $third-color;
        font-size: 1.25rem;
        font-weight: 500;
        @include media-max(sm) {
            font-weight: 500;
        }
    }
    &__easein-container{
        overflow: hidden;
        .easein-img{
            height: 20rem;            
            img{
                height: 100%;
                object-fit:cover;
                -o-object-fit: cover;
            }
        }
    }
}
@include media-max(sm){
    h2 {
        padding-top: 1rem;
        font-size: 2rem;
    }
}
</style>