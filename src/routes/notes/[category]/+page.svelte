<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
  import CarouselContent from "$components/CarouselContent.svelte";
    import LoadingList from "$components/LoadingList.svelte";
    import { baseUrl, formatWIBDate } from "$lib/index.js";

    let category = $derived(page.params.category);

    let offset = $state(0);
    let limit = $state(10);
    let totalPages = $state(1);

    let currentPage = $state(1);

    let result = $state({
        result: false,
        data: {
            rows: [],
            totalNotFiltered: 0,
            total: 0
        }
    });

    $effect(() => {
        totalPages = Math.ceil(result.data.total / limit)
    })
    
    let loading = $state(false);

    $effect(() => {
        fetchData(category);
    })

    async function fetchData(slugValue) {
        loading = true;
        try {
            const response = await fetch(`${baseUrl}/data/get-table?tablename=Notes&offset=${offset}&limit=${limit}&nidkey=NotesNID&filter=${JSON.stringify({ NotesCategory: slugValue })}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            loading = false;
            result = {
                result: true,
                data: data
            };
        } catch (err) {
            console.error(err);
            loading = false;
        } finally {
            loading = false;
        }
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        offset = (currentPage - 1) * limit;
        fetchData(category);
    }

</script>

<div class="content scroll-custom">
    <a class="btn text-start back mt-3" href="/notes"><i class="bi bi-arrow-left-circle me-2"></i>Kembali</a>
    {#if loading}
        <LoadingList/> 
    {:else if result.data.rows.length === 0}
        <div class="d-flex flex-column carousel-content">
            <CarouselContent data={result.data.rows} />
        </div>
    {:else}
        <div class="row" data-aos="fade-out" data-aos-duration="1000">
            <div class="col-12">
                <CarouselContent data={result.data.rows} />
            </div>
        </div>
        <div class="row" data-aos="fade-left" data-aos-duration="1000">
            <div class="col-12">
                <div class="d-flex flex-column judul" style="padding: 1rem;">
                    <h3>Latest Notes</h3>
                    <p>Jelajahi catatan saya—tutorial, wawasan teknologi, opini gajelas, dan pemikiran teknologi yang disusun untuk memicu ide dan terkadang memecahkan masalah.</p>
                </div>
            </div>
            <div class="col-12">
                <div class="flex-row card-group">
                    {#each result.data.rows as note}
                    <button class="card text-center" onclick={() => goto(`/notes/${category}/${note.Slug}`)}>
                        <div class="gradient-overlay"></div>
                        <img src="/img/notes/{note.Slug}.png" onerror={(e) => e.target.src = '/img/bg-mobile-fallback.jpg'} class="card-img-top rounded py-1" alt="">
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
                                <a class="text-decoration-none" href={`/#/notes/${category}/${note.Slug}`}>
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

        <!-- Pagination -->
        <nav class="my-4 w-100" aria-label="Pagination">
            <ul class="pagination justify-content-end" style="margin-right: 1rem;">
                <li class="page-item {currentPage === 1 ? 'disabled' : ''}">
                    <button class="page-link" onclick={() => goToPage(currentPage - 1)} aria-label="Previous"><i class="bi bi-caret-left-fill"></i></button>
                </li>

                {#each Array(totalPages) as _, i}
                <li class="page-item {currentPage === i + 1 ? 'active' : ''}">
                    <button class="page-link" onclick={() => goToPage(i + 1)}>{i + 1}</button>
                </li>
                {/each}

                <li class="page-item {currentPage === totalPages ? 'disabled' : ''}">
                    <button class="page-link" onclick={() => goToPage(currentPage + 1)} aria-label="Next"><i class="bi bi-caret-right-fill"></i></button>
                </li>
            </ul>
        </nav>

    {/if}
</div>

<style scoped>
    .content {
        /* background-color: salmon; */
        color: white;
        margin-top: 0;
        height: 99vh;
        max-height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        z-index: 99;
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
    }

    .card:hover .card-img-top {
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

    @media screen and (max-width: 768px) {
        .back{
            padding: 0 1rem;
        }
        .content {
            padding: 1px;
        }

        .content p {
            font-size: 0.85rem ! important;
        }

        .judul {
            padding: 0 0.5rem !important;
        }

        .card-group {
            padding: 2px !important;
        }

        .card {
            margin: 0 ! important;
        }

        .card-body {
            padding: 14px 5px;
        }

        .card-body h5 {
            font-size: 0.9rem ! important;
        }

        .card-body p {
            font-size: 0.8rem ! important;
        }

        .card-footer {
            font-size: 0.75rem ! important;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        .card-footer img {
            width: 1rem ! important;
            height: 1rem ! important;
            margin: auto;
        }
    }

</style>