<script lang="ts">
	export let data;
	import { lazyLoad } from '$lib/components/lazyload.js';
	import { Col, Container, Row } from 'sveltestrap';
	import Seo from '$lib/components/Seo.svelte';
	import Carousel4 from '$lib/components/layout/Carousel4.svelte';
	import ParallaxImage from '$lib/components/parallaxImage.svelte';
	import Cta from '$lib/components/layout/Cta.svelte';
	import PageBanner from '$lib/components/layout/PageBanner.svelte';
	import locbg from '$lib/img/blueBackground.webp';
	import axios from 'axios';
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	import { textAnimate, fly, slide, fly2, slowDownSection } from '$lib/GsapAnimation.js';

	let y = 0;
	const domain = 'https://api.ulfbuilt.com';
	const home = data.home.data.attributes;
	let fallback = data.fallback.data.attributes.fallbackImage.data;
	let propCount = 3;

	// Function for portfolio masonry
	let portfolioList = [];
	let loading;

	let activeTab = home.categories.data[0].id;
	function handleTabClick(category) {
		activeTab = category;
	}

	$: if (activeTab) {
		// Check if has new variable data
		loading = true;
		(async () => {
			const url =
				'https://api.ulfbuilt.com/api/portfolios?filters[categories][id][$eq]=' +
				activeTab +
				'&populate=deep,2';
			const headers = {
				Authorization: 'Bearer ' + PUBLIC_STRAPI_API
			};
			try {
				const response = await axios.get(url, { headers });
				portfolioList = response.data.data;
				loading = false;
				// new Promise((resolve) => {
				//     setTimeout(() => resolve(portfolioList = response.data.data), 500)
				// })
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		})();
	}

	import { onMount } from 'svelte';
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
		// stopSection();

		let updatedHeight = 0;
		const screenWidth = window.innerWidth;

		if (screenWidth > 768) {
			const myDiv = document.querySelector('.loc-gallery');
			const initialHeight = myDiv ? myDiv.clientHeight : 0;
			updatedHeight = initialHeight + 200;
			if (myDiv) {
				myDiv.style.height = updatedHeight + 'px';
			}
		}
	});

	//new slideup and down
	import arrowtop from '$lib/img/arrow-top.svg';
	let selectedIndex = 1;
	const updateSelectedOption = () => {
		const options = document.querySelectorAll('.option');
		options.forEach((option, index) => {
			if (index === selectedIndex) {
				option.classList.add('op-selected');

				if (index === 0) {
					const container = document.querySelector('.options');
					container.style.transform = 'translateY(25px)';
					option.click();
				}
				if (index === 1) {
					const container = document.querySelector('.options');
					container.style.transform = 'translateY(-25px)';
					option.click();
				}
				if (index === 2) {
					const container = document.querySelector('.options');
					container.style.transform = 'translateY(-75px)';
					option.click();
				}
			} else {
				option.classList.remove('op-selected');
			}
		});
	};
	const handleTopArrowClick = () => {
		if (selectedIndex > 0) {
			selectedIndex -= 1;
			updateSelectedOption();
		}
	};
	const handleBottomArrowClick = () => {
		const options = document.querySelectorAll('.option');
		if (selectedIndex < options.length - 1) {
			selectedIndex += 1;
			updateSelectedOption();
		}
	};

	let pageData = {
		metaTitle: 'Page Title',
		metaDescription: 'Page Description'
	};
</script>

<svelte:window bind:scrollY={y} />
<svelte:head>
	<!-- <title>{home.title ? home.title : 'Home'}</title> -->
	<Seo
		metaTitle={home.seo[0].metaTitle}
		metaDescription={home.seo[0].metaDescription}
		metaImage="{domain}{home.seo[0].metaImage.data.attributes.url}"
		metaSocial={home.seo[0].metaSocial}
		keywords={home.seo[0].keywords}
		metarobots={home.seo[0].metarobots}
		structuredData={home.seo[0].structuredData}
		metaViewport={home.seo[0].metaViewport}
		canonicalURL={home.seo[0].canonicalURL}
	/>
</svelte:head>

<PageBanner
	title={home.topBanner.heading ? home.topBanner.heading : 'Building Excellence'}
	subTitle={home.topBanner.paragraph ? home.topBanner.paragraph : ''}
	banner="{domain}{home.topBanner.background.data.attributes.formats.large_x2.url
		? home.topBanner.background.data.attributes.formats.large_x2.url
		: home.topBanner.background.data.attributes.url}"
	bannerMobile="{domain}{home.topBanner.background.data.attributes.formats.medium.url}"
	extraClass="homebanner"
	bannerheight="100"
	customtop="custom-top"
	transparent="1"
/>
<section
	class="loc-gallery mvw-10"
	style=" --loc-bg: url({locbg})"
	in:slowDownSection
	id="loc-gallery"
	gsap-start="top bottom"
>
	<Container>
		<Row>
			<Col xs="12" class="md:pb-4">
				<h2 class="text-div">
					{home.homeBuilderHeading ? home.homeBuilderHeading : ''}
				</h2>
				<div class="loc-gallery__cwrapper" id="build-trust">
					<div class="h3">
						{@html home.homeBuilderSubHeading ? home.homeBuilderSubHeading : ''}
					</div>
					<div class="text-justify">
						{@html home.homeBuilderParagraph ? home.homeBuilderParagraph : ''}
					</div>
				</div>
			</Col>
		</Row>
	</Container>
</section>

<section class="featured-projects mvw-10" id="featured-section">
	<Container class="featured-container">
		<Carousel4
			preHeading={home.featuredProjectsPreHeading ? home.featuredProjectsPreHeading : ''}
			heading={home.featuredProjectsHeading ? home.featuredProjectsHeading : ''}
			btnTitle={home.featurePropertyBtnTitle ? home.featurePropertyBtnTitle : 'Button'}
			btnUrl={home.featuredPropertyBtnUrl ? home.featuredPropertyBtnUrl : '#'}
			featuredProjects={home.featuredProjects}
		/>
	</Container>
</section>

<section class="flex-column-center" id="tnr">
	<div class="tnr">
		<ParallaxImage
			imageHeight="80"
			imageUrl="{domain}{home.midBanner.background.data.attributes.formats.medium_x2.url
				? home.midBanner.background.data.attributes.formats.medium_x2.url
				: home.midBanner.background.data.attributes.url}"
			medUrl="{domain}{home.midBanner.background.data.attributes.formats.large.url
				? home.midBanner.background.data.attributes.formats.large.url
				: home.midBanner.background.data.attributes.url}"
			overlay="1"
		/>
		<div class="tnr__wrapper">
			<Container>
				<div class="tnr__wrapper__captions text-div">
					<h2 class="text-animate" in:textAnimate id="tnr-heading" gsap-duration="1">
						{home.midBanner.heading ? home.midBanner.heading : ''}
					</h2>
					<p in:slide id="tnr-preheading" gsap-duration="1">
						{@html home.midBanner.paragraph ? home.midBanner.paragraph : ''}
					</p>
					<div in:fly id="tnr-button" gsap-delay="0.5" gsap-duration="1.2" gsap-y="50">
						<a href={home.midBanner.btnUrl ? home.midBanner.btnUrl : '#'} class="btn btn-secondary">
							{home.midBanner.btnTitle ? home.midBanner.btnTitle : 'Button'}
						</a>
					</div>
				</div>
			</Container>
		</div>
	</div>
</section>
<section class="tnr__mobile">
	<Row>
		<Container>
			<div class="tnr__wrapper__captions text-div">
				<h2 class="text-animate" in:textAnimate id="tnr-heading" gsap-duration="1">
					{home.midBanner.heading ? home.midBanner.heading : ''}
				</h2>
				<p in:slide id="tnr-preheading" gsap-duration="1">
					{@html home.midBanner.paragraph ? home.midBanner.paragraph : ''}
				</p>
				<div in:fly id="tnr-button" gsap-delay="0.5" gsap-duration="1.2" gsap-y="50">
					<a
						href={home.midBanner.btnUrl ? home.midBanner.btnUrl : '#'}
						class="btn btn-secondary text-center"
					>
						{home.midBanner.btnTitle ? home.midBanner.btnTitle : 'Button'}
					</a>
				</div>
			</div>
		</Container>
	</Row>
</section>

<section class="reputation" in:slowDownSection id="reputation-section" gsap-start="top 50%">
	<Container class="reputation_child">
		<Row>
			<Col md="7" class="">
				<div class="reputation__content">
					<div class="reputation__content__wrapper text-div">
						<p class="pre-head" in:slide id="reputation-preheading" gsap-duration="1.5">
							{home.reputation.preHeading ? home.reputation.preHeading : ''}
						</p>
						<h2
							class="text-animate secondary-font"
							gsap-duration="1"
							in:textAnimate
							id="reputation-heading"
						>
							{home.reputation.heading ? home.reputation.heading : ''}
						</h2>
						<div
							in:fly
							id="reputation-cont"
							class="text-justify"
							gsap-delay="1"
							gsap-duration="1.2"
							gsap-y="30"
						>
							<p>{@html home.reputation.content ? home.reputation.content : ''}</p>
							<a
								href={home.reputation.btnUrl ? home.reputation.btnUrl : '#'}
								class="btn btn-secondary"
								>{home.reputation.btnTitle ? home.reputation.btnTitle : 'Button'}</a
							>
						</div>
					</div>
				</div>
			</Col>
			<Col md="5" class="my-auto containerimg">
				<div class="childimg">
					{#if home.reputation.image.data}
						<img
							loading="eager"
							width="526"
							height="500"
							in:fly2
							id="reputation-img"
							use:lazyLoad={domain + home.reputation.image.data.attributes.formats.medium.url ||
								domain + home.reputation.image.data.attributes.url}
							alt={home.reputation.image.data.attributes.alternativeText
								? home.reputation.image.data.attributes.alternativeText
								: 'image'}
							srcset="{domain}{home.reputation.image.data.attributes.formats.medium.url
								? home.reputation.image.data.attributes.formats.medium.url
								: home.reputation.image.data.attributes.url} 768w"
							sizes="(max-width: 768px) 1024px"
						/>
					{/if}
				</div>
			</Col>
		</Row>
	</Container>
</section>

<section class="process" in:slowDownSection id="process-section" gsap-start="top 95%">
	<Container>
		<Row>
			<Col md="6" class="">
				<div class="process__top-image childimg2">
					{#if home.ourProcessTopImage.data}
						<img
							loading="eager"
							in:fly2
							width="509"
							height="440"
							id="process-top-img"
							gsap-y="-60"
							use:lazyLoad={domain +
								home.ourProcessTopImage.data[0].attributes.formats.medium.url ||
								domain + home.ourProcessTopImage.data[0].attributes.url}
							alt={home.ourProcessTopImage.data[0].attributes.alternativeText
								? home.ourProcessTopImage.data[0].attributes.alternativeText
								: 'image'}
							srcset="{domain}{home.ourProcessTopImage.data[0].attributes.formats.medium.url
								? home.ourProcessTopImage.data[0].attributes.formats.medium.url
								: home.ourProcessTopImage.data[0].attributes.url} 768w"
							sizes="(max-width: 768px) 1024px"
						/>
					{/if}
				</div>
			</Col>
		</Row>
		<Row>
			<Col md="7" class="">
				<div class="process__content containerimg2">
					<div class="process__content__wrapper">
						<p class="pre-head" in:slide id="process-preheading" gsap-duration="1">
							{home.ourProcessPreHeading ? home.ourProcessPreHeading : ''}
						</p>
						<h2
							class="text-animate secondary-font"
							in:textAnimate
							gsap-duration="1"
							id="process-heading"
						>
							{home.ourProcessHeading ? home.ourProcessHeading : ''}
						</h2>
						<div
							in:fly
							id="process-cont"
							class="text-justify"
							gsap-duration="1.2"
							gsap-delay="1"
							gsap-y="30"
						>
							{@html home.ourProcessParagraph ? home.ourProcessParagraph : ''}
							<a
								href={home.ourProcessButtonUrl ? home.ourProcessButtonUrl : '#'}
								class="btn btn-secondary"
								>{home.ourProcessButtonTitle ? home.ourProcessButtonTitle : 'Button'}</a
							>
						</div>
					</div>
				</div>
			</Col>
			<Col md="5" class="my-auto containerimg3">
				<div class="process__bottom childimg3">
					{#if home.ourProcessRightImage.data}
						<img
							loading="eager"
							in:fly2
							width="526"
							height="500"
							id="process-bottom-img"
							gsap-y="-150"
							src={domain + home.ourProcessRightImage.data.attributes.formats.medium.url ||
								domain + home.ourProcessRightImage.data.attributes.url}
							alt={home.ourProcessRightImage.data.attributes.alternativeText
								? home.ourProcessRightImage.data.attributes.alternativeText
								: 'image'}
							srcset="{domain}{home.ourProcessRightImage.data.attributes.formats.medium.url
								? home.ourProcessRightImage.data.attributes.formats.medium.url
								: home.ourProcessRightImage.data.attributes.url} 768w"
							sizes="(max-width: 768px) 1024px"
						/>
					{/if}
				</div>
			</Col>
		</Row>
	</Container>
</section>

<section class="story" in:slowDownSection id="story-section" gsap-start="top 95%">
	<Container>
		<Row>
			<Col md="7" class="">
				<div class="story__content">
					<div class="story__content__wrapper">
						<p class="pre-head" in:slide id="story-preheading" gsap-duration="1">
							{home.ourStoryPreHeading ? home.ourStoryPreHeading : ''}
						</p>
						<h2
							class="text-animate secondary-font"
							in:textAnimate
							id="story-heading"
							gsap-duration="1"
						>
							{home.ourStoryHeading ? home.ourStoryHeading : ''}
						</h2>
						<div
							in:fly
							id="story-cont"
							class="text-justify"
							gsap-delay="0"
							gsap-duration="1"
							gsap-y="30"
						>
							{@html home.ourStoryParagraph ? home.ourStoryParagraph : ''}
							<a
								href={home.ourStoryButtonURL ? home.ourStoryButtonURL : '#'}
								class="btn btn-secondary"
								>{home.ourStoryButtonTitle ? home.ourStoryButtonTitle : 'Button'}</a
							>
						</div>
					</div>
				</div>
			</Col>
			<Col md="5" class="my-auto containerimg4">
				<div class="childimg4">
					{#if home.ourStoryRightImage.data}
						<img
							loading="eager"
							in:fly2
							id="story-img"
							width="526"
							height="500"
							src={domain + home.ourStoryRightImage.data.attributes.formats.medium.url ||
								domain + home.ourStoryRightImage.data.attributes.url}
							alt={home.ourStoryRightImage.data.attributes.alternativeText
								? home.ourStoryRightImage.data.attributes.alternativeText
								: 'Image'}
						/>
					{/if}
				</div>
			</Col>
		</Row>
	</Container>
</section>

<!-- <section class="m-0 article-wrapper" id="article-wrapper">
	<ArticleSection />
</section> -->

<section class="m-0 cta-wrapper" id="cta-wrapper">
	<Cta />
</section>

<style lang="scss">
	//new slide up down
	.options-container {
		height: 100px;
		overflow: hidden;
		position: relative;
		margin: 2rem 0;
		font-family: $secondary-font;
	}
	.options {
		transform: translateY(-25px);
		font-size: 1.75rem;
		transition: all 0.5s ease-in-out, font-size 0.5s ease-in-out;
	}
	.option {
		height: 50px;
		/* background-color: red; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.options .op-selected {
		font-size: 2.35rem;
		transition: font-size 0.5s ease-in-out;
	}
	.arrow-top,
	.arrow-bottom {
		position: absolute;
		height: 25px;
		width: 100%;
		text-align: center;
	}
	.arrow-top {
		top: 0;
		background: -moz-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
		background: -webkit-linear-gradient(
			top,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
		display: flex;
		align-items: end;
	}
	.arrow-top img {
		height: 14px;
	}
	.arrow-bottom {
		bottom: 0;
		background: -moz-linear-gradient(
			bottom,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		background: -webkit-linear-gradient(
			bottom,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
		display: flex;
	}
	.arrow-bottom img {
		height: 14px;
		-webkit-transform: rotateX(180deg);
		transform: rotateX(180deg);
	}
	//new slide up down

	.homebanner {
		background-image: var(--banner);
		background-size: cover;
		min-height: 100vh;
		background-position: bottom;
		background-size: cover;
		padding-top: 9rem;
		margin: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		&__content {
			&__text {
				h1 {
					color: #fff;
					font-weight: 400;
					font-size: 3.5rem;
					margin-bottom: 2rem;
					span {
						font-family: $primary-font;
					}
				}
			}
			&__paragraph {
				color: #fff;
				font-size: 1.5rem;
			}
			&__btn {
				border: 1px solid #fff;
				padding: 1.5rem 4rem;
				text-decoration: none;
				color: #fff;
				font-family: $secondary-font;
				text-transform: lowercase;
				display: inline-block;
			}
		}
	}
	:global(.loc-gallery p) {
		@include media-max(sm) {
			text-align: center;
			margin: 0 2.375rem 1.375rem 2.375rem;
		}
	}
	:global(.loc-gallery .h3 span) {
		color: $primary-color;
	}
	.loc-gallery {
		// background: $secondary-color;
		// background-color: rgba(38,58,99,0.5);
		// background: var(--loc-bg);
		background-color: rgba(38, 58, 99, 0.7); /* Fallback color */
		background: var(--loc-bg, rgba(38, 58, 99, 0.7));
		padding: 0;
		margin: 0;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(38, 58, 99, 0.7); /* Adjust color and opacity */
			z-index: 0;
		}
		:global(.container) {
			position: relative;
			z-index: 1;
		}
		@include media-max(sm) {
			padding: 5rem 0;
		}
		.h3 {
			margin-bottom: 1.25rem;
			@include media-max(sm) {
				text-align: center;
			}
		}
		h2 {
			font-family: $secondary-font;
			margin-bottom: 1rem;
			color: $white-color;
			margin-bottom: 3rem;
			font-size: 3rem;
			justify-content: center;
			text-align: center;
			@include media-max(sm) {
				text-align: center;
				font-size: 2.25rem;
			}
		}
		&__cwrapper {
			max-width: 45rem;
			margin: auto;
			padding: 4rem 4rem 5rem 4rem;
			box-shadow: 0px 0px 10px #444;
			border-radius: 0.5rem;
			background: #fff;
			z-index: 1;
			@include media-max(sm) {
				margin: 1rem;
				padding: 3.75rem 0 2rem 0;
			}
			.h3 {
				text-transform: uppercase;
				font-size: 2.5rem;
				font-weight: 600;
				@include media-max(sm) {
					font-size: 2rem;
				}
				span {
					color: $primary-color;
				}
			}
			p {
				max-width: 36rem;
				margin: 0 auto;
				text-align: left;
			}
			:global(a) {
				color: $primary-color;
				text-decoration: none;
			}
		}
	}

	.categories {
		.row {
			.col {
				@include media-max(sm) {
					padding-left: 0px !important;
					padding-right: 0px !important;
				}
			}
		}
		// margin-top: 15vw;
		@include media-max(ipadmini) {
			padding-right: 0;
			padding-left: 0;
			margin: 20vw 0;
			padding-top: 10vw;
		}
		h2 {
			margin-bottom: 1rem;
			justify-content: center;
		}
		.view-all {
			margin-bottom: 2rem;
			span {
				color: $secondary-color;
				&:hover {
					cursor: pointer;
				}
			}
		}
		&__tabs {
			&__heading {
				ul {
					display: flex;
					width: 90%;
					margin: 1rem auto;
					padding-left: 0;
					justify-content: center;

					@include media-max(lg) {
						flex-wrap: nowrap;
						padding: 1rem 0;
						overflow-x: scroll;
						width: 100%;
					}

					@include media-max(xs) {
						flex-wrap: nowrap;
						padding: 1rem 0;
						justify-content: left;
					}
					@include media-max(sm) {
						overflow-x: scroll;
						justify-content: left;
					}
					li {
						list-style: none;
						width: 25%;
						border-right: 1px solid $gray;
						transition: 0.3s all;
						@include media-max(sm) {
							width: 15rem;
							padding: 0 1rem;
						}
						&:last-child {
							border: none;
						}
						&:hover {
							background-color: rgba(32, 36, 41, 0.561);
							transition: 0.3s all;
							span {
								color: #fff;
								&.active {
									color: #fff;
								}
							}
						}
						span {
							font-family: $secondary-font;
							font-size: 1.75rem;
							color: #d8d7d7;
							text-transform: uppercase;
							margin-bottom: 2em;
							font-weight: 500;
							cursor: pointer;
							@include media-max(lg) {
								font-size: 1.2rem;
							}
							&.active {
								color: $secondary-color;
								border-bottom-color: $secondary-color;
							}
						}
					}
				}
			}
			&__gallery {
				// min-height: 65vh; //for overflow scroll
				// @include media-max(default){
				// 	min-height: 50vh
				// }
				// @include media-max(sm){
				// 	min-height: 150vh
				// }
				position: relative;
				.list-text-details {
					position: absolute;
					top: 0;
					left: 50%;
					-webkit-transform: translateX(-50%);
					transform: translateX(-50%);
				}
			}
		}
		.masonry_container {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
			@include media-max(sm) {
				gap: 1rem;
				overflow-y: hidden;
				overflow-x: auto;
				white-space: nowrap;
				-webkit-overflow-scrolling: touch;
				scrolling: touch;
				padding-bottom: 10px;
				// &::-webkit-scrollbar {
				// 	width: 10px;
				// }
				// &::-webkit-scrollbar:horizontal {
				// 	height: 10px;
				// }
				// &::-webkit-scrollbar-track {
				// 	background-color: #ccc;
				// }
				// &::-webkit-scrollbar-thumb {
				// 	background: #263a63;
				// }
				// grid-template-columns: repeat(1, 1fr); //for-horizontal scroll
			}
			.masonry-items {
				color: white;
				text-align: center;
				height: 65vh;
				@include media-max(sm) {
					min-width: 300px; //for-horizontal scroll
				}
				@include media-max(default) {
					height: 50vh;
				}
				a {
					display: block;
					height: 100%;
					width: 100%;
					overflow: hidden;
					img {
						height: 100%;
						object-fit: cover;
					}
				}
				&__text {
					background-color: $secondary-color;
					color: #fff;
					padding: 0.5rem;
					position: absolute;
					z-index: 2;
					bottom: 1rem;
					left: 0;
					width: 75%;
					text-align: left;

					span {
						color: $primary-color;
						font-size: 1.2rem;
						margin: 0 0.8rem 0;
						@include media-max(sm) {
							font-size: 0.8rem;
						}
					}
				}
			}
		}
	}
	.tnr__mobile {
		display: none;
		@include media-max(ipadmini) {
			display: block;
		}
		@include media-max(sm) {
			display: block;
		}
		#tnr-preheading {
			text-align: justify;
		}
		h2 {
			text-align: center;
			@include media-max(sm) {
				margin-bottom: 1rem;
			}
		}
		#tnr-button {
			text-align: center;
			@include media-max(sm) {
				padding-top: 1rem;
				// padding-bottom: 1rem;
			}
		}
	}
	#tnr {
		// display: grid;
		// align-items: center;

		// @include media-max(xl){
		// 	align-items: end;
		// }

		@include media-max(laptopS) {
			padding-left: unset;
			padding-right: unset;
		}

		@include media-max(ipadmini) {
			min-height: auto;
		}

		.tnr {
			position: relative;
			overflow: hidden;
			:global(.container) {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: end;
				text-align: right;
			}
			@include media-max(sm) {
				margin-bottom: 0;
			}
			.tnr__wrapper {
				z-index: 2;
				position: absolute;
				color: #fff;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				&__captions {
					background: rgba(0, 0, 0, 0.65);
					padding: 20px 50px 40px;
					display: flex;
					flex-direction: column;
					@include media-max(ipadmini) {
						padding: 3rem;
						display: none;
					}
					@include media-max(sm) {
						padding: 1rem;
						position: absolute;
						bottom: 0;
						display: none;
					}
					#tnr-preheading {
						max-width: 44rem;
						margin-bottom: 2rem;
						line-height: 1.75;
						text-align: justify;
						@include media-max(sm) {
							margin: 0.5rem 0;
						}
					}
					#tnr-button {
						@include media-max(sm) {
							text-align: center;
							margin-bottom: 1rem;
						}
					}
				}
				p {
					font-size: 1.2rem;
					opacity: 0;
					@include media-max(ipadmini) {
						font-size: 1rem;
					}
				}
				h2 {
					font-family: $primary-font;
					margin: 1rem 0 2rem;
					text-transform: uppercase;
					font-size: 2.5rem;
					@include media-max(sm) {
						font-size: 2rem;
						text-align: center;
						margin: 0.5rem 0;
					}
					opacity: 0;
				}
			}
		}
	}

	.featured-projects {
		position: relative;
		@include media-max(ipadmini) {
			padding-top: 10vw;
		}

		@include media-max(sm) {
			padding: 0rem;
			margin: 3.75rem 0;
		}
	}

	:global(.featured-container) {
		@include media-max(sm) {
			padding: 0rem;
		}
		.row {
			@include media-max(sm) {
				padding: 0rem;
			}
		}
	}
	// 	// @include media-max(ipadmini){
	// 	// 	min-height: unset;
	// 	// }
	// 	// @include media-max(sm){
	// 	// 	margin-top: 10vw;
	// 	// }
	.reputation {
		margin: 0;
		// margin-top: 15vw;
		@include media-max(ipadmini) {
			margin: 35vw 0 0;
			padding-top: 20vw;
		}
		@include media-max(sm) {
			padding-top: unset;
		}
		&__content {
			height: 41.875rem;
			@include media-max(lg) {
				height: 30rem;
			}
			@include media-max(ipadmini) {
				height: 20rem;
			}
			@include media-max(sm) {
				height: auto;
			}
			display: flex;
			align-items: center;
			position: relative;
			&:after {
				position: absolute;
				background: #e5eef2;
				width: 135%;
				top: 5%;
				content: '';
				height: 90%;
				@include media-max(xl) {
					top: 0;
					height: 100%;
				}
				@include media-max(ipadmini) {
					top: unset;
					height: 175%;
				}
				@include media-max(sm) {
					width: 100vw;
					top: -3.75rem;
					margin-left: calc(50% - 50vw);
					height: 160%;
				}
			}
			&__wrapper {
				max-width: 38rem;
				z-index: 2;
				padding-left: 10rem;
				padding-right: 2rem;
				@include media-max(lg) {
					padding-left: 4rem;
				}
				@include media-max(md) {
					padding-left: 3rem;
				}
				@include media-max(sm) {
					padding-left: 1.375rem;
					padding-right: 1.375rem;
					margin-bottom: 2rem;
				}
				.pre-head {
					color: $third-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2 {
					margin: 1rem 0 2rem;
					line-height: 4.5rem;
					opacity: 0;
					@include media-max(lg) {
						line-height: 3rem;
						margin: 1rem 0;
					}
					@include media-max(sm) {
						text-align: center;
						line-height: 1.2;
						
					}
				}
				:global(p) {
					line-height: 2rem;
					margin-bottom: 2rem;
				}
				.btn {
					@include media-max(sm) {
						margin: 16px auto 32px;
						display: inherit;
					}
				}
			}
		}
		.childimg {
			padding-top: 15rem;
			@include media-max(ipadmini) {
				padding-top: 7rem;
			}
			@include media-max(sm) {
				padding-top: unset;
				// padding-bottom: 15rem;
			}
		}

		img {
			position: relative;
			z-index: 5;
			height: 31.25rem;
			width: 100%;
			object-fit: cover;
			@include media-max(lg) {
				height: 25rem;
			}
			@include media-max(ipadmini) {
				height: 15rem;
			}
			@include media-max(sm) {
				height: auto;
			}
		}
	}

	.process {
		// @include media-max(ipadmini){
		// 	margin: 20vw 0 15vw;
		// }
		margin: 0;
		@include media-max(ipadmini) {
			margin: 35vw 0;
		}
		@include media-max(sm) {
			// min-height: 50rem;
			margin: 0 0 3.75rem;
		}
		&__top-image {
			text-align: right;
			margin-bottom: -9rem;
			z-index: 5;
			position: relative;
			@include media-max(default) {
				text-align: center;
			}
			@include media-max(lg) {
				margin-left: 1.5rem;
			}
			@include media-max(ipadmini) {
				margin-bottom: -3rem;
			}
			@include media-max(sm) {
				text-align: left;
				margin-bottom: 0;
				margin-left: 0;
			}
			img {
				object-fit: cover;
				height: 27.5rem;
				width: 80%;
				@include media-max(lg) {
					height: 25rem;
					width: 100%;
				}
				@include media-max(ipadmini) {
					height: 15rem;
				}
				@include media-max(sm) {
					height: auto;
				}
			}
		}
		&__content {
			height: 35rem;
			@include media-max(ipadmini) {
				height: 30rem;
			}
			@include media-max(sm) {
				height: auto;
				margin-top: 3.75rem;
			}
			display: flex;
			align-items: center;
			position: relative;
			&:after {
				position: absolute;
				background: #f2f2f2;
				width: 135%;
				content: '';
				height: 100%;
				@include media-max(xl) {
					height: 120%;
				}
				@include media-max(sm) {
					width: 100vw;
					margin-left: calc(50% - 50vw);
					height: 150%;
				}
			}
			&__wrapper {
				max-width: 38rem;
				z-index: 2;
				padding-left: 10rem;
				padding-right: 2rem;
				@include media-max(lg) {
					padding-left: 4rem;
				}
				@include media-max(md) {
					padding-left: 3rem;
				}
				@include media-max(sm) {
					padding-left: 1.375rem;
					padding-right: 1.375rem;
				}
				.pre-head {
					color: $third-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2 {
					margin: 1rem 0 2rem;
					line-height: 4.5rem;
					@include media-max(lg) {
						line-height: 3rem;
						margin: 1rem 0;
					}
					@include media-max(sm) {
						text-align: center;
						line-height: 1.2;
					}
				}
				:global(p) {
					line-height: 2rem;
					margin-bottom: 2rem;
				}
				.btn {
					@include media-max(sm) {
						display: inherit;
						margin: 0 auto 3.75rem auto;
					}
				}
			}
		}
		&__bottom {
			@include media-max(sm) {
				text-align: right;
			}
			img {
				height: 31.25rem;
				width: 100%;
				object-fit: cover;
				@include media-max(lg) {
					height: 25rem;
				}
				@include media-max(ipadmini) {
					height: 15rem;
				}
				@include media-max(sm) {
					height: auto;
				}
			}
		}
		.childimg3 {
			padding-top: 15rem;
			@include media-max(ipadmini) {
				padding-top: 7rem;
			}
			@include media-max(sm) {
				padding-top: unset;
				// padding-bottom: 15rem;
			}
		}

		img {
			position: relative;
		}
	}
	.story {
		// @include media-max(ipadmini){
		// 	margin-top: 15vw;
		// }
		margin: 0;
		@include media-max(ipadmini) {
			padding-top: 25vw;
			margin: 20vw 0;
		}
		@include media-max(sm) {
			min-height: 70vh;
			padding-top: 3.75rem;
		}
		&__content {
			height: 41.875rem;
			@include media-max(lg) {
				height: 30rem;
			}
			@include media-max(ipadmini) {
				height: 20rem;
			}
			@include media-max(sm) {
				height: auto;
			}
			display: flex;
			align-items: center;
			position: relative;
			&:after {
				position: absolute;
				background: #e5eef2;
				width: 135%;
				content: '';
				height: 90%;
				@include media-max(xl) {
					top: 0;
					height: 100%;
				}
				@include media-max(ipadmini) {
					top: unset;
					height: 150%;
				}
				@include media-max(sm) {
					top: -3.75rem;
					width: 100vw;
					margin-left: calc(50% - 50vw);
					height: 200%;
				}
			}
			&__wrapper {
				max-width: 38rem;
				z-index: 2;
				padding-left: 10rem;
				padding-right: 2rem;
				@include media-max(lg) {
					padding-left: 4rem;
				}
				@include media-max(md) {
					padding-left: 3rem;
				}
				@include media-max(sm) {
					padding: 0 1.375rem;
				}
				.pre-head {
					color: $third-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2 {
					margin: 1rem 0 2rem;
					@include media-max(lg) {
						line-height: 3rem;
					margin: 1rem 0;

					}
					@include media-max(sm) {
						text-align: center;
						line-height: 1.2;
					}
				}
				:global(p) {
					line-height: 2rem;
					margin-bottom: 2rem;
					@include media-max(md) {
						margin-bottom: 0;
					}
				}
				.accordion {
					.accordion-item {
						background-color: transparent;
					}
					h4 {
						color: #000;
					}
					span {
						font-family: 'Raleway';
						font-style: normal;
						font-weight: 600;
						font-size: 2rem;
						color: #aca7a7;
						margin-right: 1rem;
					}
				}
				.btn {
					@include media-max(sm) {
						margin: 2rem auto 3.75rem;
						display: inherit;
					}
				}
			}
		}
		.childimg4 {
			padding-top: 15rem;
			@include media-max(ipadmini) {
				padding-top: 7rem;
			}
			@include media-max(sm) {
				padding-top: unset;
				// padding-bottom: 15rem;
			}
		}

		img {
			position: relative;
			z-index: 5;
			height: 31.25rem;
			width: 100%;
			object-fit: cover;
			@include media-max(lg) {
				height: 25rem;
			}
			@include media-max(ipadmini) {
				height: 15rem;
			}
			@include media-max(sm) {
				height: auto;
				margin-top: 0;
			}
		}
	}
	.living-room {
		height: 30vw;
	}
	.bannerOnly {
		// display: grid;
		// align-items: center;

		@include media-max(laptopS) {
			padding-left: unset;
			padding-right: unset;
		}

		@include media-max(ipadmini) {
			min-height: auto;
		}

		.bannerOnly--Container {
			overflow: hidden;
			position: relative;
			.section--bannerOnly {
				background-image: var(--lrbg);
				background-size: cover;
				// height: 100vh;
				// height: 40vw;
				width: 100%;
				margin: 0 auto;
				opacity: 1;
				// padding-bottom: 3.75rem;
				// @include media-max(ipadmini){
				// 	height: 60vh;
				// }
			}
		}
	}
	.lv-thropy {
		height: 45vw;
	}
	.contact-form {
		&__form {
			padding: 2rem;
			margin: 0 auto;
			max-width: 500px;
			text-align: center;
			h2 {
				font-weight: 300;
				margin-bottom: 2rem;
				text-transform: uppercase;
			}
		}
	}
	.img-section {
		margin: 5rem 0;
	}
	section.m-0 {
		@include media-max(sm) {
			padding-left: 0;
			padding-right: 0;
		}
	}
	.cta-wrapper,
	.article-wrapper {
		padding: unset;
		margin: 0;
	}
	.article-wrapper {
		@include media-max(ipadmini) {
			min-height: 140vh;
		}
	}
</style>
