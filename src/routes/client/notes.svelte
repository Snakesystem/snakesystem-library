<script>
// @ts-nocheck

  import { params, location, push } from 'svelte-spa-router';
  import NotesList from './notes-list.svelte';
  import NotesDetail from "./notes-detail.svelte";
  import Navigation from "../../lib/Navigation.svelte";
  import About from './about.svelte';

  let slug = $state('');
  let wild = $state('');

  $effect(() => {
    if($params) {
      slug = $params.slug;
      wild = $params.wild;
    }

    if($location === '/notes' || $location === '/notes/') {
      push('/notes/backend');
    }
  })

</script>

<section class="bg-dark">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <Navigation/>
      </div>
      <div class="col-lg-9">
        {#if $location == '/notes/about'}
        <About />
        {:else if wild}
        <NotesDetail slug={$params} />
        {:else if slug}
        <NotesList slug={$params} />
        {:else}
          <NotesList slug={$params} />
        {/if}
      </div>
    </div>
  </div>
</section>

<style scoped>

  section {
    z-index: 9;
    height: 100vh;
  }

  .col-lg-9 {
    padding: 0 1rem;
  }

</style>