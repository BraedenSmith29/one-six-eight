<script>
  import { getLastSevenDays, convertDateFormat } from "$lib/shared/dateHelper.js";
  
  export let habit = {
    id: 1,
    name: "Habit 1",
    type: "boolean",
    color: "#c6c6c6",
  };
  
  let habitHistory = ["2023-06-15", "2023-06-14", "2023-06-12", "2023-06-10"];
  
  // By default, let history window be the last seven days and pre-load it with completion status based on habit history
  let historyWindow = getLastSevenDays().map(date => ({ date, completed: habitHistory.includes(date) }));
</script>

<div class="habit-list-item" style="background-color: {habit.color};">
  <h3>{habit.name}</h3>
  {#each historyWindow as day}
    <div>
      <div>{convertDateFormat(day.date)}</div>
      <input type="checkbox" bind:checked={day.completed}>
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
