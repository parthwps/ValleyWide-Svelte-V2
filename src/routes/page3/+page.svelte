<script>
  import Carousel from 'svelte-carousel'
  </script>
  <div class="mh-100"></div>
  <h2>svelte-carousel</h2>
  <Carousel
  particlesToShow={3}
  particlesToScroll={1}
  infinte
>
    <div>
        <img src="https://api.ulfbuilt.com/uploads/medium_Scandinavian_Modern_16_f6b5bfb465.webp" alt="test">
    </div>
    <div>
        <img src="https://api.ulfbuilt.com/uploads/medium_Rustic_Mountain_Modern_Remodel_11_3e355f486a.webp" alt="test">
    </div>
    <div>
        <img src="https://api.ulfbuilt.com/uploads/medium_Rustic_Caretaker_Loft_1_4176699eff.webp" alt="test">
    </div>
    <div>
      <img src="https://api.ulfbuilt.com/uploads/medium_Scandinavian_Modern_16_f6b5bfb465.webp" alt="test">
  </div>
  <div>
      <img src="https://api.ulfbuilt.com/uploads/medium_Rustic_Mountain_Modern_Remodel_11_3e355f486a.webp" alt="test">
  </div>
  <div>
      <img src="https://api.ulfbuilt.com/uploads/medium_Rustic_Caretaker_Loft_1_4176699eff.webp" alt="test">
  </div>
  <div>
</Carousel>
  <style>
    .mh-100{
        min-height: 20vh;
    }
    :global(img){
      user-drag: none; /* Standard syntax */
    -webkit-user-drag: none; /* WebKit browsers */
    -webkit-touch-callout: none;
    }
  </style>