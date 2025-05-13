<script>
  // @ts-nocheck
  import { push } from "svelte-spa-router";


</script>

<section class="home" data-aos="zoom-out" data-aos-duration="1000">
    <video class="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="/img/bg.mp4" type="video/mp4" /></video>
        <div class="masthead">
            <div class="masthead-content text-white">
                <div class="container-fluid px-4 px-lg-0">
                    <h1 class="fst-italic lh-1 mb-4">Snakesystem E-Library</h1>
                    <p class="mb-5">
                        <em>“Nulis bukan soal sempurna, tapi soal berbagi dan menjadi nyata.”</em> - Gue percaya bahwa setiap orang punya cerita yang layak dibagikan. Di sini, lo bakal nemuin tulisan-tulisan ringan tapi bermakna, hasil eksplorasi teknologi, serta pandangan tentang hal-hal sederhana yang sering kita lewatin begitu aja.
                    </p>
                </div>
                <nav class="nav flex-row justify-content-start gap-5">
                   <a class="nav-link" href="/#/"><i class="bi bi-house"></i><span>Home</span></a>
                   <a class="nav-link" href="/#/notes"><i class="bi bi-book"></i><span>Notes</span></a>
                   <a class="nav-link" href="/#/contact"><i class="bi bi-telephone"></i><span>Contact</span></a>
               </nav>
            </div>
        </div>
        <div class="social-icons">
        <div class="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
            <a aria-label="Twitter" class="btn btn-dark m-3" href="#!"><i class="bi bi-twitter"></i></a>
            <a aria-label="Github" class="btn btn-dark m-3" href="https://github.com/snakesystem"><i class="bi bi-github"></i></a>
            <a aria-label="Instagram" class="btn btn-dark m-3" href="#!"><i class="bi bi-instagram"></i></a>
        </div>
        </div>
</section>

<style scoped>

    section {
        height: 100%;
        overflow: hidden;
    }
    section:before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        opacity: 0.7;
        z-index: 1;
    }

    .nav {
        width: 100%;
    }

    .nav .nav-link {
        padding: 1rem;
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        background-color: var(--bs-link-color);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .nav .nav-link span {
        position: absolute;
        bottom: 0;
        margin-bottom: -2rem;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .nav .nav-link i {
        font-size: 1.5rem;
    }

    .nav .nav-link:hover {
        background-color: var(--bs-link-hover-color);
    }
</style>