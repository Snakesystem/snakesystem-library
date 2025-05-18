<script>
  import { isOpen } from "../routes"

  const toggleSidebar = () => {
    isOpen.update(value => !value);
  };

  const menus = [
    { title: "Dashboard", icon: "bi-speedometer2", href: "#/dashboard" },
    { title: "Notes", icon: "bi-journal-text", href: "#/dashboard/notes" },
    { title: "Email Log", icon: "bi-envelope", href: "#/dashboard/email" },
    { title: "Settings", icon: "bi-gear", href: "#/dashboard/settings" }
  ];

</script>

<div class="d-flex">
  <!-- Sidebar -->
  <div class={`text-white p-3 ${$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`} style="min-height: 100vh; transition: width 0.3s;">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0">{$isOpen ? 'Snakesystem' : ''}</h5>
      <button class="btn btn-sm btn-light" on:click={toggleSidebar}>
        <i class={`bi ${$isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
      </button>
    </div>
    
    <ul class="nav nav-pills flex-column">
      {#each menus as menu}
        <li class="nav-item">
          <a class="nav-link text-white d-flex align-items-center" href={menu.href}>
            <i class={`bi ${menu.icon} me-2`}></i>
            {#if $isOpen}
              <span>{menu.title}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>

    <!-- <div class="mt-auto">
      <button on:click={() => {}} class="bg-primary rounded-circle text-white" href={null}><i class="bi bi-box-arrow-in-right"></i></button>
    </div> -->
  </div>

  <!-- Main Content -->
  <div class="flex-fill p-4 bg-light">
    <slot />
  </div>
</div>

<style>
  .sidebar-collapsed {
    width: 80px;
  }
  .sidebar-open {
    width: 220px;
  }

  a.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .nav-link.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
