<script lang="ts">
    import { onMount } from 'svelte';
    import Headroom from "svelte-headroom";
    const onPin = () => console.log("pin");
    import Footer from "./Footer.svelte";
    import Header from "./Header.svelte";
    import {page} from '$app/stores'
	import { Container } from "sveltestrap";  
    import Animate from "$lib/components/Animate.svelte";
	import { afterNavigate, disableScrollHandling } from '$app/navigation'; 
    import { gsap } from 'gsap';
    import ScrollSmoother from '$lib/ScrollSmoother.svelte';

    import { isMobileDevice, isTabletDevice, isDesktopDevice } from '$lib/deviceUtils.ts';
    console.log('Is mobile device:', isMobileDevice());
    console.log('Is tablet device:', isTabletDevice());
    console.log('Is desktop device:', isDesktopDevice());
    
    let isDesktop = false;
    onMount(() => {
      isDesktop = window.innerWidth > 768;
      window.addEventListener('resize', () => {
        isDesktop = window.innerWidth > 768;
      });
    });
    // let isHomePage = false;
    function isHome(url) {
        return url === "/" ? false : true;
    }    
    function isPortfolio(url) {
        return url === "/portfolio/[slug]" ? "portfolio-page" : "";
    }     
    function isArticle(url) {
        return url === "/articles/[slug]" ? "article-page" : "";
    }
	afterNavigate(() => {
		disableScrollHandling();
	}) 


    let header: gsap.TweenTarget;
    
	import { loadingCursor } from '$lib/cursorChange.js';
    onMount(() => {
        gsap.from(header, { y: -100, duration: 1, opacity: 0, delay: 2.5, ease: 'power2.out' });
        loadingCursor();
    });

    let yaxis: any;
    export let data;
    let menu = data.data;

// Progress bar
    import NProgress from 'nprogress'
  import {navigating} from '$app/stores'

  // NProgress css
  import 'nprogress/nprogress.css'

  NProgress.configure({
        minimum: 0.16,
    })

  $: {
    if ($navigating) {
      NProgress.start();
    }
    if (!$navigating) {
      NProgress.done();
    }
  }
  onMount(() => {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtm.js?id=`+ data.fallback.data.attributes.Google_Tag_Manager;
        script.async = true;
        document.head.appendChild(script);

        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=`+ data.fallback.data.attributes.Google_Tag_Manager +`" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.appendChild(noscript);
    });
  onMount(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=`+data.fallback.data.attributes.Google_Analytics_4;
        document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', "'" + data.fallback.data.attributes.Google_Analytics_4 + "'");
  });
    </script>
    <svelte:head>
        <link rel="preconnect" href="https://api.ulfbuilt.com/">
    </svelte:head>
    
    <div class="z10 {isPortfolio($page.route.id)} {isArticle($page.route.id)}">
        <Headroom on:pin={onPin} duration="400ms" offset={50} tolerance={5}>  
            <!-- <header class="d-block" class:changeBG={yaxis >= 250 || isHome($page.url.pathname)} > -->
            <header class="d-block" class:changeBG={yaxis >= 200} bind:this={header}>                
                <Container>
                    <Header menu={menu} />
                </Container>
            </header>
        </Headroom>
    </div>
    
    
{#key $page}
  <!-- {#if isDesktop} -->
  {#if isDesktopDevice() }
    <ScrollSmoother>
        <Animate>
            <main id="mainelement">
                    <slot>
                
                    </slot>
            </main>
            <footer>
                <Footer />
            </footer>
        </Animate>
    </ScrollSmoother>
    {:else}
        <Animate>
            <main id="mainelement">
                    <slot>
                
                    </slot>
            </main>
            <footer>
                <Footer />
            </footer>
        </Animate>
    {/if}
    <!--   <Animate>
          <main>
                  <slot>
              
                  </slot>
          </main>
          <footer>
              <Footer />
          </footer>
      </Animate>
  {/if} -->
{/key}
<svelte:window bind:scrollY={yaxis} />

<!-- <style lang="scss">
    body {
      cursor: {isLoading ? 'wait' : 'default'};
    }
</style> -->