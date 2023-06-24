<script>
  // Constants
  const oneMinuteHeight = 100 / (24 * 60) + "%";

  // Helper functions
  import { computeTimeDifference, computeMinutesSinceMidnight } from "$lib/shared/dateHelper.js";

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

  // DANGER ZONE
  let box = null;
  let resizeInitial = null;
  function hover(e) {
    if (resizeInitial != null) return;

    if (e.layerY <= 10 || e.layerY >= box.getBoundingClientRect().height - 10) {
      document.body.style.cursor = "ns-resize";
		} else {
      document.body.style.cursor = "pointer"; 
		}
  }

  function resetCursor(e) {
    if (resizeInitial != null) return;

    document.body.style.cursor = null;
  }

  function mouseDown(e) {
		const rect = box.getBoundingClientRect();
		const parent = box.parentElement.getBoundingClientRect();
		
    resizeInitial = {
      height: rect.height,
      width: parent.width / 0.95,
			top: rect.top - parent.top,
		  y: e.pageY,
      rootX: rect.left,
      oneMinuteHeight: parent.height / (24*60)
    }
		
    console.log(parent.width);

		if (e.layerY <= 10) {
      resizeInitial.moveType = "top";
		} else if (e.layerY >= resizeInitial.height - 10) {
      resizeInitial.moveType = "bottom";
		} else {
			resizeInitial.moveType = "move";
      document.body.style.cursor = "move";
		}

		window.addEventListener('mousemove', mouseMove)	
		window.addEventListener('mouseup', mouseUp)	
	}
	
	function mouseUp() {
		resizeInitial = null;
    
    document.body.style.cursor = null;
		
		window.removeEventListener('mousemove', mouseMove)	
		window.removeEventListener('mouseup', mouseUp)	
	}

  function changeTimeByMinutes(timeString, minutes) {
    const date = new Date(timeString);
    date.setMinutes(date.getMinutes() + minutes);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const updatedMinutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${updatedMinutes}`;
  }
	
	function mouseMove(e) {
    // Quantize the pixel and minute deltas to 15 minute increments
    let pixelsPerFifteenMinutes = resizeInitial.oneMinuteHeight * 15;
		let pixelDelta = Math.round((e.pageY - resizeInitial.y) / pixelsPerFifteenMinutes) * pixelsPerFifteenMinutes;
    let minuteDelta = pixelDelta / resizeInitial.oneMinuteHeight;

    console.log(Math.floor((e.pageX - resizeInitial.rootX) / resizeInitial.width));
    minuteDelta += 24*60 * Math.floor((e.pageX - resizeInitial.rootX) / resizeInitial.width);
    resizeInitial.rootX += Math.floor((e.pageX - resizeInitial.rootX) / resizeInitial.width) * resizeInitial.width;

    if (minuteDelta === 0) return;

    // Update the y position anchor to avoid multiple updates within the same "rounding chunk"
    resizeInitial.y = resizeInitial.y + pixelDelta;

		if (resizeInitial.moveType == "move") {
      // Shift the start and end times in sync to "move" the event
      event.startTime = changeTimeByMinutes(event.startTime, minuteDelta);
      event.endTime = changeTimeByMinutes(event.endTime, minuteDelta);
		} else if (resizeInitial.moveType == "top") {
      event.startTime = changeTimeByMinutes(event.startTime, minuteDelta);
		} else if (resizeInitial.moveType == "bottom") {
      event.endTime = changeTimeByMinutes(event.endTime, minuteDelta);
		}

    // Push the event updates to the event store
    $eventStore = $eventStore;
	}
</script>

<div class="calendar-event" bind:this={box} on:mousedown={mouseDown} on:mousemove={hover} on:mouseleave={resetCursor}
     style="top: calc({startTimeMinutes} * {oneMinuteHeight});
     height: calc({eventDuration} * {oneMinuteHeight});
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
  }
</style>