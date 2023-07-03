<script>
  import CalendarSidebar from "$lib/components/calendar/CalendarSidebar.svelte";
  import CalendarView from "$lib/components/calendar/CalendarView.svelte";
</script>

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