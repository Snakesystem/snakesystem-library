<script>
    import { baseUrl, closeModal, paramsEditData } from "$lib/index.js";

    import { onMount } from "svelte";
    import Swal from "sweetalert2";
    
    const { refreshTable } = $props();
    const { data, action, table } = $paramsEditData;

    let formData = $state({
        category: '',
        title: '',
        content_md: ''
    });

    onMount(() => {
      if(action === 'edit') {
        formData.category = data.NotesCategory;
        formData.title = data.Title;
        formData.content_md = data.Content_MD;
      }
    })

    async function submit(e, id) {
      e.preventDefault();
      if(action === 'edit') {
        Swal.fire({
          title: 'Belum di buat bang?',
          text: "Data akan diubah!",
          icon: 'warning',
          preConfirm: () => {
            refreshTable();
          }
          // preConfirm: async () => {
          //   const response = await fetch(`${baseUrl}/library/update/${id}`, {
          //       method: 'PUT',
          //       credentials: 'include',
          //       headers: {
          //           'Content-Type': 'application/json'
          //       },
          //       body: JSON.stringify(formData)
          //   });
          //   const data = await response.json();
          //   if(data.result) {
          //     await refreshTable();
          //     closeModal();
          //   }
          // }
        })
      } else {
        const response = await fetch(`${baseUrl}/library/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(data.result) {
          await refreshTable();
          closeModal();
        }
      }
    }

</script>

<form onsubmit={(e) => submit(e, data.NotesNID)}>
  <div class="mb-3">
    <label for="category" class="form-label">Notes Category</label>
    <!-- <input type="text" class="form-control" id="category" required aria-describedby="category" disabled bind:value={formData.category}> -->
     <select id="category" class="form-select" required aria-label="category" bind:value={formData.category}>
        <option selected>Open this select menu</option>
        <option value="backend">Backend</option>
        <option value="frontend">Frontend</option>
        <option value="fullstack">Fullstack</option>
        <option value="random">Random</option>
      </select>
  </div>
  <div class="mb-3">
    <label for="title" class="form-label">Notes Title</label>
    <input type="text" class="form-control" id="title" required aria-describedby="title" bind:value={formData.title}>
  </div>
  <div class="mb-3">
    <label for="content_md" class="form-label">Notes Url</label>
    <input type="text" class="form-control" id="content_md" required aria-describedby="content_md" bind:value={formData.content_md}>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>