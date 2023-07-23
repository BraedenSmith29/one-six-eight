<script>
  import CalendarSidebar from "./CalendarSidebar.svelte";
  import CalendarView from "./CalendarView.svelte";
</script>

<svelte:head><title>Calendar: One Six Eight</title></svelte:head>
<div class="calendar-view-wrapper">
  <CalendarSidebar />
  <div class="calendar-view">
    <CalendarView />
  </div>
</div>

<style>
  .calendar-view-wrapper {
    display: flex;
    height: calc(100vh - 72px);
  }
  .calendar-view {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>