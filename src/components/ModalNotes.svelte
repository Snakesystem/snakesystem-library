<script>
    import { onMount } from "svelte";
    import { closeModal } from "../routes";
    const { data = {
        category: '',
        title: '',
        content_md: ''
    }, action = 'add', id } = $props();

    let formData = $state({
        category: '',
        title: '',
        content_md: ''
    });

    async function add() {
        const response = await fetch('/api/library/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(data.result) {
            closeModal();
        }
    }

</script>

<form on:submit|preventDefault={add}>
  <div class="mb-3">
    <label for="category" class="form-label">Notes Category</label>
    <!-- <input type="text" class="form-control" id="category" required aria-describedby="category" disabled bind:value={formData.category}> -->
     <select id="category" class="form-select" required aria-label="category" bind:value={formData.category}>
        <option selected>Open this select menu</option>
        <option value="technology">Technology</option>
        <option value="database">Database</option>
        <option value="personal">Personal</option>
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