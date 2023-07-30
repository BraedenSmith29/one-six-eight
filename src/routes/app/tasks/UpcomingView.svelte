<script>
  // Helper Functions
  import { getCurrentDate } from "$lib/shared/dateHelper.js";
  // Components
  import DateDropdown from "$lib/components/tasks/DateDropdown.svelte";

  let date = getCurrentDate();
</script>

<div class="content">
  <div style="position: relative" class="list-header">
    <DateDropdown bind:dateValue={date} />
    <spacer style="flex-grow: 1" />
    <div>Filters</div>
    <button on:click={() => date = getCurrentDate()}>Today</button>
  </div>
  <hr style="width: 100%"/>
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
  }
</style>