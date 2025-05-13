<script>
// @ts-nocheck

  import NotesLayout from "../../lib/NotesLayout.svelte";
  import { params, location, push } from 'svelte-spa-router';
  import NotesList from './notes-list.svelte';
  import NotesDetail from "./notes-detail.svelte";

  let slug = $state('');
  let wild = $state('');

  $effect(() => {
    if($params) {
      slug = $params.slug;
      wild = $params.wild;
    }

    if($location === '/notes' || $location === '/notes/') {
      push('/notes/technology');
    }
  })

</script>

<section >
  <video class="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="/img/bg.mp4" type="video/mp4" /></video>
  <div class="container">
    {#if wild}
      <NotesDetail slug={$params} />
    {:else if slug}
      <NotesList slug={$params} />
    {:else}
      <NotesList slug={$params} />
    {/if}
  </div>
</section>

<NotesLayout/>

<style scoped>

  video {
    position: fixed;
    top: 50%;
    bottom: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  section {
    z-index: 9;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 10rem;
    position: relative;
    height: 100vh;
  }

</style>