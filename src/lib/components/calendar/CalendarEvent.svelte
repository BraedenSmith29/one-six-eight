<script>
  // Constants
  const oneMinuteHeight = 100 / (24 * 60) + "%";

  // Helper functions
  import { computeTimeDifference, computeMinutesSinceMidnight } from "$lib/shared/dateHelper.js";

  // Stores
  import eventStore from "$lib/stores/eventStore.js";
  import calendarStore from "$lib/stores/calendarStore.js";
  
  // Properties
  export let eventId;

  $: event = $eventStore.find(e => e.id === eventId);
  $: startTimeMinutes = computeMinutesSinceMidnight(event.startTime);
  $: eventDuration = computeTimeDifference(event.startTime, event.endTime);

  $: calendar = $calendarStore.find(c => c.id === event.calendarId);
</script>

<div class="calendar-event" style="top: calc({startTimeMinutes} * {oneMinuteHeight});
                                   height: calc({eventDuration} * {oneMinuteHeight}); 
                                   background-color: {calendar.color};">
  <div class="details-container">
    <div>{event.name}</div>
    <div>{event.startTime} - {event.endTime}</div>
  </div>
</div>

<style>
  .calendar-event {
    width: 95%;
    position: relative;
  }
  .details-container {
    padding: 5px;
    position: static;
  }
</style>