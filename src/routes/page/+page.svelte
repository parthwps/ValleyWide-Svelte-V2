<!-- YourComponent.svelte -->
<script>
    let imageSrc = 'https://vwapi.netdevs.net/uploads/small_Heritage_Park_aerials_67421907fe.webp';
    let imageSize = 'small';
    let imageLoaded = false;
  
    function handleImageLoad() {
      imageLoaded = true;
  
      switch (imageSize) {
        case 'small':
          imageSize = 'medium';
          imageSrc = 'https://vwapi.netdevs.net/uploads/medium_Heritage_Park_aerials_67421907fe.webp';
          break;
        case 'medium':
          imageSize = 'large';
          imageSrc = 'https://vwapi.netdevs.net/uploads/large_x2_Heritage_Park_aerials_67421907fe.webp';
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
  