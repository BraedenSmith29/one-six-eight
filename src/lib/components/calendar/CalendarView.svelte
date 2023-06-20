<script>
  // Helper functions
  import { getArrayOfDays, getCurrentDate, parseDateString } from "$lib/shared/dateHelper.js";

  let dayOffset = 2;

  $: dateWindow = getArrayOfDays(7, dayOffset).map(d => parseDateString(d));

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
      <div class="date" class:current-date={getCurrentDate() === date.dateString}>
        <div>{date.dayOfWeek.substring(0, 3)}</div>
        <div style="font-size: 1.5em">{date.day}</div>
      </div>
    </div>
  {/each}
</div>
<div class="contents">
  {#each dateWindow as date}
    <div class="day-column">
      <!-- <div style="background-color: black; height: calc(3 * 4.167%); width:95%; position: relative; top: calc(3 * 4.167%)"></div> -->
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
    padding-bottom: 20px;
  }
  .day-header {
    flex: 1;
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