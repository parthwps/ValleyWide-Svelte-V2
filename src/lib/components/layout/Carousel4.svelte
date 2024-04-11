<script>
    import { textAnimate, slide, fly } from '$lib/GsapAnimation.js';
    import leftar from '$lib/img/left-ar.svg';
    import rightar from '$lib/img/right-ar.svg';
    // import rightarrow from '$lib/img/right-arrow-sky.svg';
    import {Row,Col} from 'sveltestrap';
	  const domain = "https://api.ulfbuilt.com";
    export let preHeading; 
    export let heading; 
    export let btnTitle;
    export let btnUrl;
    export let featuredProjects;
	
    import emblaCarouselSvelte from 'embla-carousel-svelte'
  let emblaApi
  let options = { align: 'start', loop: true }
  
  function handlePrevClick() {
    if (emblaApi && emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
    }
  }

  function handleNextClick() {
    if (emblaApi && emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    }
  }
  function onInit(event) {
    emblaApi = event.detail
    // console.log(emblaApi.slideNodes()) // Access API
  }
  // console.log(featuredProjects)
</script>

<Row>
<Col md="3">
    <div class="slider-caption">
      <div class="slider-caption__heading">
        <p in:slide id="carousel-preheading" gsap-duration="1.5">{preHeading ? preHeading : ''}</p>
        <h2 class="text-animate secondary-font" in:textAnimate id="carousel-heading">{heading ? heading : ''}</h2>
      </div>
    <div class="left-right desktop">
        <button class="left" on:click={handlePrevClick}>
            <img loading="lazy" src="{leftar}" alt="left">
        </button>
        <button class="right" on:click={handleNextClick}>
            <img loading="lazy" src="{rightar}" alt="right">
        </button>
    </div>
    </div>
  </Col>
<Col md=9 class="carousel-section">
  <div class="embla"
  use:emblaCarouselSvelte="{{ options }}"
  on:emblaInit="{onInit}">
  <div class="embla__container">
{#each featuredProjects.data as project, index}
<div class="embla__slide">
  
<div class="slider-container__carousel-cell">
  <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
    {#if project.attributes.featuredImage.data != null}
      <img loading="eager" draggable="false" src="{domain + project.attributes.featuredImage.data.attributes.formats.large.url || domain + project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText ? project.attributes.featuredImage.data.attributes.alternativeText : "Image"}" srcset="{domain}{project.attributes.featuredImage.data.attributes.formats.medium.url ? project.attributes.featuredImage.data.attributes.formats.medium.url : project.attributes.featuredImage.data.attributes.url} 768w"
    sizes="(max-width: 768px) 1024px"/>
    {:else}
    {#await promise}
    {:then fallback} 
      <img loading="eager" src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title ? project.attributes.title : "Image"}" draggable="false" srcset="{fallback ? domain+fallback.attributes.url : noFeatured} 768w"
      sizes="(max-width: 768px) 1024px">
    {/await}
    {/if}
    <div class="slider-container__carousel-cell__text">
      <span>{('0' + (index + 1)).slice(-2)}</span>
      {project.attributes.title ? project.attributes.title : ''}
      <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/></svg></i>
    </div>
  </a>  
</div>


</div>
{/each}
  </div>
</div>

</Col>
</Row>


<style lang="scss">
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
    margin-left: .5rem;
    margin-right: .5rem;
  }
  .embla__slide {
    flex: 0 0 25rem;
    max-width: 25rem;
    min-width: 0;
    @include media-max(sm){
      flex: 0 0 100%;
    }
  }
:global(.disabled){
  pointer-events: none;
}
.right-mobil{
    display: none;
    max-width: 70px;
    @include media-max(sm){
        display: block;
        position: absolute;
        right: 0.5rem;
        background: none;
        border: 0;
        height: 100%;
        opacity: 0.5;
        -webkit-transform:rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    &:hover{
      opacity: 1;
    }
    img{
      width:24px;
    }
}
.left-mobil{
    display: none;
    max-width: 70px;
    @include media-max(sm){
        display: block;
        position: absolute;
        left: 0.5rem;
        background: none;
        border: 0;
        height: 100%;
        opacity: 0.5;
    }
    &:hover{
      opacity: 1;
    }
    img{
      width:24px;
    }
}
.carousel{
  position:absolute;
    width: 25rem;
    justify-content: center;
    align-items: center;
    @include media-max(sm){
      // padding-left: 1rem;
    }
}
.slides{
    overflow: visible !important;
}
:global(.carousel-section){
    overflow: hidden;
    position: relative;
    // height: 34rem;
    // @include media-max(sm){
    //     height: 34rem;
    // }
}
.left-right{
  display: inline-flex;
  box-shadow: 0 0 5px #aaa;
  border-radius: 40px;
  background-color: $white-color;
}
.desktop{
@include media-max(sm){
  display: none;
}
}
.mobile{
display: none;
@include media-max(sm){
  display: flex;
}
}
.left-right.mobile{
align-self: center;
margin: 40px 0;
}
.left, .right{
  border: 0px;
  background-color: transparent;
  margin: 0px;
  height: 60px;
    width: 60px;
}
.left-right img{
  height: 30px;
}


.slider-caption{
  height: 100%;
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;  
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5rem;
  &__heading{
    margin-top: 5rem;
    margin-bottom: 1rem;
    width: 100%;
    @include media-max(sm){
        text-align: center;
        margin-top: 0;
        // margin-bottom: 3rem;
    }    
    p{
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: $third-color;
      font-weight: 500;
    }
    h2{
      // flex-wrap: wrap;
      // width: 18rem;
      line-height:1;
      @include media-max(ipadmini){
          line-height: 2rem;
      }    
    }
  }
}

.slider-container {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 2000px;
  transition-property: transform; /* Specify the property to transition */
  transition-timing-function: ease-in-out;
  position: relative;
  cursor: grab;
white-space: nowrap;
&__carousel-cell {
  max-width: 25rem;
  position: relative;
  margin-right: 1.5rem;
  box-sizing: border-box;
  height: 32rem;
  min-height: 32rem;
  overflow: hidden;
  display: inline-block;
  &:hover{
      .slider-container__carousel-cell__text{
        background: $primary-color;
        transition: 1.5s;
        span {
          color: $white-color;
        }
        path {
          stroke: $white-color;
        }  
      }        
  }    
  @include media-max(ipadmini){
    height: 50vh;
  }   
  @include media-max(sm){
    height: 50vh;
    margin-right:.5rem;
    margin-left:.5rem;
  }   
  &__text{
        background-color: $secondary-color;
        color: #fff;
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        position: absolute;
        z-index: 2;
        bottom: 2rem;
        left: 0;
        max-width: 90%;
        text-align: left;
        transition: 1.5s;
        display: flex;
        align-items: center;
        line-height:1.1;
          @include media-max(sm){
              margin: 0;
              // font-size: 0.6rem;
              width: 90%;
              bottom: 1rem;
              gap: 10px;
          } 
          span{
              color: $primary-color;
              font-size: 1.2rem;
              margin: 0 1.25rem 0 .8rem;
              @include media-max(sm){
                  // margin: 0;
                  // font-size: 0.6rem;
              }                
          }
          i{
            padding-left: 1rem;
            margin-top: -0.25rem;
          }
  }      
  img {
    display: block;
    object-fit: cover;
    min-height: 100%;
  }
}
}

</style>