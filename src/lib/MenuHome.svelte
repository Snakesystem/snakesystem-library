<script>
    import { push } from "svelte-spa-router";

    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
    };

    const buttons = [
        { icon: 'bi-house', deg: -180, menu_url: '/', title: 'Home' },
        { icon: 'bi-telephone', deg: -135, menu_url: '/contact', title: 'Contact' },
        { icon: 'bi-book', deg: -90, menu_url: '/notes', title: 'Notes' },
        { icon: 'bi-github', deg: -45, menu_url: 'https://github.com/feri-irawansyah', title: 'Github' },
        { icon: 'bi-instagram', deg: 0, menu_url: 'https://www.instagram.com/fery_ir.1', title: 'Instagram' },
    ];
</script>

<div class="fab-container {isOpen ? 'open' : ''}" title="Menu">
  <button aria-label="Toggle menu" class="fab-toggle btn btn-primary {isOpen ? 'rotate' : ''}" on:click={toggleMenu}>
    <i class="bi bi-{isOpen ? 'columns-gap' : 'grid'}"></i>
  </button>
  <div class="fab-menu">
    {#each buttons as item, i}
      <button
        on:click={() => {
          if(item.menu_url === '/') {
            push(`/`)
          } else {
            push(item.menu_url)
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
    display: none;
  }

  .fab-container {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }

  .fab-toggle {
    width: 60px;
    height: 60px;
    border-radius: 10px;
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

  @media screen and (max-width: 768px) {
      .fab-container {
        display: flex !important;
      }
    }

</style>