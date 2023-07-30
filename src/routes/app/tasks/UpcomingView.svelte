<script>
  // Helper Functions
  import { getCurrentDate } from "$lib/shared/dateHelper.js";
  // Components
  import DateDropdown from "$lib/components/tasks/DateDropdown.svelte";
  import Icon from "$lib/components/shared/Icon.svelte";

  let date = getCurrentDate();
</script>

<div class="content">
  <div style="position: relative" class="list-header">
    <DateDropdown bind:dateValue={date} />
    <spacer style="flex-grow: 1" />
    <button style="padding-left: 4px"><Icon name="down-arrow" color="#eeeeee" height="0.9rem" width="0.9rem"/>Filters</button>
    <button on:click={() => date = getCurrentDate()}>Today</button>
  </div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    margin: 0px auto;
    color: #eeeeee;
  }
  .list-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0px 5px 8px;
    border-bottom: 2px solid #eeeeee;
    margin-bottom: 8px;
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