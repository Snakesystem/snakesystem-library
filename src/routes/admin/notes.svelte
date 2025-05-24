<script>
  import Sidebar from "../../components/Sidebar.svelte";
  import Header from "../../components/Header.svelte";
  import ModalNotes from "../../components/ModalNotes.svelte";
  import ModalContainer from "../../lib/ModalContainer.svelte";
  import { isOpen, fetchColumns, openModal, base_url } from "../index";

  // ini wajib supaya $isOpen bisa dipakai
  import { onMount } from "svelte";

  let tablename = "Notes";
  let tablePK = "NotesNID";

  let filter = $state({});

  onMount(() => { 
    if(localStorage.getItem(`${tablename}_filter`)) {
      filter = JSON.parse(localStorage.getItem(`${tablename}_filter`));
    } else {
      localStorage.setItem(`${tablename}_filter`, JSON.stringify(filter));
    }
   })

  let result = $state({
    result: false,
    message: "",
    data: [],
    error: ""
  });

  function updateFilter(data) {
    filter = data;
    localStorage.setItem(`${tablename}_filter`, JSON.stringify(data));
  }

  function toolbarButton () {
    return {
      btnFilter: {
        text: "Filter",
        icon: "bi bi-search",
        event: function () {
          openModal("filter");
        },
        attributes: {
          title: "Search all data",
        }
      }
    }
  }

  function initTable(columns) {
    // Destroy table first if already exists
    // @ts-ignore
    globalThis.$("#myTable").bootstrapTable("destroy");

    // Initialize new table
    // @ts-ignore
    globalThis.$("#myTable").bootstrapTable({
      url: `${base_url}/data/get-table?tablename=${tablename}&nidkey=${tablePK}&filter=${JSON.stringify(filter)}`,
      method: "GET",
      contentType: "application/json",
      buttons: toolbarButton(),
      buttonsClass: "primary",
      // buttonsAlign: "left",
      // toolbarAlign: "right",
      dataType: "json",
      cache: true,
      sidePagination: "server",
      showColumns: true,
      pagination: true,
      showRefresh: true,
      autoRefresh: true,
      autoRefreshInterval: 120,
      toolbar: ".toolbar",
      offset: 0,
      pageSize: 100,
      pageList: [100, 200, 500],
      height: 750,
      columns: columns
    });
  }

  onMount(async () => {
    result = await fetchColumns(tablename);
    if (result.result && result.data && Array.isArray(result.data)) {
      initTable(result.data);
    } else {
      console.error("Data columns not valid", result);
    }
  });
</script>

<Sidebar />
<Header />

<section class="notes {$isOpen ? 'sidebar-open' : 'sidebar-collapsed'}">
  <div class="card">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <div class="toolbar">
        {#if Object.entries(filter).length > 0}
          FIlter: 
          <span class="text-muted">
            {#each Object.entries(filter) as [key, value], index}
              {#if key === 'IsRejected' || key === 'IsRevised' || key === 'IsFinished'}
                {key}: {value === '0' ? 'No' : 'Yes'}
              {:else}
                {key}: {value}
              {/if}
              {#if index < Object.entries(filter).length - 1}
                {' | '}
              {/if}
            {/each}
          </span>
        {:else}
          <span class="text-muted fw-bold">No Filter</span>
        {/if}
      </div>
        <table id="myTable" class="table table-striped" data-toggle="table"></table>
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a onclick={() => openModal("add-notes")} href={null} class="btn btn-primary">Add Notes</a>
    </div>
  </div>
  <ModalContainer id="add-notes" title="Add Notes" size="lg">
    <ModalNotes data={{}} action="add" id={0}/>
  </ModalContainer>

</section>

<style>
  .notes {
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

  .notes.sidebar-collapsed {
    left: 6rem;
    width: calc(100% - 6rem);
  }

  .notes.sidebar-open {
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
