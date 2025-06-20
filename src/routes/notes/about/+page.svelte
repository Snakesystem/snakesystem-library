<script>
    const { slug } = $props();

    import { Marked } from 'marked';
    import { markedHighlight } from "marked-highlight";
    import { onMount } from 'svelte';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css'; // atau tema lain
    import { formatWIBDate } from '$lib/index.js';
    import LoadingList from '$components/LoadingList.svelte';

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
        const res = await fetch("https://raw.githubusercontent.com/feri-irawansyah/feri-irawansyah/refs/heads/main/README.md");
        markdown = await res.text();
        htmlContent = await marked.parse(markdown);
        loading = false
      } catch (err) {
        loading = false
        htmlContent = '<p>Failed to load blog content.</p>';
        console.error(err);
      }
    });

</script>

<div class="content scroll-custom">
    <div class="d-flex flex-column align-items-start w-100 gap-2">
      <a class="btn back mt-3" href="/notes"><i class="bi bi-arrow-left-circle me-2"></i>Kembali</a>
      <h3 class="text-white">Tentang Feri Irawansyah</h3>
    </div>

    <div class="d-flex flex-row align-items-start justify-content-start w-100">
      <img src="/img/logo-ss.png" class="mb-3 rounded-circle" width="50px" alt="">
      <div class="flex-column">
        <a class="text-decoration-none text-muted" href="https://github.com/feri-irawansyah" target="_blank">
        Feri Irawansyah <img src="/img/real.png" width="20px" alt=""></a>
        <p class="text-muted">{formatWIBDate(new Date())}</p>
      </div>
    </div>

    {#if loading}
        <LoadingList/>
    {:else}
        <div class="markdown-body">
            {@html htmlContent}
        </div>
    {/if}
</div>

<style scoped>
    .content {
        height: 100vh;
        max-height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        z-index: 99;
        /* background-color: #04414dda; */
        /* padding: 3rem; */
    }

    .back {
      font-size: 1.1rem;
      padding: 0;
      margin-bottom: 1rem;
    }

    .back:hover {
      color: #fff;
      text-decoration: none;
    }

</style>