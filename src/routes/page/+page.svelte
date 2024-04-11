<!-- YourComponent.svelte -->
<script>
  import { onMount } from 'svelte';

  let imageSrc = 'https://api.ulfbuilt.com/uploads/small_home_banner_881ed3e2e1.webp';
  let imageSize = 'small';
  let imageLoaded = false;

  function handleImageLoad() {
    imageLoaded = true;

    switch (imageSize) {
      case 'small':
        imageSize = 'medium';
        imageSrc = 'https://api.ulfbuilt.com/uploads/medium_home_banner_881ed3e2e1.webp';
        break;
      case 'medium':
        imageSize = 'large';
        imageSrc = 'https://api.ulfbuilt.com/uploads/large_x2_home_banner_881ed3e2e1.webp';
        break;
    }
  }

  $: {
    // Reset imageLoaded when changing image source
    imageLoaded = false;
  }
</script>

<style>
  .image {
    /* Add any additional styles for your image */
    width: 100%;
    height: auto;
    opacity: 0; /* Initial opacity for fade-in effect */
    transition: opacity 0.5s ease-in-out; /* Adjust the duration and easing as needed */
  }

  .image-loaded {
    opacity: 1;
  }
</style>

{#if imageSrc !== ''}
  <img
    class="image {imageLoaded ? 'image-loaded' : ''}"
    src={imageSrc}
    alt="Your Image Alt Text"
    on:load={handleImageLoad}
  />
{/if}
