<script>
    import { base_url, formatWIBDate } from '..';
    import { push } from 'svelte-spa-router';
    import Loading from '../../components/Loading.svelte';

    export let slug; // pastikan ini di-declare dan dikirim dari router

    let result = {
        result: false,
        data: []
    };
    let loading = true;

    $: if (slug?.slug) {
        fetchData(slug.slug);
    }

    async function fetchData(slugValue) {
        loading = true;
        try {
            const response = await fetch(`${base_url}/library/get/${slugValue}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            result = data;
        } catch (err) {
            console.error(err);
            loading = false;
        } finally {
            loading = false;
        }
    }
</script>

<div class="content">
    {#if loading}
        <Loading/> 
    {:else if result.data.length === 0}
        <div class="d-flex flex-column">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/img/empty.png?v=1" class="img-fluid rounded" alt="Sedang di tulis">
                        <div class="carousel-caption d-flex flex-column align-items-center w-100" style="margin-bottom: 4rem;">
                            <h3>Catatan Sedang di Tulis</h3>
                            <p>Kamu bisa kontak penulis melalui sosial media.</p>
                            <div class="d-flex flex-row">
                                <a class="btn btn-dark mx-2 fs-4" aria-label="Github" href="https://github.com/feri-irawansyah" target="_blank"><i class="bi bi-github"></i></a>
                                <a class="btn btn-primary mx-2 fs-4" aria-label="Linkedin" href="https://github.com/feri-irawansyah" target="_blank"><i class="bi bi-linkedin"></i></a>
                                <a class="btn btn-info mx-2 fs-4" aria-label="Twitter" href="https://github.com/feri-irawansyah" target="_blank"><i class="bi bi-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="gradient-overlay" style="height: 75%;"></div>
                </div>
            </div>
        </div>
    {:else}
        <div class="row">
            <div class="col-12">
                <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        {#each result.data.slice(0, 3) as item, i}
                            <div class="carousel-item {i === 0 ? 'active' : ''}">
                                <img src={`/img/notes/${item.Slug}.png` || '/img/bg-mobile-fallback.jpg'} class="d-block w-100" alt={item.Title}>
                                <div class="carousel-caption">
                                    <p class="lh-1">{formatWIBDate(item.LastUpdate)}</p>
                                    <h5 class="text-uppercase text-start">{item.Title}</h5>
                                    <p class="text-start">{item.Description || 'No description available.'}</p>
                                    <div class="d-flex gap-2" style="width: 100%; height: 20%; padding: 0 5px; border-radius: 5px;">
                                        <img class="img-fluid rounded-circle" src="/img/logo-ss.png" alt="" style="width: 1.2rem; height: 1.2rem;">
                                        <span class="lh-1">Feri Irawansyah</span>
                                    </div>
                                </div>
                            </div>
                        {/each}
                        <div class="gradient-overlay"></div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-column " style="padding: 1rem;">
                    <h3>Latest Notes</h3>
                    <p>Jelajahi catatan saya—tutorial, wawasan teknologi, opini gajelas, dan pemikiran teknologi yang disusun untuk memicu ide dan terkadang memecahkan masalah.</p>
                </div>
            </div>
            <div class="col-12">
                <div class="flex-row card-group">
                    {#each result.data as note}
                    <button class="card text-center" onclick={() => push(`/notes/${slug?.slug}/${note.Slug}`)}>
                        <div class="gradient-overlay"></div>
                        <img src="/img/notes/{note.Slug}.png" class="card-img-top rounded py-1" alt="">
                        <div class="card-body">
                            <h5 class="card-title text-start text-uppercase">{note.Title}</h5>
                            <p class="card-text text-start">{note.Description || 'No description available.'}</p>
                        </div>
                        <div class="card-footer text-body-secondary">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="d-flex gap-2">
                                    <img class="img-fluid rounded-circle" src="/img/logo-ss.png" alt="" style="width: 1.5rem; height: 1.5rem;">
                                    <span>Feri Irawansyah</span>
                                </div>
                                <a class="text-decoration-none" href={`/#/notes/${slug?.slug}/${note.Slug}`}>
                                    <span class="text-white">{formatWIBDate(note.LastUpdate)}</span> 
                                    <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </button>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>

<style scoped>
    .content {
        /* background-color: salmon; */
        color: white;
        margin-top: 0;
        height: 99vh;
        max-height: 100vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        z-index: 99;
        /* background-color: #04414dda; */
        padding: 1rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .content .card-group {
        display: grid;
        grid-template-columns: 1fr; /* default: 1 kolom (mobile) */
        gap: 0.5rem;
        width: 100%;
        padding: 0.7rem;
        max-height: 85%;
        /* overflow-y: scroll; */
    }

    .card:hover img {
        filter: blur(4px);
        transition: filter 0.3s ease;
    }


    .card-group .gradient-overlay {
        height: 100%;
        position: absolute;
    }

    .card-body {
        position: absolute;
        bottom: 2rem;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
    }

    .card-footer {
        z-index: 1;
    }

    /* Breakpoint untuk desktop (≥ 768px atau lebih besar) */
    @media (min-width: 768px) {
        .content .card-group {
            grid-template-columns: repeat(2, 1fr); /* 3 kolom */
        }
    }

</style>