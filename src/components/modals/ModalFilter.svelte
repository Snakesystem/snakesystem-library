<script>
  import { onMount } from 'svelte';

  export let data;
  export let tablename;
  export let updateFilter;
  export let initTable;
  export let toolbarButton;
  export let tablePK;

  let formData = {};

  // Inisialisasi formData dan coba ambil data sebelumnya dari localStorage
  onMount(() => {
    const saved = localStorage.getItem(`${tablename}_filter`);
    if (saved) {
      formData = JSON.parse(saved);
    } else {
      data.forEach((/** @type {{ field: string | number; }} */ item) => {
        formData[item.field] = '';
      });
    }
  });

  function submit() {
  // Buat salinan formData tanpa field kosong
    const cleanData = {};

    for (const key in formData) {
      const value = formData[key];
      if (value !== '' && value != null) {
        cleanData[key] = value;
      }
    }

    localStorage.setItem(`${tablename}_filter`, JSON.stringify(cleanData));
    updateFilter(cleanData);
    initTable(data, tablename, tablePK, formData, toolbarButton);
  }

  function reset() {
    formData = {};
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="row">
    {#each data as item}
  {#if item.field === 'IPAddress'}
    <!-- skip -->
  {:else if item.field === 'LastUpdate'}
    <!-- <div class="col-md-4 mb-3">
      <label for={item.field} class="form-label">{item.title}</label>
      <input
        type="date"
        class="form-control form-control-sm"
        id={item.field}
        bind:value={formData[item.field]}
      />
    </div> -->
  {:else if item.field === 'NotesCategory'}
    <div class="col-md-4 mb-3">
      <label for={item.field} class="form-label">{item.title}</label>
      <select
        class="form-control form-control-sm"
        id={item.field}
        bind:value={formData[item.field]}>
        <option value="">-- Pilih Kategori --</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Fullstack</option>
        <option value="random">Random</option>
      </select>
    </div>
  {:else}
    <div class="col-md-4 mb-3">
      <label for={item.field} class="form-label">{item.title}</label>
      <input
        type="text"
        class="form-control form-control-sm"
        id={item.field}
        placeholder="Input {item.title}"
        bind:value={formData[item.field]}
      />
    </div>
  {/if}
{/each}

  </div>

  <div class="d-flex footer justify-content-between">
    <button type="button" class="btn btn-warning btn-sm" on:click={reset}>Clear <i class="bi bi-arrow-clockwise"></i></button>
    <button type="submit" class="btn btn-primary btn-sm">GO <i class="bi bi-search"></i></button>
  </div>
</form>

<style scoped>
    form {
      font-size: 12px;
    }

    form input {
      font-size: 12px;
    }

    .footer button {
      font-size: 12px;
    }

</style>