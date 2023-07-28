<script>
  import DateDropdown from "$lib/components/tasks/DateDropdown.svelte";
</script>

<div class="content">
  <div style="position: relative;" class="list-header">
    <DateDropdown />
    <spacer style="flex-grow: 1" />
    <p>Filters</p>
    <button>Today</button>
  </div>
  <hr style="width: 100%"/>
</div>


<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    margin: 10px auto;
    color: #eeeeee;
  }
  .list-header {
    display: flex;
    align-items: center;
  }
</style>