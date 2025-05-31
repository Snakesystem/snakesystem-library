<script>
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
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>