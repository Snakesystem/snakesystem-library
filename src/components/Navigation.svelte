<script>
  import { goto } from "$app/navigation";
    const { close } = $props();
    import { page } from "$app/state";

    const buttons = [
        { icon: 'bi-house-check-fill', menu_url: '/', title: 'Home' },
        { icon: 'bi-database-fill-gear', menu_url: '/notes/backend', title: 'Backend' },
        { icon: 'bi-images', menu_url: '/notes/frontend', title: 'Frontend' },
        { icon: 'bi-stack', menu_url: '/notes/fullstack', title: 'Fullstack' },
        { icon: 'bi-shuffle', menu_url: '/notes/random', title: 'Random' },
        { icon: 'bi-info-circle', menu_url: '/notes/about', title: 'About' },
    ];

    function isActive(menu_url) {
        const pathname = page.url.pathname;
        return menu_url === '/' 
            ? pathname === '/' 
            : pathname.startsWith(menu_url);
    }

</script>

<div class="navigation flex h-100" data-aos="fade-in">
    <div class="card text-start">
        <div class="card-header d-flex flex-column justify-content-start">
            <img src="/img/logo-ss.png" class="mb-3 rounded-circle" alt="" width="50px" height="50px">
            <h3 class="card-title lh-1">Feri Irawansyah </h3>
            <a class="text-decoration-none text-muted" href="https://github.com/feri-irawansyah" target="_blank">@feri-irawansyah <img src="/img/real.png" width="20px" alt=""></a>
        </div>
        <div class="card-body">
            <div class="d-flex flex-column">
                {#each buttons as item, i}
                    <button class="btn text-start { isActive(item.menu_url) ? 'active' : ''}" onclick={() => {
                        goto(item.menu_url);
                        close();
                    }}>
                        <i class="bi {item.icon} me-2"></i> {item.title} <i class="bi bi-chevron-right float-end {isActive(item.menu_url) ? '' : 'd-none'}"></i>
                    </button>
                {/each}
            </div>
        </div>
        
    </div>
</div>

<style scoped>
    .navigation{
        padding: 2rem 0 0 0;
    }
    .card {
        width: 100%;
        border: none;
        background-color: transparent;
        border: none;
    }

    .card-header{
        background-color: transparent;
        border: none;
    }

    .card-body button {
        width: 100%;
        padding: 1rem;
        margin: 0.1rem 0;
        background-color: transparent;
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
    }

    .active {
        background-color: #474747 !important;
        border: none;
    }

    .card-body button:hover {
        background-color: #353535;
    }

    @media screen and (max-width: 768px) {
        .navigation{
            padding: 2rem 0 0 0;
        }

        .card-title {
            font-size: 1.3rem;
        }
    }
</style>