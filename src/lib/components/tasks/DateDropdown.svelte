<script>
  // Constants
  const monthAbbrAry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Helper functions
  import { getCurrentDate } from "$lib/shared/dateHelper.js";
  // Properties
  export let dateValue = getCurrentDate(); // Format YYYY-MM-DD

  let showDropdown = false;
  let displayMonthDate = new Date(+dateValue.substring(0, 4), +dateValue.substring(5, 7) - 1);
  $: displayYear = displayMonthDate.getFullYear();
  $: displayMonth = displayMonthDate.getMonth();

  let calAry;
  $: {
    calAry = [];

    // Calculate the number of days in the current month
    const numDays = (new Date(displayYear, displayMonth + 1, 0)).getDate();
    // Calculate the day of the week for the first day of the month
    const firstDayOfWeek = (new Date(displayYear, displayMonth, 1)).getDay();

    // Add the empty cells before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calAry.push({
        dateString: null,
        displayNum: ""
      });
    }
    // Add the days of the month to the calendar
    const prefix = displayYear + "-" + String(displayMonth + 1).padStart(2, "0") + "-";
    for (let day = 1; day <= numDays; day++) {
      calAry.push({
        dateString: prefix + String(day).padStart(2, "0"),
        displayNum: day.toString()
      });
    }
  }

  function changeMonth(diff) {
    // Calculate the target date
    const targetMonth = displayMonth + diff;
    const targetYear = displayYear + Math.floor(targetMonth / 12);
    const targetMonthRemainder = targetMonth % 12;

    displayMonthDate = new Date(targetYear, targetMonthRemainder);
  }

  function changeDate(newDate) {
    dateValue = newDate;
    displayMonthDate = new Date(+dateValue.substring(0, 4), +dateValue.substring(5, 7) - 1);
    closePopout();
  }

  function openPopout() {
    window.addEventListener("mousedown", closePopout);
    showDropdown = true;
  }
  function closePopout() {
    window.removeEventListener("mousedown", closePopout);
    showDropdown = false;
  }
</script>

<div class="date-dropdown" on:mousedown|stopPropagation>
  <button class="dropdown-button" on:click={() => showDropdown ? closePopout() : openPopout()}>June 2023 v</button>
  {#if showDropdown}
    <div class="dropdown">
      <div class="calendar-header">
        <div class="calendar-label">{monthAbbrAry[displayMonth]} {displayYear}</div>
        <spacer style="flex-grow: 1" />
        <button on:click={() => changeMonth(-1)}>&lt</button>
        <button on:click={() => changeMonth(1)}>&gt</button>
      </div>
      <hr />
      <div class="calendar">
        {#each ["S", "M", "T", "W", "T", "F", "S"] as day}
          <div class="day">{day}</div>
        {/each}
        {#each calAry as day}
          <div class="day" class:today={day.dateString === dateValue} on:click={() => changeDate(day.dateString)}>{day.displayNum}</div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .date-dropdown {
    position: relative;
    user-select: none;
  }
  .dropdown-button {
    font-size: 1.5em;
    font-weight: bold;
    color: inherit;
    background-color: inherit;
    border: none;
  }
  .dropdown {
    position: absolute;
    background-color: #2e2e2e;
    border-radius: 10px;
    top: calc(100% + 8px);
    padding: 15px;
  }
  .calendar-header {
    display: flex;
    align-items: center;
    padding: 3px;
  }
  .calendar-label {
    font-size: 1.1em;
    font-weight: bold;
  }
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
  }
  .day {
    font-size: 0.9em;
    margin: 3px 6px;
    text-align: center;
    cursor: pointer;
  }
  .today {
    font-weight: bold;
    color: #5bb9d5;
    border-radius: 12px;
  }
</style>