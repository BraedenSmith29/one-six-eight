<script>
  // Constants
  const ONE_MINUTE_PERCENT = 100 / (24 * 60) + "%";

  // Helper functions
  import { computeTimeDifference, computeMinutesSinceMidnight, changeTimeByMinutes } from "$lib/shared/dateHelper.js";

  // Stores
  import calendarStore from "$lib/stores/calendarStore.js";
  import eventStore from "$lib/stores/eventStore.js";
  
  // Properties
  export let event;
  export let date;
  export let blockSqueeze;
  export let textSqueeze;

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

  // ********************
  // ** Event Movement **
  // ********************
  let box = null;
  let resizeValues = null;

  function handleMouseHover(e, startHover) {
    if (resizeValues != null) return;

    if (startHover) {
      if (e.layerY <= 10 || e.layerY >= box.getBoundingClientRect().height - 10) {
        document.body.style.cursor = "ns-resize";
      } else {
        document.body.style.cursor = "pointer"; 
      }
    } else {
      document.body.style.cursor = null;
    }
  }

  function mouseDown(e) {
    const parent = box.parentElement;
    
    // Create a budle of important values for resizing the box later
    resizeValues = {
      initialDeltaY: e.pageY - parent.getBoundingClientRect().top,
      initialCursor: document.body.style.cursor,
      event: event,
      startTime: event.startTime,
      endTime: event.endTime,
      parent: parent
    }
		
    // Decide whether to resize from the top, bottom, or move
		if (e.layerY <= 10) {
      resizeValues.moveType = "top";
		} else if (e.layerY >= box.getBoundingClientRect().height - 10) {
      resizeValues.moveType = "bottom";
		} else {
			resizeValues.moveType = "move";
      document.body.style.cursor = "move";
		}

    // Bind the functions to handle movement
		window.addEventListener('mousemove', mouseMove)	
		window.addEventListener('mouseup', mouseUp)	
	}
	
	function mouseUp() {
    document.body.style.cursor = resizeValues.initialCursor;
    
		resizeValues = null;
		
    // Unbind the movement functions
		window.removeEventListener('mousemove', mouseMove)	
		window.removeEventListener('mouseup', mouseUp)	
	}

	function mouseMove(e) {
    // Calculate height of a minute and fifteen minutes in pixels and the width of the columns
    const PARENT_RECT = resizeValues.parent.getBoundingClientRect();
    const ONE_MINUTE_HEIGHT = PARENT_RECT.height / (24*60);
    const COLUMN_WIDTH = PARENT_RECT.width / 0.95 + 1;
    const FIFTEEN_MINUTES_HEIGHT = ONE_MINUTE_HEIGHT * 15;

    // Quantize the pixel and minute deltas to 15 minute increments
		let pixelDelta = Math.round(((e.pageY - PARENT_RECT.top) - resizeValues.initialDeltaY) / FIFTEEN_MINUTES_HEIGHT) * FIFTEEN_MINUTES_HEIGHT;
    let minuteDelta = pixelDelta / ONE_MINUTE_HEIGHT;

    // Count the difference in days based on X position and shift the minute delta by the amount of days
    let dayDelta = Math.floor((e.pageX - PARENT_RECT.left) / COLUMN_WIDTH);
    minuteDelta += dayDelta * 24*60;
    
		if (resizeValues.moveType == "move") {
      // Shift the start and end times in sync to "move" the event
      resizeValues.event.startTime = changeTimeByMinutes(resizeValues.startTime, minuteDelta);
      resizeValues.event.endTime = changeTimeByMinutes(resizeValues.endTime, minuteDelta);
		} else if (resizeValues.moveType == "top") {
      resizeValues.event.startTime = changeTimeByMinutes(resizeValues.startTime, minuteDelta);
		} else if (resizeValues.moveType == "bottom") {
      resizeValues.event.endTime = changeTimeByMinutes(resizeValues.endTime, minuteDelta);
		}

    // Push the event updates to the event store
    $eventStore = $eventStore;
	}
</script>

<div class="calendar-event" bind:this={box} on:mousedown={mouseDown} on:mousemove={e => handleMouseHover(e, true)} on:mouseleave={e => handleMouseHover(e, false)}
     style="top: calc({startTimeMinutes} * {ONE_MINUTE_PERCENT});
            height: calc({eventDuration} * {ONE_MINUTE_PERCENT});
            width: {blockSqueeze};
            background-color: {calendar.color};">
  <div class="details-container" style="width: {textSqueeze};">
    <div>{event.name}</div>
    <div>{event.startTime} - {event.endTime}</div>
  </div>
</div>

<style>
  .calendar-event {
    border: 1px solid azure;
    position: absolute;
    overflow: hidden;
    right: 0px;
    user-select: none;
    box-sizing: border-box;
  }
  .details-container {
    padding: 5px;
    position: static;
    font-size: .9em;
    box-sizing: border-box;
  }
</style>