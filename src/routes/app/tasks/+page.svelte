<script>
  // Constants
  const TODAY = -3;
  const UPCOMING = -2;
  const HISTORY = -1;
  const INBOX = 0;
  // Components
  import Sidebar from "./Sidebar.svelte";
  import UpcomingView from './UpcomingView.svelte';
  // Stores
  import taskPageStore from "$lib/stores/taskPageStore.js";
  import OldViewTemp from "./OldViewTemp.svelte";
</script>

<svelte:head><title>Tasks: One Six Eight</title></svelte:head>
<div class="task-view-wrapper">
  <Sidebar />
  <div class="task-view">
    {#if $taskPageStore.selectedView === TODAY}
      <OldViewTemp />
    {:else if $taskPageStore.selectedView === UPCOMING}
      <UpcomingView />
    {/if}
  </div>
</div>

<style>
  .task-view-wrapper {
    display: flex;
    height: calc(100vh - 72px);
    background-color: #1b1b1b;
  }
  .task-view {
    flex: 1;
    padding-top: 30px;
  }
</style>
