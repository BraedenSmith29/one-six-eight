<script>
  // Helper functions
  import { getArrayOfDays, getCurrentDate, parseDateString, eventOnDay, timeDifference } from "$lib/shared/dateHelper.js";

  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  import CalendarEvent from "$lib/components/calendar/CalendarEvent.svelte";
  import CalendarTaskItem from "$lib/components/calendar/CalendarTaskItem.svelte";

  // Stores
  import eventStore from "$lib/stores/eventStore.js";
  import taskStore from "$lib/stores/taskStore.js";
  import groupStore from "$lib/stores/groupStore.js";

  let dayOffset = 2;
  let showAllTasks = false;

  // Negative if time1 is before time2
  function compareTimes(time1, time2) {
    if (time1 < time2) return -1;
    else if (time1 > time2) return 1;
    else return 0;
  }
  
  // Sort the events
  let sortedEvents;
  $: {
    sortedEvents = $eventStore.filter(e => $groupStore.find(c => c.id === e.groupId).show)
                              .sort((e1, e2) => compareTimes(e1.startTime, e2.startTime) || compareTimes(e2.endTime, e1.endTime))
                              .map(e => ({event: e, blockSqueeze: 100, textSqueeze: 100}));
    // Now set the squeeze factor of each event
    sortedEvents.forEach((e, i) => {
      sortedEvents.slice(i + 1).forEach(f => {
        if (timeDifference(f.event.startTime, e.event.startTime) <= 60) {
          // If f starts less than or equal to an hour after e
          f.blockSqueeze -= 30;
          e.textSqueeze = (30 / e.blockSqueeze) * 100;
        }else
        if (timeDifference(f.event.startTime, e.event.endTime) < 0) {
          // If f starts before e ends
          f.blockSqueeze -= 5;
        }
      });
      // Make sure we can at least see it
      if (e.blockSqueeze < 5) {
        e.blockSqueeze = 5;
        e.textSqueeze = 100;
      }
      // Take advantage of ~janky typing~ to turn these into percent strings for the css
      e.blockSqueeze += "%";
      e.textSqueeze += "%";
    });
  }

  $: dateWindow = getArrayOfDays(7, dayOffset).map(d => ({
    details: parseDateString(d), 
    events: sortedEvents.filter(e => eventOnDay(e.event.startTime, e.event.endTime, d)), 
    tasks: $taskStore.filter(t => t.dueDate === d && !t.complete && $groupStore.find(p => p.id === t.groupId).show)
  }));

  const shiftDateWindowRight = (amount) => {
    dayOffset -= amount;
  }

  let addEventFields;
  let showModal = false;
  function toggleModal() {
    // Clear the fields and toggle
    addEventFields = {
      title: "",
      startTime: "",
      endTime: "",
      description: "",
    };
    showModal = !showModal;
  }
  function addEvent() {
    eventStore.update(events => {
      let newEvent = {
        id: Math.max(...events.map(e => e.id)) + 1,
        title: addEventFields.title,
        startTime: addEventFields.startTime,
        endTime: addEventFields.endTime,
        description: addEventFields.description,
        groupId: $groupStore[0].id
      };
      return [...events, newEvent];
    });
    toggleModal();
  }
</script>

<div class="controls-header">
  <button on:click={() => shiftDateWindowRight(-7)}>&lt;</button>
  <h1 style="display: inline;">June 2023</h1>
  <button on:click={() => shiftDateWindowRight(7)}>&gt;</button>
</div>
<div class="day-header-wrapper">
  <spacer style="width: 63.69px"></spacer>
  {#each dateWindow as date}
    <div class="day-header">
      <div class="date" class:current-date={getCurrentDate() === date.details.dateString}>
        <div>{date.details.dayOfWeek.substring(0, 3)}</div>
        <div style="font-size: 1.5em">{date.details.day}</div>
      </div>
      {#each date.tasks as task, i}
        {#if i < 2 || i === 2 && date.tasks.length === 3 || showAllTasks}
          <CalendarTaskItem task={task} />
        {:else if i === 2}
          <button class="expand-task-list" on:click={() => showAllTasks = true}>Show {date.tasks.length - 2} more...</button>
        {/if}
      {/each}
    </div>
  {/each}
  <spacer style="width: 6px"></spacer>
</div>
<div class="contents">
  <div class="times-column">
    <div style="height: calc(4.167% - .5em);"></div>
    {#each ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 
            '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
    as time}
      <div style="height: 4.167%;">{time}</div>
    {/each}
  </div>
  <div class="line-overflow-column">
  </div>
  {#each dateWindow as date, i}
    <div class="day-column">
      <div class="event-wrapper" on:click|self={toggleModal}>
        {#each date.events as event}
          <CalendarEvent event={event.event} pos={i} date={date.details.dateString}
                         blockSqueeze={event.blockSqueeze} 
                         textSqueeze={event.textSqueeze} />
        {/each}
      </div>
    </div>
  {/each}
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <div class="add-event-modal">
    <label>
      <span>Event Name: </span>
      <input type="textbox" bind:value={addEventFields.title}>
    </label>
    <label>
      <span>Start Time: </span>
      <input type="textbox" bind:value={addEventFields.startTime}>
    </label>
    <label>
      <span>End Time: </span>
      <input type="textbox" bind:value={addEventFields.endTime}>
    </label>
    <label>
      <span>Description: </span>
      <input type="textbox" bind:value={addEventFields.description}>
    </label>
    <button on:click={addEvent}>Add Event</button>
  </div>
</Modal>

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
    padding-bottom: 2px;
    height: fit-content;
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
  .times-column {
    min-height: 12in;
    display: flex;
    flex-direction: column;
    align-items: end;
    padding: 0 5px;
    font-size: 0.75em;
    border-top: 1px grey solid;
  }
  .line-overflow-column {
    width: 20px;
    min-height: 12in;
    background-size: 100% 4.167%;
    background-image: linear-gradient(to bottom, grey 1px, transparent 1px);
  }
  .day-column {
    flex: 1;
    min-height: 12in;
    border-left: 1px solid grey;
    background-size: 100% 4.167%;
    background-image: linear-gradient(to bottom, grey 1px, transparent 1px);
  }
  .event-wrapper {
    height: 100%;
    width: 95%;
    position: relative;
  }
  .add-event-modal label {
    display: block;
    margin: 5px 0px;
  }
</style>