<script>
    import { onMount } from 'svelte';
    import LoadingList from '../../components/LoadingList.svelte';

    const { slug } = $props();
    let result = $state({
        result: false,
        data: []
    });
    let loading = $state(true);
    
    onMount(async() => {
        try {
            if(slug?.slug) {
                const response = await fetch(`/api/library/get/${slug?.slug}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                result = data; 
                if(data.result) {
                    loading = false
                }
            }
            
        } catch (err) {
            loading = false
            console.error(err);
        }
    })

</script>

<div class="content">
    
    <h1 class="">Notes List {slug?.slug}</h1>
    {#if loading}
        <LoadingList/>
    {:else}
        <div class="flex-row card-group">
            {#each result.data as note}
            <div class="card text-center">
                <div class="card-header">
                    {note.Slug}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{note.Title}</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="/#/notes/{slug?.slug}/{note.Slug}" class="btn btn-primary">Go somewhere</a>
                </div>
                <div class="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>
            {/each}
        </div>
    {/if}
</div>

<style scoped>
    .content {
        color: white;
        margin-top: 0;
        height: 99vh;
        max-height: 100vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        z-index: 99;
        background-color: #04414dda;
        padding: 1rem 5rem, 5rem 5rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .content .card-group {
        display: grid;
        grid-template-columns: 1fr; /* default: 1 kolom (mobile) */
        gap: 0.5rem;
        width: 100%;
        padding: 0.7rem;
        max-height: 85%;
        overflow-y: scroll;
    }

    .content .card-group .card {
        border-radius: 10px;
    }

    /* Breakpoint untuk desktop (≥ 768px atau lebih besar) */
    @media (min-width: 768px) {
        .content .card-group {
            grid-template-columns: repeat(3, 1fr); /* 3 kolom */
        }
    }

</style>