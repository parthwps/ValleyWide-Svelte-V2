<script lang="ts">
	import { Col, Container, Row } from "sveltestrap";
	import { onMount } from "svelte";
	import axios from 'axios';
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	import { textAnimate, fly, slide } from '$lib/GsapAnimation.js';
  
	const domain = "https://api.valleywidebuilders.com";
	let insight = null;
  
	async function fetchCta() {
	  const url = `${domain}/api/global-article-cta?populate=deep,2`;
	  const headers = {
		Authorization: `Bearer ${PUBLIC_STRAPI_API}`
	  };
  
	  try {
		const response = await axios.get(url, { headers });
		return response.data.data.attributes;
	  } catch (error) {
		console.error('Error fetching CTA data:', error);
		return null;
	  }
	}
  
	onMount(async () => {
	  insight = await fetchCta();
	});
  </script>
  
  {#if insight}
	<section class="insight" id="article">
	  <Container>
		<Row>
		  <Col>
			<span class="insight__pre-heading">{insight.leftPreHeading || ''}</span>
		  </Col>
		</Row>
		<Row>
		  <Col md="6" class="">
			<div>
			  {#if insight.image.data}
				<img loading="lazy" in:slide width="468" height="358" id="global_article_img" gsap-x="-30" gsap-duration="1.2" src="{domain}{insight.image.data.attributes.formats.large.url || insight.image.data.attributes.url}" alt="Stair">
			  {/if}
			</div>
		  </Col>
		  <Col md="6" class="my-auto">
			<div class="insight__content">
			  <div class="insight__content__wrapper">
				<h2 class="text-animate primary-font stc" in:textAnimate id="global_article_title">{insight.Heading || ''}</h2>
				<div in:fly id="global_article_cont" gsap-delay="0.5" gsap-duration="1.2"  gsap-y="30">
				  {@html insight.paragprah || ''}
				  <div class="insight__content__wrapper__btns">
					<a href="{insight.leftBtnUrl || '#'}" class="btn btn-secondary">{insight.leftBtnTitle || 'Button'}</a>
				  </div>
				</div>
			  </div>
			</div>
		  </Col>
		</Row>
	  </Container>
	</section>
  {/if}

<style lang="scss">
	.insight{
		background-color: #F2F2F2;
		// padding: 12rem 0;
		padding: 8rem 0;
		margin-bottom: 0;
		min-height: 100vh;
		display: flex;
    	align-items: center;
		@include media-max(md){
			padding-left: 3rem;
			padding-right: 3rem;
		}
		// @include media-max(sm){
		// 	padding-left: 0;
		// 	padding-right: 0;
		// }
		@include media-max(sm){
			padding-left: 0;
			padding-right: 0;
		}
		&__pre-heading{
			color: $black-color;
			margin-bottom: 2rem;
			padding: 0 1.375rem;
			display: block;	
			font-weight: 500;		
		}
		&__content{
			&__wrapper{
				padding-left: 4rem;		
				@include media-max(ipadmini){
					padding: 0 1.375rem;
					h2{
						text-align: center;
						text-wrap: balance;
					}
				}					
				&__pre-heading{
					color: $secondary-color;
					font-weight: 500;
					@include media-max(sm){
						padding: 2rem 0 0;
					}						
				}	
				span{
					color: $primary-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2{
					margin: 1rem 0 2rem;	
					font-weight: 400;
					// flex-wrap: wrap;
					// width: 35rem;
					@include media-max(ipadmini){
						margin-top: 0;
					}
					@include media-max(xs){
						margin-top: 2rem;
					}
				}
				:global(p){
					line-height: 2.125rem;
					font-size: 1.25rem;
					margin-bottom: 2rem;
						text-align: justify;
				}		
				&__btns{
					// text-align: center;
					// margin-top: 1.5rem;
					display: flex;
					@include media-max(md){
						display: block;
					}
					@include media-max(sm){
						text-align: center;
					}
				}
				.btn {
					padding: 0.7rem 3.125rem; 
					font-size: 1.25rem;
					@include media-max(sm){
						padding: 0.7rem 1rem;
					}		
				}
				.btn-primary{
					margin-right: 1rem;
				}		
				.btn-secondary {
					margin-right: 1.25rem;
				}
				.btn-inverted{
					background-color: #fff;
					&:hover{
						background-color: $secondary-color;
						border-color: #fff;
					}					
				}
				@include media-max(md){
					.btn {
						margin-top: 1rem;
					}
				}	
			}
		}
	}    
</style>