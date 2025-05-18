<script>
    import { push } from "svelte-spa-router";
    // import notesRoutes from "../routes/client/books";

    let isOpen = true;

    const toggleMenu = () => {
        isOpen = !isOpen;
    };

    const buttons = [
        { icon: 'bi-house', deg: -90, menu_url: '/', title: 'Home' },
        { icon: 'bi-gear', deg: -45, menu_url: 'technology', title: 'Technology' },
        { icon: 'bi-person', deg: 0, menu_url: 'personal', title: 'Personal' },
        { icon: 'bi-database', deg: 45, menu_url: 'database', title: 'Database' },
        { icon: 'bi-info-circle', deg: 90, menu_url: 'about', title: 'About' },
    ];
</script>

<!-- <section>
    <Router routes={notesRoutes} />
</section> -->

<div class="fab-container {isOpen ? 'open' : ''}" title="Menu">
  <button aria-label="Toggle menu" class="fab-toggle {isOpen ? 'rotate' : ''}" on:click={toggleMenu}>
    <i class="bi bi-{isOpen ? 'columns-gap' : 'grid'}"></i>
  </button>
  <div class="fab-menu">
    {#each buttons as item, i}
      <button
        on:click={() => {
          if(item.menu_url === '/') {
            push(`/`)
          } else {
            push(`/notes/${item.menu_url}`)
          }
        }}
        class="fab-item"
        id="fab-item-{i + 1}"
        title="{item.title}"
        style="--deg: {item.deg}deg;"
        aria-label="Menu {i + 1}"
      >
        <i class="bi {item.icon}"></i>
      </button>
    {/each}
  </div>
</div>


<style>
  .fab-container {
    position: fixed;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    z-index: 999;
  }

  .fab-toggle {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: #007bff;
    color: #fff;
    font-size: 24px;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  .fab-toggle.rotate {
    transform: rotate(135deg);
  }

  .fab-menu {
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .fab-item {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #17a2b8;
    color: #fff;
    font-size: 18px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    transition: 0.3s;
    pointer-events: auto;
  }

  .fab-container.open .fab-item {
    opacity: 1;
    transform:
      translate(-50%, -50%) scale(1)
      rotate(var(--deg))
      translateX(90px)
      rotate(calc(-1 * var(--deg)));
  }

</style>