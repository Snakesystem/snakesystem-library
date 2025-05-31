<script>
  // @ts-nocheck
    import { push } from "svelte-spa-router";

    let formData = $state({
        name: '',
        email: '',
        message: ''
    });

</script>

<section class="home" data-aos="slide-left" data-aos-duration="500">
    <video class="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="/img/bg.mp4" type="video/mp4" /></video>
        <div class="masthead">
            <div class="masthead-content text-white">
                <div class="container-fluid px-4 px-lg-0">
                    <form action="">
                        <h1 class="mb-4">Contact</h1>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="name" placeholder="Name" bind:value={formData.name}>
                            <label for="name">Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="email" placeholder="Email" bind:value={formData.email}>
                            <label for="email">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea class="form-control" placeholder="Message" id="message" style="height: 10rem" bind:value={formData.message}></textarea>
                            <label for="message">Message</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 py-2 mb-5">Send</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="social-icons">
        <div class="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
            <a aria-label="Twitter" class="btn btn-dark m-3" href="#!"><i class="bi bi-twitter"></i></a>
            <a aria-label="Github" class="btn btn-dark m-3" href="https://github.com/feri-irawansyah"><i class="bi bi-github"></i></a>
            <a aria-label="Instagram" class="btn btn-dark m-3" href="#!"><i class="bi bi-instagram"></i></a>
            <a aria-label="home" class="btn btn-dark m-3" href="/#/"><i class="bi bi-house"></i></a>
            <a aria-label="notes" class="btn btn-dark m-3" href="/#/notes"><i class="bi bi-book"></i></a>
            <a aria-label="contact" class="btn btn-dark m-3" href="/#/contact"><i class="bi bi-telephone"></i></a>
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