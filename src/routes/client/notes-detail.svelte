<script>
// @ts-nocheck

    const { slug } = $props();

    import { Marked } from 'marked';
    import { markedHighlight } from "marked-highlight";
    import { onMount } from 'svelte';
    import Loading from '../../components/Loading.svelte';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css'; // atau tema lain
  import { base_url, formatWIBDate } from '..';

    let result = $state({
        result: false,
        data: {}
    }); 
    let markdown = '';
    let htmlContent = $state('');
    let loading = $state(true);

    const marked = new Marked(
      markedHighlight({
      emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    onMount(async () => {

      try {
        if(slug?.wild) {
          const response = await fetch(`${base_url}/library/get-single/${slug?.wild}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          result = data; 
          if(data.result) {
            loading = false
            const res = await fetch(data.data.content_md);
            markdown = await res.text();
            htmlContent = await marked.parse(markdown);
          }
        }
        
      } catch (err) {
        loading = false
        htmlContent = '<p>Failed to load blog content.</p>';
        console.error(err);
      }
    });

</script>

<div class="content">
    <div class="d-flex flex-column align-items-start w-100 gap-2">
      <a class="btn back" href="/#/notes/{slug?.slug}"><i class="bi bi-arrow-left-circle me-2"></i>Kembali</a>
      <h4 class="text-white">{result.data.title}</h4>
    </div>

    <div class="d-flex flex-row align-items-start justify-content-start w-100">
      <img src="/img/logo-ss.png" class="mb-3 rounded-circle" width="50px" alt="">
      <div class="flex-column">
        <a class="text-decoration-none text-muted" href="https://github.com/feri-irawansyah" target="_blank">
        Feri Irawansyah <img src="/img/real.png" width="20px" alt=""></a>
        <p class="text-muted">{formatWIBDate(result.data.last_update ? result.data.last_update : new Date())}</p>
      </div>
    </div>

    {#if loading}
        <Loading/>
    {:else}
      <div class="image-content d-flex justify-content-center px-5 pt-3">
        <img class="img-fluid rounded" src="/img/notes/{result.data.slug}.png" alt="" onerror={(e) => e.target.src = '/img/bg-mobile-fallback.jpg'}>
      </div>
      <div class="markdown-body">
          {@html htmlContent}
      </div>
    {/if}
</div>

<style scoped>
    .content {
        height: 100vh;
        max-height: 100vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        z-index: 99;
        /* background-color: #04414dda; */
        padding: 1rem;
    }

    .image-content {
      background-color: #292b2c;
    }

    .back {
      font-size: 1.1rem;
      padding: 0;
      margin-bottom: 2rem;
    }

    .back:hover {
      color: #fff;
      text-decoration: none;
    }

</style>