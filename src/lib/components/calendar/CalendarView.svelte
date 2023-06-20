<script>
  // Helper functions
  import { getArrayOfDays, getCurrentDate, parseDateString, eventOnDay } from "$lib/shared/dateHelper.js";

  // Components
  import CalendarEvent from "$lib/components/calendar/CalendarEvent.svelte";
  import CalendarTaskItem from "$lib/components/calendar/CalendarTaskItem.svelte";

  // Stores
  import eventStore from "$lib/stores/eventStore.js";
  import taskStore from "$lib/stores/taskStore.js";
  import habitStore from "$lib/stores/habitStore.js";
    import CalendarHabitItem from "./CalendarHabitItem.svelte";

  let dayOffset = 2;

  $: dateWindow = getArrayOfDays(7, dayOffset).map(d => ({
    details: parseDateString(d), 
    events: $eventStore.filter(e => eventOnDay(e.startTime, e.endTime, d)),
    tasks: $taskStore.filter(t => t.dueDate === d),
  }));

  const shiftDateWindowRight = (amount) => {
    dayOffset -= amount;
  }
</script>

<div class="controls-header">
  <button on:click={() => shiftDateWindowRight(-7)}>&lt;</button>
  <h1 style="display: inline;">June 2023</h1>
  <button on:click={() => shiftDateWindowRight(7)}>&gt;</button>
</div>
<div class="day-header-wrapper">
  {#each dateWindow as date}
    <div class="day-header">
      <div class="date" class:current-date={getCurrentDate() === date.details.dateString}>
        <div>{date.details.dayOfWeek.substring(0, 3)}</div>
        <div style="font-size: 1.5em">{date.details.day}</div>
      </div>
      {#each date.tasks as task}
        <CalendarTaskItem task={task} />
      {/each}
      {#each $habitStore as habit}
        <CalendarHabitItem habit={habit} date={date.details.dateString} />
      {/each}
    </div>
  {/each}
</div>
<div class="contents">
  {#each dateWindow as date}
    <div class="day-column">
      {#each date.events as event}
        <CalendarEvent eventId={event.id} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .controls-header {
    display: flex;
    margin: 10px auto;
    gap: 10px;
    justify-content: center;
  }
  .controls-header h1 {
    margin: 0;
  }
  .day-header-wrapper {
    display: flex;
    border-bottom: 1px solid grey;
    margin: 10px 0 0;
    padding-bottom: 5px;
    height: 9%;
    resize: vertical;
    overflow-y: hidden;
  }
  .day-header {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .date {
    width: fit-content;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
  }
  .current-date {
    background-color: #36b2ff;
  }
  .contents {
    flex: 1;
    display: flex;
    background-color: azure;
    overflow-y: auto;
  }
  .day-column {
    flex: 1;
    min-height: 12in;
    border-right: 1px solid grey;
    background-size: 100% 4.167%;
    background-image: linear-gradient(to bottom, grey 1px, transparent 1px);
  }
</style>