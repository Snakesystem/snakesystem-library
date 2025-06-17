<script>
  import jQuery from 'jquery';
  // @ts-ignore
  window.$ = window.jQuery = jQuery;
  import Router from 'svelte-spa-router'
  import { routes } from './routes';
  import AOS from 'aos';


  function routeLoading(event) {
    console.log('routeLoading event', event.detail)
  }

  function routeLoaded(event) {
      console.log('routeLoaded event', event.detail)
  }


  $effect(() => {
    AOS.init();
  })

</script>

<main>
  <Router {routes} on:routeLoading={routeLoading} on:routeLoaded={routeLoaded} />
</main>

<style>
  main {
    position: relative;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  @media screen and (max-width: 768px) {
    main {
      height: 100vh;
      width: 100vw;
    }
  }
</style>