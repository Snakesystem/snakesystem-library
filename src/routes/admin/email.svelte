<script>
  import Sidebar from "../../components/Sidebar.svelte";
  import Header from "../../components/Header.svelte";
  import { isOpen } from "../index";

  // ini wajib supaya $isOpen bisa dipakai
</script>

<Sidebar />
<Header />

<section class="email {$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}">
  <div class="card">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
</section>

<style>
  .email {
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

  .email.sidebar-collapsed {
    left: 6rem;
    width: calc(100% - 6rem);
  }

  .email.sidebar-open {
    left: 15rem;
    width: calc(100% - 15rem);
  }

  .card {
    width: 100%;
    margin: 4rem 1rem 1rem 0;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    border: none;
  }
</style>
