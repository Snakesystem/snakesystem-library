<script>
  import ModalFilter from "$components/modals/ModalFilter.svelte";
  import ModalNotes from "$components/modals/ModalNotes.svelte";
  import ModalContainer from "$directives/ModalContainer.svelte";
  import { fetchColumns, initTable, openModal } from "$lib/index.js";

  // ini wajib supaya $isOpen bisa dipakai
  import { onMount } from "svelte";

  let tablename = "Notes";
  let tablePK = "NotesNID";

  let filter = $state({});

  onMount(() => {
    const storageValue = localStorage.getItem(`${tablename}_filter`);

    // Kalau belum ada, set kosong object di localStorage
    if (storageValue === null) {
        localStorage.setItem(`${tablename}_filter`, JSON.stringify({}));
        filter = {}; // default
    } else {
        try {
            const parsed = JSON.parse(storageValue);

            // Kalau hasil parse undefined atau null (atau 'undefined' string karena disimpan salah)
            if (parsed === undefined || parsed === null) {
                filter = {};
                localStorage.setItem(`${tablename}_filter`, JSON.stringify({}));
            } else {
                filter = parsed; // normal case
            }
        } catch (e) {
            // Kalau parsing JSON gagal (corrupt data), reset
            console.warn('Invalid JSON in localStorage, resetting:', e);
            filter = {};
            localStorage.setItem(`${tablename}_filter`, JSON.stringify({}));
        }
    }
});

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

  onMount(async () => {
    result = await fetchColumns(tablename);
    result.data.unshift({
      field: "Action",
      title: "Action",
      sortable: false,
      filterControl: null
    });

    if (result.result && result.data && Array.isArray(result.data)) {
      initTable(result.data, tablename, tablePK, filter, toolbarButton);
    } else {
      console.error("Data columns not valid", result);
    }
  });
  
</script>

<div class="card-header">
    Featured
</div>
<div class="card-body">
    <div class="toolbar d-flex gap-3">
        <a onclick={() => openModal("add-notes")} href={null} class="btn btn-primary">Add Notes</a>
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
</div>
<ModalContainer id="add-notes" title="Add Notes" size="lg">
  <ModalNotes refreshTable={() => initTable(result.data, tablename, tablePK, filter, toolbarButton)}/>
</ModalContainer>
<ModalContainer id="filter" title="Filter {tablename}" size="lg">
  <ModalFilter data={result.data} tablename={tablename} updateFilter={updateFilter} initTable={initTable} toolbarButton={toolbarButton} tablePK={tablePK}/>
</ModalContainer>
