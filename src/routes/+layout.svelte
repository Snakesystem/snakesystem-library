<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import jQuery from 'jquery';
  // @ts-ignore
  window.$ = window.jQuery = jQuery;
  import 'bootstrap-table/dist/bootstrap-table.min.css';
  import 'bootstrap-table/dist/bootstrap-table.min.js';
  import 'bootstrap-table/dist/extensions/auto-refresh/bootstrap-table-auto-refresh.min.js';
  import 'aos/dist/aos.css';
  import '$assets/scss/app.scss'
  import '$assets/css/app.css'
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import 'pace-js/themes/blue/pace-theme-minimal.css';
  import 'pace-js/pace.min.js'
  import { onMount } from 'svelte';
  import { goto, afterNavigate, beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import AOS from 'aos';
  import * as bootstrap from 'bootstrap';
  import { loading } from '$lib/index.js';
  import Loading from '$components/Loading.svelte';
  import { checkSession, protectedPages, publicPages, wildcardPages } from '$middleware/session.js';

  let startTime = 0;

  beforeNavigate(() => {
    if (window.Pace) {
      window.Pace.restart();
      startTime = Date.now();
    }
  });

  afterNavigate(() => {
    if (window.Pace) {
      const elapsed = Date.now() - startTime;
      const minDuration = 500; // minimal tampil 500ms
      const delay = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        window.Pace.stop();
      }, delay);
    }
  });
  
  AOS.init();

  const { children } = $props();

  onMount(async () => {
    loading.set(true);
    const isLoggedIn = await checkSession();
    const currentPath = page.url.pathname;

    const isPublic =
      publicPages.includes(currentPath) ||
      wildcardPages.some((prefix) => currentPath.startsWith(prefix));

    const isProtected =
      protectedPages.includes(currentPath) ||
      wildcardPages.some((prefix) => currentPath.startsWith(prefix));

    if (!isLoggedIn && !isPublic && isProtected) {
      await goto('/');
      return;
    }

    // if (isLoggedIn && isPublic && !isProtected) {
    //   await goto('/dashboard');
    //   return;
    // }
  });

</script>

{#if $loading}
  <Loading />
{:else}
  <main>
    {@render children()}
  </main>
{/if}

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