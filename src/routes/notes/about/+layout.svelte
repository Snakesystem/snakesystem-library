<script>
    import Navigation from '$components/Navigation.svelte';

    const { children } = $props();

    let showNav = $state(false);

    const toggleNav = () => {
        showNav = !showNav;
    }
</script>

<section class="bg-dark">
  <div class="container">
    <div class="row">
      <button class="btn btn-dark btn-toggle d-lg-none" aria-label="Menu" onclick={toggleNav}>
        <i class="bi bi-list"></i>
      </button>
      <div class="col-lg-3 sidebar-overlay {showNav ? 'show' : ''}">
        <Navigation close={() => showNav = false}/>
      </div>
      <div class="col-lg-9 scroll-custom" data-aos="fade-down" data-aos-duration="1000">
        {@render children()}
      </div>
    </div>
  </div>
</section>

<style scoped>

  section {
    z-index: 9;
    height: 100vh;
  }

  .col-lg-9 {
    padding: 0 1rem;
  }

  .btn-toggle {
    display: none;
  }

  @media screen and (max-width: 768px) {

    .col-lg-9 {
      padding: 0;
    }

    .sidebar-overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 0;
      overflow: hidden;
      background-color: #323434;
      transition: width 0.3s ease, opacity 0.3s ease;
      z-index: 9999;
      opacity: 0;
    }

    .sidebar-overlay.show {
      width: 60%;
      opacity: 1;
    }

    .btn-toggle {
      display: block;
      position: absolute;
      width: 3rem;
      right: 1rem;
      top: 1rem;
      z-index: 99999;
      background-color: #323434;
      border-color: #323434;
    }
  }

</style>
