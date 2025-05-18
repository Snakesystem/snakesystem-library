<script>
    const { slug } = $props();

    import { Marked } from 'marked';
    import { markedHighlight } from "marked-highlight";
    import { onMount } from 'svelte';
    import Loading from '../../components/Loading.svelte';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css'; // atau tema lain

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
        // highlight(code, lang, info) {
        //   const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        //   const highlighted = hljs.highlight(code, { language }).value;

        //   // Inject tombol copy
        //   return `
        //     <div class="code-block-wrapper">
        //       <button class="copy-button">Copy</button>
        //       </div>
        //     <pre><code class="hljs language-${language}">${highlighted}</code></pre>
        //   `;
        // }
        highlight(code, lang, info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    onMount(async () => {

      try {
        if(slug?.wild) {
          const response = await fetch(`/api/library/get-single/${slug?.wild}`, {
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

          setTimeout(() => {
            document.querySelectorAll('.copy-button').forEach(btn => {
              btn.addEventListener('click', () => {
                const codeEl = btn.nextElementSibling?.querySelector('code');
                if (codeEl) {
                  navigator.clipboard.writeText(codeEl.innerText);
                  btn.innerText = 'Copied!';
                  setTimeout(() => btn.innerText = 'Copy', 1000);
                }
              });
            });
          }, 500);
        }
        
      } catch (err) {
        loading = false
        htmlContent = '<p>Failed to load blog content.</p>';
        console.error(err);
      }
    });

</script>

<div class="content">
    <h1 class="text-white">{result.data.title}</h1>

    <a class="btn btn-light back btn-sm" href="/#/notes/{slug?.slug}"><i class="bi bi-arrow-left"></i> Kembali</a>

    {#if loading}
        <Loading/>
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
        overflow: scroll;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        z-index: 99;
        background-color: #04414dda;
        padding: 1rem;
    }

    .back {
        position: absolute;
        top: 2rem;
        left: 11rem;
    }

</style>