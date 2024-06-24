<script lang="ts">
	import { Col, Container, Row } from 'sveltestrap';
	import PortfolioCarousel from '$lib/components/layout/PortfolioCarousel.svelte';
	import Contactform from '$lib/components/layout/Contactform.svelte';
	import Testimonial from '$lib/components/layout/Testimonial.svelte';
	import noFeatured from '$lib/img/blog-empty.webp';
	import { textAnimate, fly, fadeIn, slide, scaleUp } from '$lib/GsapAnimation.js';
	export let data;
	console.log(data.portfolio);
	const domain = 'https://valleywidebuilders.com';
	let fallback = data.fallback.data.attributes.fallbackImage.data;

	$: title = data.portfolio.data[0].attributes.title;
	$: projectHeading = data.portfolio.data[0].attributes.projectDetailHeading;
	$: images = data.portfolio.data[0].attributes.images.data;
	$: bannerQuotes = data.portfolio.data[0].attributes.bannerQuote;
	$: isFeatured = data.portfolio.data[0].attributes.isFeatured;
	$: projectDetailLocation = data.portfolio.data[0].attributes.projectDetailLocation;
	$: projectDetailTimeframe = data.portfolio.data[0].attributes.projectDetailTimeframe;
	$: ctaHeading = data.portfolio.data[0].attributes.ctaHeading;
	$: relatedPortfolioHeading = data.portfolio.data[0].attributes.relatedPortfolioHeading;

	$: relatedPortfolios = data.portfolios.data.sort(() => 0.5 - Math.random()).slice(0, 2);

	let name = '',
		email = '',
		subject = '',
		message = '',
		result = '';

	async function doContact() {}

	import { onMount } from 'svelte';
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});
</script>

<svelte:head>
	<title>{title ? title : 'Project'}</title>
</svelte:head>

<section class="portfolio-gallery">
	<Container>
		<Row>
			<Col class="text-center">
				<div class="portfolio-gallery__content">
					<p class="pre-head mb-4" in:slide id="single-portfolio-preheading" gsap-duration="1">
						Project
					</p>
					<h2 class="text-animate primary-font" in:textAnimate id="single-portfolio-heading">
						{title ? title : ''}
					</h2>
					<div in:fadeIn id="single-portfolio-cont" gsap-delay="0.5" gsap-duration="1.5">
						{@html data.portfolio.data[0].attributes.content
							? data.portfolio.data[0].attributes.content
							: ''}
					</div>
				</div>
			</Col>
		</Row>
		<Row class="portfolio-gallery__slider">
			<PortfolioCarousel {images} />
		</Row>
	</Container>
</section>

<section class="about-property">
	<!-- <Animate> -->
	<Container>
		<Row>
			<Col
				><h2 in:slide id="about-property-preheading" gsap-start="top 80%" gsap-duration="1">
					{projectHeading ? projectHeading : ''}
				</h2></Col
			>
		</Row>
		<Row>
			<Col md="12">
				<div class="about-property__content">
					<div class="about-property__content__heading">
						<div>
							<i>
								<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M18.9969 11.764C18.9833 11.6774 18.9742 11.5863 18.9559 11.5042C18.9423 11.4359 18.924 11.3767 18.9104 11.3129L18.8557 11.1033C18.842 11.044 18.8284 10.9894 18.8101 10.9347C18.7828 10.8527 18.7554 10.7707 18.7236 10.6932L18.6506 10.4973C18.637 10.4608 18.6279 10.4244 18.6096 10.3879C18.5641 10.274 18.5049 10.1647 18.4502 10.0553L18.3909 9.93229C18.3909 9.93229 18.3727 9.88673 18.3591 9.8685C18.2861 9.73637 18.2087 9.60879 18.1267 9.48121C18.113 9.45843 18.0948 9.43565 18.0811 9.40831C17.9717 9.23973 17.867 9.10759 17.7667 8.98001L17.7257 8.92534C17.6164 8.78864 17.4933 8.65195 17.3566 8.51526L17.3202 8.47426C16.2221 7.36706 14.7367 6.74283 13.1511 6.72461H13.0828C9.79307 6.72461 7.10938 9.40375 7.10938 12.7026C7.10938 16.0014 9.78851 18.6805 13.0828 18.6851H13.1557C14.7367 18.6669 16.2267 18.0381 17.3384 16.9126C17.4888 16.7577 17.6118 16.621 17.7211 16.4889C17.7394 16.4661 17.7531 16.4479 17.7667 16.4297C17.867 16.3021 17.9672 16.17 18.0629 16.0333C18.0948 15.9786 18.1084 15.9513 18.1267 15.9285C18.2087 15.8009 18.2907 15.6733 18.3591 15.5412C18.3682 15.523 18.3818 15.5002 18.3909 15.4819C18.4046 15.4501 18.4183 15.4182 18.4365 15.3863L18.4638 15.3361C18.514 15.2313 18.5686 15.1311 18.6096 15.0263C18.6233 14.9899 18.637 14.958 18.6506 14.9215L18.7236 14.721C18.7554 14.639 18.7873 14.5616 18.8101 14.4795C18.8284 14.4249 18.842 14.3656 18.8557 14.311L18.9104 14.0968C18.9286 14.0376 18.9423 13.9738 18.9559 13.91C18.9742 13.8234 18.9833 13.7323 18.9969 13.6457L19.0288 13.4361C19.0379 13.3951 19.0425 13.3541 19.0471 13.3177C19.0653 13.1172 19.0789 12.9122 19.0789 12.7071C19.0789 12.5021 19.0698 12.297 19.0471 12.0966C19.0425 12.0556 19.0334 12.0146 19.0288 11.9781L18.9969 11.7685V11.764Z" fill="#3D3D3D"/>
									<path d="M23.5422 20.5308C23.6015 20.4306 23.6652 20.3258 23.7518 20.1982C23.7609 20.18 23.7746 20.1663 23.7837 20.1481C23.9432 19.8519 24.1847 19.4145 24.1984 19.3963C25.1734 17.4872 25.6655 15.4322 25.6655 13.2816C25.6655 13.0493 25.661 12.8214 25.6518 12.5982C25.6518 12.4979 25.6382 12.4023 25.6336 12.3066L25.6199 12.1107C25.6199 12.0469 25.6108 11.9876 25.6063 11.9284C25.5971 11.8464 25.588 11.7689 25.5789 11.6869L25.5607 11.5138C25.5516 11.4318 25.5425 11.3497 25.5334 11.2632C25.5243 11.1994 25.5151 11.131 25.5015 11.0672L25.4741 10.8987C25.4605 10.803 25.4468 10.7118 25.4286 10.6207C25.4149 10.5478 25.4012 10.4704 25.383 10.3975L25.342 10.197C25.3283 10.1286 25.3147 10.0603 25.301 9.99194C25.2782 9.8917 25.2509 9.79602 25.2281 9.70033L25.1871 9.5363C25.1734 9.48618 25.1643 9.43606 25.1461 9.38139C25.1142 9.27659 25.0823 9.17179 25.0504 9.067L25.0094 8.93486C24.9957 8.88474 24.9775 8.83007 24.9638 8.7845C24.9319 8.67971 24.8909 8.57947 24.8545 8.47923L24.8043 8.34254C24.7861 8.29241 24.7724 8.24685 24.7542 8.20129C24.7087 8.08738 24.6631 7.97802 24.6175 7.86412L24.5629 7.74109C24.5492 7.70464 24.5355 7.67275 24.5218 7.6363C24.4535 7.48594 24.3852 7.34013 24.3123 7.19433L24.2621 7.08953C24.1892 6.94373 24.1118 6.80248 24.0161 6.6339L23.9796 6.56555C23.8931 6.41519 23.8019 6.26939 23.6971 6.1008C23.6971 6.1008 23.6744 6.05979 23.6698 6.05524C23.5741 5.90943 23.4739 5.76363 23.3645 5.60871C23.3645 5.60416 23.3418 5.57226 23.3372 5.56771C23.2278 5.41735 23.1139 5.27154 23.0046 5.13485C23 5.12574 22.9818 5.10751 22.9772 5.0984C22.8588 4.94804 22.7312 4.80224 22.5991 4.65188C22.4669 4.50607 22.3348 4.36482 22.1981 4.22813C19.9154 1.94084 16.7806 0.733398 13.1264 0.733398C5.73593 0.733398 0.578125 5.89121 0.578125 13.2816C0.578125 15.5644 1.16135 17.8243 2.26399 19.8064L2.45079 20.1526C2.45079 20.1526 2.46445 20.18 2.47356 20.1891L2.78795 20.6721C2.8244 20.7267 2.8563 20.7814 2.87453 20.8042L10.9028 34.2956H10.8983L12.7573 37.4258C12.8575 37.5944 13.0398 37.6992 13.2357 37.6992C13.4317 37.6992 13.6139 37.5944 13.7141 37.4213L15.5276 34.3002L23.3554 20.827C23.4238 20.7222 23.483 20.6311 23.5422 20.5308ZM20.1477 13.4229C20.1386 13.4912 20.1295 13.555 20.1204 13.6188L20.0976 13.7874C20.084 13.9013 20.0657 14.0152 20.0429 14.1246C20.0247 14.2111 20.0019 14.2932 19.9792 14.3797L19.9336 14.562C19.9153 14.644 19.8926 14.7215 19.8698 14.7989C19.8379 14.9037 19.7969 15.0085 19.7604 15.1133L19.7012 15.2773C19.6784 15.3366 19.6602 15.3912 19.6374 15.4505C19.5827 15.578 19.519 15.7056 19.4597 15.8286L19.405 15.9426C19.3868 15.9836 19.364 16.0291 19.3412 16.0701C19.2547 16.2296 19.1636 16.38 19.0633 16.5303C19.0269 16.5896 19.0086 16.6215 18.9904 16.6534C18.881 16.8174 18.7626 16.9723 18.6396 17.1272C18.6168 17.1591 18.6031 17.1773 18.5895 17.1956C18.4573 17.355 18.3115 17.5191 18.1566 17.6785C16.8125 19.0363 15.0492 19.779 13.1674 19.8018C13.1446 19.8018 13.1218 19.8018 13.0945 19.8018C9.18056 19.8018 6.00022 16.6169 6.00022 12.7075C6.00022 8.79817 9.18512 5.61327 13.0945 5.61327H13.1674C15.0446 5.63605 16.8079 6.3833 18.1338 7.71376L18.1657 7.74565C18.3252 7.90512 18.4619 8.06004 18.5895 8.21496C18.6077 8.23774 18.6213 8.25596 18.635 8.27419C18.7626 8.43366 18.881 8.59313 18.9904 8.75716C19.0086 8.7845 19.0269 8.8164 19.0451 8.84829C19.159 9.03055 19.2547 9.18091 19.3412 9.33582C19.364 9.37683 19.3823 9.42239 19.405 9.4634L19.4324 9.51808C19.5144 9.68211 19.5827 9.81424 19.6374 9.95093C19.6602 10.0102 19.683 10.0694 19.7058 10.1286L19.765 10.2881C19.806 10.3883 19.8424 10.4931 19.8743 10.5979C19.8971 10.6754 19.9199 10.7574 19.9381 10.8394L19.9837 11.0171C20.0065 11.1037 20.0293 11.1903 20.0475 11.2768C20.0703 11.3862 20.0839 11.5001 20.1022 11.614L20.1295 11.7826C20.1386 11.8464 20.1523 11.9102 20.1569 11.9785C20.1796 12.2154 20.1933 12.4615 20.1933 12.703C20.1933 12.9445 20.1796 13.186 20.1569 13.4229H20.1477Z" fill="#3D3D3D"/>
								</svg>
							</i>
							<span>
								{projectDetailLocation ? projectDetailLocation : ''}
							</span>
						</div>
						<div>
							<i>
								<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.337891 14.8076C0.337891 22.9891 6.96983 29.625 15.1553 29.625C23.3407 29.625 29.9727 22.9931 29.9727 14.8076C29.9727 6.62218 23.3407 -0.00976562 15.1553 -0.00976562C6.96983 -0.00976562 0.337891 6.62218 0.337891 14.8076ZM26.5975 14.8076C26.5975 21.1281 21.4757 26.2499 15.1553 26.2499C8.83482 26.2499 3.71301 21.1281 3.71301 14.8076C3.71301 8.48717 8.83482 3.36535 15.1553 3.36535C21.4757 3.36535 26.5975 8.48717 26.5975 14.8076Z" fill="#3D3D3D"/>
									<path d="M14.6289 6.0707V14.7529C14.6289 15.0053 14.8339 15.2143 15.0902 15.2143C15.3465 15.2143 15.5515 15.0092 15.5515 14.7529V6.0707C15.5515 5.81441 15.3465 5.60938 15.0902 5.60938C14.8339 5.60938 14.6289 5.81441 14.6289 6.0707Z" fill="#3D3D3D"/>
									<path d="M7.01684 18.1123C6.78421 18.2108 6.60678 18.3252 6.6265 18.3725C6.64621 18.4159 6.85124 18.3725 7.08387 18.2779L15.0998 14.9382C15.3324 14.8397 15.5098 14.7253 15.4901 14.678C15.4704 14.6346 15.2654 14.678 15.0327 14.7726L7.01684 18.1123Z" fill="#3D3D3D"/>
									<path d="M15.309 14.1416C14.9384 14.1416 14.6348 14.4413 14.6348 14.8158C14.6348 15.1904 14.9344 15.4901 15.309 15.4901H21.0025C21.3732 15.4901 21.6768 15.1904 21.6768 14.8158C21.6768 14.4413 21.3732 14.1416 21.0025 14.1416H15.309Z" fill="#3D3D3D"/>
									<path d="M14.0781 14.7284C14.0781 15.3632 14.5907 15.8758 15.2255 15.8758C15.8603 15.8758 16.3729 15.3632 16.3729 14.7284C16.3729 14.0936 15.8603 13.5811 15.2255 13.5811C14.5907 13.5811 14.0781 14.0936 14.0781 14.7284Z" fill="#3D3D3D"/>
								</svg>									
							</i>
							<span>
								{projectDetailTimeframe ? projectDetailTimeframe : ''}
							</span>
						</div>
					</div>
					<div class="about-property__content__paragraph">
						{@html data.portfolio.data[0].attributes.projectDetails
							? data.portfolio.data[0].attributes.projectDetails
							: ''}
					</div>
				</div>
			</Col>
		</Row>
	</Container>
	<!-- </Animate> -->
</section>

<!-- {#if isFeatured && projectHeading} -->

<section class="banners">
	<!-- <Animate> -->
	{#each bannerQuotes as bannerQuote, index}
		{#if bannerQuote.banner.data}
			<section
				in:scaleUp
				id="single-portfolio-bannerOnly{index}"
				gsap-start="top 90%"
				gsap-duration="2"
				class="fireplace section--bannerOnly image-scale-up"
				style="--lrbg: url({domain}{bannerQuote.banner.data.attributes.formats.large.url
					? bannerQuote.banner.data.attributes.formats.large.url
					: bannerQuote.banner.data.attributes.url})"
			/>
		{/if}
		<Testimonial testimonial={bannerQuote.quote} testimonial_id="testimonial{index}" />
	{/each}
	<!-- </Animate> -->
</section>

<section class="portfolio-cta">
	<!-- <Animate> -->
	<Container>
		<Row>
			<Col class="text-center" md={{ size: 8, offset: 2 }} xs="12">
				<div class="portfolio-cta__content">
					<h2 class="text-animate primary-font stc" in:textAnimate id="single-portfolio-cta-heading">
						{ctaHeading ? ctaHeading : 'Experience Living your Dreams'}
					</h2>
					<div in:fly id="single-portfolio-cta-cont" gsap-duration="1.2" gsap-y="50">
						{@html data.portfolio.data[0].attributes.content
							? data.portfolio.data[0].attributes.content
							: '<p>This Castle in Colorado exudes grandeur with its rugged, locally sourced stone walls and curved, wood and wrought iron staircases. Its traditional design is further enhanced by a mountain lion sculpture that guards the property.</p>'}
					</div>
				</div>
				<div
					class="portfolio-cta__btns"
					in:fly
					id="single-portfolio-cta-buttons"
					gsap-delay="0.5"
					gsap-duration="1.2"
					gsap-y="50"
				>
					<a
						href={data.portfolio.ctaLeftBtnUrl ? data.portfolio.ctaLeftBtnUrl : '/contact-us'}
						class="btn btn-secondary"
						>{data.portfolio.ctaLeftBtnTitle ? data.portfolio.ctaLeftBtnTitle : 'Talk to Us'}</a
					>
					<a
						href={data.portfolio.ctaRightUrl ? data.portfolio.ctaRightUrl : '/portfolio'}
						class="btn btn-inverted"
						>{data.portfolio.ctaRightBtnTitle
							? data.portfolio.ctaRightBtnTitle
							: 'Back to Portfolio'}</a
					>
				</div>
			</Col>
		</Row>
	</Container>
	<!-- </Animate> -->
</section>
<!-- {/if} -->
<section class="related {!projectHeading ? 'my-0' : ''}">
	<!-- <Animate> -->
	<Container>
		<Row>
			<Col md="12">
				<h2
					class="text-animate primary-font btc"
					in:textAnimate
					id="single-portfolio-related-heading"
				>
					{relatedPortfolioHeading ? relatedPortfolioHeading : 'Explore our Projects...'}
				</h2>
			</Col>
			{#each relatedPortfolios as rPortfolio, index}
				<Col md="6">
					<div
						class="related__article"
						in:fly
						id="related-items{index}"
						gsap-duration="1"
						gsap-delay={index / 2}
						gsap-y="30"
						gsap-start="top 90%"
					>
						<a href={rPortfolio.attributes.slug} data-sveltekit-reload class="zoomImg">
							{#if rPortfolio.attributes.featuredImage.data != null}
								<img
									loading="lazy"
									src="{domain}{rPortfolio.attributes.featuredImage.data.attributes.formats.large
										.url
										? rPortfolio.attributes.featuredImage.data.attributes.formats.large.url
										: rPortfolio.attributes.featuredImage.data.attributes.url}"
									alt={rPortfolio.attributes.featuredImage.data.attributes.alternativeText}
								/>
							{:else}
								<img
									loading="lazy"
									src={fallback ? domain + fallback.attributes.url : noFeatured}
									alt={rPortfolio.attributes.title}
								/>
							{/if}
							<div class="blue-bar">
								<span>{('0' + (index + 1)).slice(-2)}</span>
								{rPortfolio.attributes.title ? rPortfolio.attributes.title : ''}
								<i
									><svg
										width="8"
										height="14"
										viewBox="0 0 8 14"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595"
											stroke="#00ADEE"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
								</i>
							</div>
						</a>
					</div>
				</Col>
			{/each}
			<!-- <Col md="6">
					<div class="related__article">
						<a href="#">
							<img loading="lazy" src="{vailWood}" alt="vail">
							<div class="related__article__text">
								<span>02</span>
								Cordillera Sunsets
							</div>
						</a>
					</div>
				</Col>		 -->
		</Row>
	</Container>
	<!-- </Animate> -->
</section>

<!-- <Animate> -->
<Contactform />

<!-- </Animate> -->

<style lang="scss">
	:global(.portfolio-page .dropdown.show, .portfolio-page .dropdown-menu) {
		background-color: rgba(242, 237, 237, 0.2) !important;
	}
	.portfolio-gallery {
		padding: 7rem 0 10vw;
		margin-top: 0;
		margin-bottom: 0;
		overflow-x: hidden;
		&:before {
			content: '';
			display: block;
			background-image: linear-gradient($newheader, rgba(122, 120, 116, 0.4), $white-color), url('$lib/img/portfolio-background.webp');
			background-size: cover;
    		background-position: center;
			width: 100%;
			height: 60rem;
			position: absolute;
			top: 0;
			z-index: 0;
			@include media-max(sm) {
				height: 50rem;
			}
		}
		@include media-max(sm) {
			padding: 10vh 0 0;
		}
		&__content {
			padding: 4vw 2.375rem 2rem;
			border-top: 1px solid #CBC9C9;

			z-index: 1;
			position: relative;
			@include media-max(laptopS) {
				margin-top: 5vw;
			}
			@include media-max(ipadmini) {
				margin-top: 10vw;
			}
			@include media-max(sm) {
				padding: 3.75rem 2.375rem 2.25rem;
			}
			.pre-head {
				color: $primary-color;
				font-weight: 500;
			}
			h2 {
				margin: 0 0 1rem 0;
				font-size: 3.5rem;
				color: $white-color;
				justify-content: center;
				@include media-max(sm) {
					font-size: 2.5rem;
				}
			}
			:global(#single-portfolio-cont p) {
				margin-bottom: 1.5rem;
				line-height: 1.4;
			}
			:global(p) {
				line-height: 2;
				max-width: 800px;
				margin: 0 auto;
				color: $white-color;
			}
		}
	}

	:global(.portfolio-gallery__slider) {
		@include media-max(ipadmini) {
		}
	}

	.banners {
		min-height: 0;
		@include media-max(ipadmini) {
			padding-right: 0;
			padding-left: 0;
		}
	}

	.about-property {
		background-color: #fff;
		// margin-top: -4rem;
		margin: 0;
		padding: 4rem 0;
		min-height: unset;
		@include media-max(sm) {
			padding: 2.25rem 0 0;
		}
		h2 {
			margin-bottom: 2rem;
			color: $secondary-color;
			font-size: 2.25rem;
			font-weight: 400;
			@include media-max(sm) {
				padding: 0 2.375rem;
			}
		}
		&__content {
			background-color: rgb(61 61 61 / 10%);
			padding: 2rem 3rem 3rem;
			text-align: justify;
			@include media-max(sm) {
				padding: 3.75rem 1.375rem;
			}
			&__heading {
				margin-bottom: 3rem;
				@include media-max(sm) {
					margin-bottom: 1.5rem;
				}
				div {
					display: inline-block;
					&:first-child {
						margin-right: 3rem;
						@include media-max(sm) {
							margin-right: 0.5rem;
						}
					}
					i {
						margin-right: 1rem;
						@include media-max(sm) {
							margin-right: 0rem;
						}
						svg {
							height: 2rem;
							@include media-max(sm) {
								height: 1.5rem;
							}
						}
					}
					span {
						font-size: 1.438rem;
						font-weight: 500;
						letter-spacing: 0.029rem;
						font-feature-settings: 'pnum' on, 'lnum' on;
					}
				}
			}
			&__paragraph {
				column-count: 2;
				@include media-max(sm) {
					column-count: 1;
				}
				p {
					font-family: 1.25rem;
					line-height: 2.125rem;
					font-weight: 400;
				}
			}
		}
	}

	.fireplace {
		height: 45vw;
	}

	.living-room {
		height: 45vw;
	}

	.section--bannerOnly {
		margin: 0;
		background-image: var(--lrbg);
		background-size: cover;
		background-position: center;
	}
	.lv-thropy {
		height: 45vw;
	}

	.portfolio-cta {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 3rem 0;
		@include media-max(sm) {
			padding: 0;
			min-height: initial;
		}
		&__content {
			h2 {
				margin-bottom: 2rem;
				justify-content: center;
				@include media-max(sm) {
					padding: 0 1.375rem;
				}
			}
			p {
				max-width: 45rem;
				margin: 0 auto;
				line-height: 2;
			}
			#single-portfolio-cta-cont {
				@include media-max(sm) {
					padding: 0 1.375rem;
				}
			}
		}
		&__btns {
			margin: 2rem 0;
			display: flex;
			justify-content: center;
			@include media-max(sm) {
				margin-bottom: 0;
			}
			.btn-secondary {
				margin-right: 1.5rem;
				@include media-max(sm) {
					margin-right: 0.5rem;
				}
			}
			.btn-inverted {
				border-color: #CBC9C9;
				color: $secondary-color;
				&:hover {
					color: $white-color;
				}
			}
		}
	}

	.related {
		background: radial-gradient(67.63% 67.63% at 50% 54.9%, rgba(229, 223, 221, 0.21) 0%, rgba(127, 132, 113, 0.24) 70%, #7F8471 100%), url("/src/lib/img/portfolio-background.webp");
		background-position:center;
		background-size: cover;
		padding: 5rem 0;
		margin-bottom: 0;
		:global(.col-md-6) {
			padding: 1rem;
		}
		@include media-max(xs) {
			padding: 3.75rem 1rem 1.75rem;
		}
		h2 {
			text-align: center;
			margin-bottom: 2rem;
			justify-content: center;
			@include media-max(sm) {
				padding: 0 1rem;
			}
			@include media-max(xs) {
				margin-bottom: 1rem;
			}
		}
		&__article {
			overflow: hidden;
			position: relative;
			height: 30rem;
			@include media-max(ipadmini) {
				height: 20rem;
			}
			@include media-max(sm) {
				height: auto;
			}
			img {
				object-fit: cover;
				object-position: center;
				height: 100%;
			}
			@include media-max(sm) {
				margin-bottom: 1rem;
			}
			img {
				object-fit: cover;
				object-position: center;
				height: 100%;
			}
			&:hover {
				.related__article__text {
					background: $primary-color;
					transition: 1.5s;
					span {
						color: $white-color;
					}
					path {
						stroke: $white-color;
					}
				}
			}
		}
	}

	// .parallax-wrapper {
	// 	position: relative;
	// 	overflow: hidden;
	// }

	// .contact{
	// 	padding: 10rem 0;
	// 	background-image: var(--contactBG);
	// 	background-size: cover;
	// 	margin: 0;
	// 	&__content{
	// 		display: flex;
	// 		height: 100%;
	// 		align-items: end;
	// 		&__wrapper{
	// 			h2{
	// 				margin-bottom: 2rem;
	// 			}
	// 		}
	// 	}
	// 	&__form{
	// 		:global(#yourMessage){
	// 			height: 15rem;
	// 		}
	// 	}
	// }
</style>
