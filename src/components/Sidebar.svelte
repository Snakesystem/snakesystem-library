<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { baseUrl, isOpen } from "$lib/index.js";

  const toggleSidebar = () => {
    isOpen.update(value => !value);
  };

  const menus = [
    { title: "Dashboard", icon: "bi-speedometer2", href: "/admin/dashboard" },
    { title: "Catatan", icon: "bi-journal-text", href: "/admin/catatan" },
    // { title: "Email Log", icon: "bi-envelope", href: "/admin/email" },
    { title: "Settings", icon: "bi-gear", href: "/admin/settings" },
    { title: "Chat", icon: "bi-chat", href: "/admin/chat" },
  ];

  async function logout() {
      const response = await fetch(`${baseUrl}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();

      if(response.ok) {
        goto('/');
      }
      
    }

</script>

<div class="d-flex">
  <!-- Sidebar -->
  <div class={`text-white p-3 ${$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`} style="min-height: 100vh; transition: width 0.3s;">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0">{$isOpen ? 'Snakesystem' : ''}</h5>
      <button aria-label="Toggle sidebar" class="btn btn-sm btn-light" onclick={toggleSidebar}>
        <i class={`bi ${$isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
      </button>
    </div>
    
    <ul class="nav nav-pills flex-column">
      {#each menus as menu}
        <li class="nav-item my-2">
          <a class="nav-link text-white d-flex align-items-center {page.url.pathname === menu.href ? 'active' : ''}" href={menu.href}>
            <i class={`bi ${menu.icon} me-2`}></i>
            {#if $isOpen}
              <span>{menu.title}</span>
            {/if}
          </a>
        </li>
      {/each}
        <li class="nav-item my-2">
          <a class="nav-link d-flex align-items-center text-danger" href={null} onclick={logout} style="cursor: pointer;">
            <i class="bi bi-box-arrow-right me-2"></i>
            <span>{$isOpen ? 'Logout' : ''}</span>
          </a>
        </li>
    </ul>
  </div>

  <!-- Main Content -->
  <div class="flex-fill p-4 bg-light">
    <slot />
  </div>
</div>

<style lang="scss" scoped>
  .sidebar-collapsed {
    width: 80px;
  }
  .sidebar-open {
    width: 220px;
  }

  a.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .nav-link.active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .nav-link {
    display: flex;
    flex-direction: column;

    i {
      font-size: 1.8rem;
    }
    span {
      font-size: 1.2rem;
    }
  }
</style>
