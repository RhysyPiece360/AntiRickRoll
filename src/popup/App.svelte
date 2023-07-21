<script>
    import { page } from "./lib/stores";

    import BottomNav from "./lib/layout/bottom-nav.svelte";
    import Header from "./lib/layout/header.svelte";
    import Home from "./pages/home.svelte";
    import Rickrolldb from "./pages/rickrolldb.svelte";
    import Settings from "./pages/settings.svelte";
    import Stats from "./pages/stats.svelte";
    import ApproveVideos from "./pages/approve.svelte"; // Add this line
    import { fade } from "svelte/transition";

    const fadeOptions = {
        duration: 200,
    };
</script>
<div class="max-w-fit">
    <Header />

    <div class="h-96 overflow-x-auto">
        {#if $page === 0}
            <div in:fade={fadeOptions}>
                <Home />
            </div>
        {:else if $page === 1}
            <div in:fade={fadeOptions}>
                <Stats />
            </div>
        {:else if $page === 2}
            <div in:fade={fadeOptions}>
                <Rickrolldb />
            </div>
        {:else if $page === 3}
            <div in:fade={fadeOptions}>
                <Settings />
            </div>
        {:else if $page === 4} <!-- Add this block -->
            <div in:fade={fadeOptions}>
                <ApproveVideos />
            </div>
        {/if}
    </div>

    <BottomNav />
</div>