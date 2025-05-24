<script>
    import { base_url, isOpen } from "../routes"
    import { location } from "svelte-spa-router"

    function RenameUrl(params) {
      if(params) {
          return params.replace('/', ' ').toUpperCase();
      }
    }

    async function logout() {
      const response = await fetch(`${base_url}/auth/logout`, {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      if(data.result) {
          location.set('/');
      }
    }

</script>

<nav class="navbar {$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{RenameUrl($location)}</a>
    <div class="navbar-nav d-flex flex-row gap-3">
      <button type="button" on:click={() => logout()} class="nav-link bg-primary rounded-circle text-white"><i class="bi bi-box-arrow-in-right"></i></button>
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

  .container-fluid .navbar-nav button i {
    padding: 0.8rem;
    font-size: 1.2rem;
    cursor: pointer;
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