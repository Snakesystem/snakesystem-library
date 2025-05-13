<script>
    const { slug } = $props();

    console.log(slug)
</script>

<div class="content">
    <h1>Notes Detail {slug?.wild}</h1>

    <a href="/#/notes/{slug?.slug}">Kembali</a>
</div>

<style scoped>
    .content {
        height: 100vh;
        max-height: 100vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 99;
        background-color: #04414dda;
        padding: 5rem;
    }
</style>