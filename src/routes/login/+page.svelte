<script>
    import { goto } from "$app/navigation";
    import MenuHome from "$components/MenuHome.svelte";
    import { baseUrl } from "$lib/index.js";
    import Swal from "sweetalert2";


    let formData = $state({
        password: '',
        email: '',
    });

    async function login() {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message,
                preConfirm: () => {
                    goto('/admin/dashboard');
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: data.message,
                text: data.error,
            })
        }
    }

</script>

<section class="home" data-aos="slide-top" data-aos-duration="500">
    <video class="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="/img/bg.mp4" type="video/mp4" /></video>
        <div class="masthead">
            <div class="masthead-content text-white w-100">
                <form onsubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>
                    <h2 class="mb-4">Masuk Admin</h2>
                    <div class="form-group mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" bind:value={formData.email}>
                    </div>
                    <div class="form-group mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="text" class="form-control" id="password" placeholder="Password" bind:value={formData.password}>
                    </div>
                    <!-- <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Email" bind:value={formData.email}>
                        <label for="email">Email</label>
                    </div> -->
                    <!-- <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="password" placeholder="Password" bind:value={formData.password}>
                        <label for="password">Password</label>
                    </div> -->
                    <button type="submit" class="btn btn-primary w-100 py-2 mb-5">Submit</button>
                </form>
            </div>
        </div>
        <div class="social-icons desktop-only">
            <div class="d-flex flex-row flex-lg-column justify-content-center align-items-end h-100">
                <a aria-label="Github" class="btn btn-dark m-3" href="https://github.com/feri-irawansyah"><i class="bi bi-github"></i><span>Github</span></a>
                <a aria-label="Instagram" class="btn btn-dark m-3" href="#!"><i class="bi bi-instagram"></i><span>Instagram</span></a>
                <a aria-label="home" class="btn btn-dark m-3" href="/#/"><i class="bi bi-house"></i><span>Home</span></a>
                <a aria-label="notes" class="btn btn-dark m-3" href="/#/notes"><i class="bi bi-book"></i><span>Catatan</span></a>
                <a aria-label="contact" class="btn btn-dark m-3" href="/#/contact"><i class="bi bi-telephone"></i><span>Kontak</span></a>
            </div>
        </div>
        <MenuHome />
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

    .desktop-only {
        display: flex;
    }

    @media screen and (max-width: 768px) {
        section {
            width: 100% ! important;
            position: fixed;
            padding: 0 ! important;
        }
        .desktop-only {
            display: none !important;
        }

        .masthead {
            height: 80%;
        }

        .masthead-content {
            padding: 0 1rem;
        }
    }
</style>