<script>
    import { isOpen } from "$lib/index.js";
    import { page } from "$app/state";

    function RenameUrl(params) {
      if(params) {
          return params.replace('/', ' ').toUpperCase();
      }
    }

</script>

<nav class="navbar {$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}">
  <div class="container-fluid">
    <a class="navbar-brand" href="/dashboard">{RenameUrl(page.url.location)}</a>
    <div class="navbar-nav d-flex flex-row gap-3">
      <!-- <a class="nav-link" href="#">Features</a>
      <a class="nav-link" href="#">Pricing</a>
      <a class="nav-link" >Disabled</a> -->
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: absolute;
    top: 0;
    left: 15rem;
    width: calc(100% - 15rem); /* agar nggak ketimpa sidebar */
    display: flex;
    flex-direction: column;
    transition: left 0.3s ease, width 0.3s ease;
    z-index: 1;
  }

  .container-fluid .navbar-nav {
    width: 3rem;
    height: 3rem;
  }

  .navbar.sidebar-collapsed {
    left: 6rem;
    width: calc(100% - 6rem);
  }

  .navbar.sidebar-open {
    left: 15rem;
    width: calc(100% - 15rem);
  }
</style>