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
            </div>
        </div>
        <div class="social-icons">
            <div class="d-flex flex-row flex-lg-column justify-content-center align-items-end h-100">
                <a aria-label="Twitter" class="btn btn-dark m-3" href="#!"><i class="bi bi-twitter"></i><span>Twitter</span></a>
                <a aria-label="Github" class="btn btn-dark m-3" href="https://github.com/feri-irawansyah"><i class="bi bi-github"></i><span>Github</span></a>
                <a aria-label="Instagram" class="btn btn-dark m-3" href="#!"><i class="bi bi-instagram"></i><span>Instagram</span></a>
                <a aria-label="home" class="btn btn-dark m-3" href="/#/"><i class="bi bi-house"></i><span>Home</span></a>
                <a aria-label="notes" class="btn btn-dark m-3" href="/#/notes"><i class="bi bi-book"></i><span>Catatan</span></a>
                <a aria-label="contact" class="btn btn-dark m-3" href="/#/contact"><i class="bi bi-telephone"></i><span>Kontak</span></a>
            </div>
        </div>
</section>

<style scoped>

    section {
        height: 100vh;
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
</style>