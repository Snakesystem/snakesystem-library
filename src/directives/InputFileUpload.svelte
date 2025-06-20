<script>
  import { createEventDispatcher } from 'svelte';

  const { required } = $props();

  const dispatch = createEventDispatcher();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch('update', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<label class="file-input-wrapper">
  <div class="upload-label">
    <i class="bi bi-upload"></i>
    Upload Gambar
  </div>
  <input type="file" accept="image/*" onchange={handleFileChange} {required} />
</label>

<style>
  .file-input-wrapper {
    display: inline-block;
    position: relative;
    overflow: hidden;
    border: 2px dashed #adb5bd; /* border abu-abu, patah-patah */
    background-color: #f8f9fa; /* putih abu */
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: border-color 0.3s ease;
    text-align: center;
    width: 100%;
  }

  .file-input-wrapper:hover {
    border-color: #6c757d;
  }

  .file-input-wrapper input[type="file"] {
    position: absolute;
    font-size: 100px;
    opacity: 0;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }

  .upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #495057;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .upload-label i {
    font-size: 1.2rem;
  }
</style>