<script>
  // Helper Functions
  import { getCurrentDate } from "$lib/shared/dateHelper.js";
  // Components
  import DateDropdown from "$lib/components/tasks/DateDropdown.svelte";
  import FilterDropdown from "$lib/components/tasks/FilterDropdown.svelte";

  let date = getCurrentDate();
</script>

<div class="content">
  <div class="list-header">
    <DateDropdown bind:dateValue={date} />
    <spacer style="flex-grow: 1" />
    <FilterDropdown />
    <button on:click={() => date = getCurrentDate()}>Today</button>
  </div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
    margin: 0px auto;
    color: #eeeeee;
  }
  .list-header {
    display: flex;
    align-items: center;
    gap: 10px;
    position: sticky;
    top: 0;
    padding: 30px 5px 8px;
    background-color: #1b1b1b;
    border-bottom: 1px solid #777777;
  }
  .list-header button {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    padding: 4px 7px;
    color: inherit;
    background-color: #272727;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    cursor: pointer;
  }
</style>