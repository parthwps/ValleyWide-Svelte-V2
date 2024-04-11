<script>
    import { onMount } from 'svelte';
    import {gsap}  from "gsap/dist/gsap";        
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";   
    import {ScrollSmoother} from "gsap/dist/ScrollSmoother"; 
    import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin"; 
    let smoothValue;
    let smoothTouchValue;
    import { isMobileDevice, isTabletDevice, isDesktopDevice } from '$lib/deviceUtils.ts';

console.log('Is mobile device:', isMobileDevice());
console.log('Is tablet device:', isTabletDevice());
console.log('Is desktop device:', isDesktopDevice());

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
    
    onMount(() => {
      // if(isMobileDevice() == true) {
      //   smoothValue = 0;
      //   smoothTouchValue = 0;
      // } else {
      //   smoothValue = 2;
      //   smoothTouchValue = 1.5;
      // }
      // window.addEventListener('resize', () => {
      //   if(isMobileDevice() == true) {
      //     smoothValue = 0;
      //     smoothTouchValue = 0;
      //   } else {
      //     smoothValue = 2;
      //     smoothTouchValue = 1.5;
      //   }
      // });

      const smoother = ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: 2,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 1.5,
      });
    });

  </script>
  
  <style>
    /* Add global styles for your layout here */
  </style>
  

  <div id="wrapper">
    <div id="content">
      <!-- Your common layout elements go here -->
        <slot />
    </div>
  </div>