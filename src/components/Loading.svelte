<script>
    import { Jumper } from 'svelte-loading-spinners';
    import { fade } from 'svelte/transition';
</script>

<div class="loading-screen" transition:fade>
    <Jumper size="100" color="#00809D" unit="px" duration="1s" />
    <span>Please wait...</span>
</div>

<style>
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: #fff;
        font-size: 24px;
        transition: opacity 0.3s ease-in-out;
    }
</style>