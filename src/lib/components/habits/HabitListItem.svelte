<script>
  import { getLastSevenDays, convertDateFormat } from "$lib/shared/dateHelper.js";
  
  let historyWindow = getLastSevenDays();
  
  let habit = {
    id: 1,
    name: "Habit 1",
    type: "boolean",
    color: "#c6c6c6",
  };
  let habitHistory = ["2023-6-15", "2023-6-14", "2023-6-12", "2023-6-10"];
</script>

<div class="habit-list-item" style="background-color: {habit.color};">
  <h3>{habit.name}</h3>
  {#each historyWindow as day}
    <div>
      <div>{convertDateFormat(day)}</div>
      <input type="checkbox">
    </div>
  {/each}
</div>

<style>
  .habit-list-item {
    padding: 10px;
    background-color: #c6c6c6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
