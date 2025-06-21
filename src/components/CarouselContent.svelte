<script>
    import { formatWIBDate } from "$lib/index.js";

    const { data = [] } = $props();
</script>

{#if data.length > 0}
    <div id="carouselExampleAutoplaying" class="carousel slide carousel-data" data-bs-ride="carousel">
        <div class="carousel-inner">
            {#each data.slice(0, 3) as item, i}
                <a href={`/notes/${item.NotesCategory}/${item.Slug}`} class="carousel-item {i === 0 ? 'active' : ''}">
                    <img src={`/img/notes/${item.Slug}.png`} onerror={(e) => e.target.src = '/img/bg-mobile-fallback.jpg'} class="d-block w-100" alt={item.Title}>
                    <div class="carousel-caption">
                        <p class="lh-1">{formatWIBDate(item.LastUpdate)}</p>
                        <h5 class="text-uppercase text-start">{item.Title}</h5>
                        <p class="text-start">{item.Description || 'No description available.'}</p>
                        <div class="d-flex gap-2 author" style="width: 100%; height: 20%; padding: 0 5px; border-radius: 5px;">
                            <img class="img-fluid rounded-circle" src="/img/logo-ss.png" alt="" style="width: 1.2rem; height: 1.2rem;">
                            <span class="lh-1">Feri Irawansyah</span>
                        </div>
                    </div>
                </a>
            {/each}
            <div class="gradient-overlay"></div>
            <button class="btn btn-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" aria-label="Previous">
                <i class="bi bi-caret-left-fill"></i>
            </button>
            <button class="btn btn-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" aria-label="Next">
                <i class="bi bi-caret-right-fill"></i>
            </button>
        </div>
    </div>
{:else}
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
            <div class="gradient-overlay" style="height: 100%;"></div>
        </div>
    </div>
{/if}

<style lang="scss" scoped>

    .carousel-data {
        .carousel-caption{
            width: 100% !important;
        }
    }

    .carousel a:hover img.d-block {
        filter: blur(4px) !important;
        transition: filter 0.3s ease !important;
    }

    .carousel a:hover h5, .carousel:hover p, .carousel:hover span {
        text-decoration: underline !important;
    }

    @media screen and (max-width: 768px) {
        .carousel {
            border-radius: 10px;
            padding: 2rem 2px 0 2px;
            height: auto !important;
            margin-bottom: 1rem;
        }

        .carousel-inner {
            padding: 0 !important;
        }

        .carousel-item {
            position: absolute;
            padding: 0 !important;
        }

        .carousel-caption {
            position: absolute !important;
            bottom: -1rem !important;
            right: 0;
            padding: 0 5px !important;
            height: auto !important;

            .author {
                // background-color: salmon !important;
                display: flex !important;

                img {
                    width: 1rem !important;
                    height: 1rem !important;
                }

                span {
                    line-height: 1rem !important;
                }
            }
        }

        .carousel button {
            position: absolute;
            top: 80% !important;
        }

        .carousel-caption h5 {
            font-size: 0.9rem !important;
        }

        .carousel-caption p {
            font-size: 0.75rem !important;
        }
    }
</style>