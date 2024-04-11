<script>
    import { register } from 'swiper/element/bundle';
  
    register();
  
    const spaceBetween = 10;
    const onProgress = (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress)
    };
    const onSlideChange = (e) => {
      console.log('slide changed')
    }
  </script>
  <div class="mh-100"></div>
  <h2>Swiper</h2>
  <div class="test">
  <swiper-container
    slides-per-view={3}
    space-between={spaceBetween}
    loop={true}
    centered-slides={true}
    pagination={{
      hideOnClick: true,
    }}
    breakpoints={{
      768: {
        slidesPerView: 3,
      },
    }}
    navigation={true}
    on:swiperprogress={onProgress}
    on:swiperslidechange={onSlideChange}
  >
    <swiper-slide>
        <img src="https://api.ulfbuilt.com/uploads/medium_Scandinavian_Modern_16_f6b5bfb465.webp" alt="test">
    </swiper-slide>
    <swiper-slide>
        <img src="https://api.ulfbuilt.com/uploads/medium_Rustic_Mountain_Modern_Remodel_11_3e355f486a.webp" alt="test">
    </swiper-slide>
    <swiper-slide>
        <img src="https://api.ulfbuilt.com/uploads/medium_Rustic_Caretaker_Loft_1_4176699eff.webp" alt="test">
    </swiper-slide>
  </swiper-container>
</div>
  <style>
    .mh-100{
        min-height: 20vh;
    }
    :global(.test img){
      height: 300px;
      object-fit: cover;
    }
  </style>