<!-- ParallaxImage.svelte -->
<script>
  // Import Svelte dependencies
  import { onMount } from "svelte";
  import {gsap}  from "gsap/dist/gsap";        
  import {ScrollTrigger} from "gsap/dist/ScrollTrigger";  

  let parallaxImage;
  let parallaxImageCont;
  export let imageUrl;
  export let medUrl;
  export let imageHeight;
  export let overlay;
  // Initialize GSAP and ScrollTrigger when the component is mounted
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP timeline
    const tl = gsap.timeline();

    tl.to(parallaxImage, {
      y: -300,
      ease: "none",
    });

    // Initialize ScrollTrigger
    ScrollTrigger.create({
      trigger: parallaxImageCont,
      start: "top bottom",
      end: "bottom top",
      // markers: true,
      scrub: true,
      animation: tl,
    });

  });
</script>


<div class="parallax-container {overlay ? 'parallax-with-overlay' : ''}" 
bind:this={parallaxImageCont}
style="--height: {imageHeight}vh">
  <img
    src="{imageUrl}"
    alt="Parallax Image"
    class="parallax-img"
    bind:this={parallaxImage}
    srcset="{medUrl} 768w"
		sizes="(max-width: 768px) 1024px"
  />
</div>


<style lang="scss">
  .parallax-with-overlay{
				.parallax-img {
          @include media-max(sm){
            // min-width:00px;
          }
				}
				&::after {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
				}
	}
  .parallax-container {
    overflow: hidden;
    height: var(--height);
    object-fit: cover;
    object-position: center;
    @include media-max(default){
      height: 70vh;
    }
    @include media-max(sm){
      height: 40vh;
    }
  }

  .parallax-img {
    width: 100%;
    height: 180%;
    object-fit: cover;
    min-width: 1000px;
    position: absolute;
    top: 0;
    left: 0;

    @include media-max(default){
      width: 100%;
    }
    @include media-max(sm){
      left: 50%;
      margin-left: -500px;
      min-width: 100px;
      width: auto;
      height: 180%;
      object-fit: cover;
    }
  }
</style>
