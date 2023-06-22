<script>
  // Constants
  const oneMinuteHeight = 100 / (24 * 60) + "%";

  // Helper functions
  import { computeTimeDifference, computeMinutesSinceMidnight } from "$lib/shared/dateHelper.js";

  // Stores
  import calendarStore from "$lib/stores/calendarStore.js";
  
  // Properties
  export let event;
  export let date;

  let startTimeMinutes;
  let eventDuration;
  $: {
    startTimeMinutes = computeMinutesSinceMidnight(event.startTime, date);
    eventDuration = computeTimeDifference(event.startTime, event.endTime);
    if (startTimeMinutes < 0) {
      eventDuration = startTimeMinutes + eventDuration;
      startTimeMinutes = 0;
    }
    if (startTimeMinutes + eventDuration > 24*60) {
      eventDuration = 24*60 - startTimeMinutes;
    }
  }

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
    border: 1px solid azure;
    position: absolute;
    width: 100%;
    right: 0px;
  }
  .details-container {
    padding: 5px;
    position: static;
  }
</style>