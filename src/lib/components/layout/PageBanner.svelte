<script lang="ts">
	import { fadeIn, textAnimate } from '$lib/GsapAnimation.js';

    export let banner;
	export let bannerMobile;
	export let bannerSmall;
	export let customtop;
	export let transparent;
    export let title;
	export let bannerheight;
    export let subTitle;
    export let extraClass;

	let pageBannerheight = 60;


	// let backgroundImage = bannerSmall;
	// let backgroundSize = 'small';
    // let backgroundLoaded = false;
  
    //  // Function to check if the background image has loaded
	//  function checkImageLoaded() {
    //     const image = new Image();
    //     image.src = backgroundImage;
    //     image.onload = () => {
    //         backgroundLoaded = true;
    //     };
    // }

    // // Function to handle loading the background image
    // function handleBackgroundLoad() {
    //     checkImageLoaded();

    //     switch (backgroundSize) {
    //         case 'small':
    //             backgroundSize = 'medium';
    //             backgroundImage = bannerMobile;
    //             break;
    //         case 'medium':
    //             backgroundSize = 'large';
	// 			if(isDesktopDevice()){
    //             	backgroundImage = banner;
	// 			}else{
	// 				backgroundImage = bannerMobile;
	// 			}
    //             break;
    //     }
    // }

    // // Reset backgroundLoaded when changing background image source
    // $: {
    //     backgroundLoaded = false;
    // }

    // // Call handleBackgroundLoad initially
    // onMount(() => {
    //     handleBackgroundLoad();
    // });

    // // Call handleBackgroundLoad after each update
    // afterUpdate(() => {
    //     handleBackgroundLoad();
    // });
</script>

<section in:fadeIn id="banner_bg" class="banner {extraClass ? extraClass : ''} {transparent ? transparent : 'transparent'} autoscroll-exception" style="--banner: url({banner}); height: {pageBannerheight}vh;">
	<div class="banner__content {customtop}">
		<div class="banner__content__text">
			<h1 class="ml3 text-animate" id="bannerTitle" in:textAnimate gsap-duration="1"><span>{title ? title : ''}</span></h1>
		</div>
		{#if subTitle != null}
			<p class="banner__content__paragraph" id="banner_sub">{subTitle}</p>
		{/if}
	</div>
</section>

<style lang="scss">
	.transparent{
		box-shadow: inset 0 0 0 50vw rgba(0,0,0,0.3);
	}
	.banner{
		background-image: var(--banner);
		min-height: 68vh;
		background-position: center;
		background-size: cover;
		margin: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
        position: relative;
		padding: unset;
		&.homebanner{
			height: 100vh !important;
		}
        .banner_overlay{
            content: "";
            background-color: $darkgray;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 10;
        }
		.custom-top{
			@include media-max(sm) {
				margin-top: -12rem;
			}
		}  
		&__content{
            position: relative;
			padding-left: 1rem;
			padding-right: 1rem;
            z-index: 2;
			&__text{
				h1{
					color:#fff;
					font-weight: 400;
					// font-size: 5rem;		
					font-size: 3.5rem;		
					margin: 0 auto 1rem auto;
					justify-content: center;
					max-width: 60rem;
					@include media-max(sm) {
						font-size: 3rem;
					}
					span{
						font-family: $primary-font;
					}		
				}
			}
			&__paragraph{
				color: #fff;
				font-size: 1.25rem;							
			}
			&__btn{
					border: 1px solid #fff;
					padding: 1.5rem 4rem;					
					text-decoration: none;
					color: #fff;
					font-family: $secondary-font;
					text-transform:lowercase;
					display: inline-block;
			}			
		}
	}    
</style>