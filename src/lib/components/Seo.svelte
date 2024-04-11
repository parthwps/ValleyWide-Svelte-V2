<script>
    export let metaTitle
    export let metaDescription
    export let metaImage
    export let metaSocial
    export let keywords
    export let metarobots
    export let structuredData
  </script>

    {#if metaTitle}
      <title>{metaTitle}</title>
    {/if}
  
    {#if metaDescription}
      <meta name="description" content="{metaDescription}">
    {/if}
  
    {#if metaImage}
      <meta property="og:image" content="{metaImage}">
    {/if}
  
    {#if metaSocial}
      <meta property="og:site_name" content="{metaSocial}">
    {/if}
  
    {#if keywords}
      <meta name="keywords" content="{keywords}">
    {/if}
  
    {#if metarobots}
      <meta name="robots" content="{metarobots}">
    {/if}
  
    {#if structuredData}
      <script type="application/ld+json">{structuredData}</script>
    {/if}
  