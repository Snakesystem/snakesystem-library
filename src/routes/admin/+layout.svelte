<script>
  import Header from '$components/Header.svelte';
  import Loading from '$components/Loading.svelte';
  import Sidebar from '$components/Sidebar.svelte';
  import { isOpen, loading } from '$lib/index.js';

    const { children } = $props();
</script>

{#if $loading}
    <Loading />
{:else}
    <Sidebar />
    <Header />
    <section class="admin {$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}">
        <div class="card">
            {@render children()}
        </div>
    </section>
{/if}

<style lang="scss" scoped>
    .admin {
    position: absolute;
    top: 0;
    left: 15rem;
    width: calc(100% - 15rem); /* agar nggak ketimpa sidebar */
    height: 100%;
    display: flex;
    min-height: 100vh;
    transition: left 0.3s ease, width 0.3s ease;
    z-index: 0;
  }

  .admin {
    .sidebar-collapsed {
        left: 6rem;
        width: calc(100% - 6rem);
    }
  }

  .admin {
    .sidebar-open {
        left: 15rem;
        width: calc(100% - 15rem);
    }
  }

  .card {
    width: 100%;
    margin: 4rem 1rem 1rem 0;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    border: none;
  }
</style>