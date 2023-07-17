<script>
  // Helper functions
  import { getLastSevenDays, convertDateFormat } from "$lib/shared/dateHelper.js";
  
  // Stores
  import habitStore from "$lib/stores/habitStore.js";
  
  // Properties
  export let habit;
  
  // Reactively define historyWindow as an array of objects with the date and completion status for that date
  $: historyWindow = getLastSevenDays().map(date => ({ date, completed: habit.history.includes(date) }));

  const updateHistory = (day) => {
    // Logic is sorta backwards
    if (!day.completed) {
      // If the day currently IS NOT completed, then it needs to be ADDED to the list
      habit.history = [...habit.history, day.date];
    } else {
      // If the day currently IS completed, then it needs to be REMOVED from the list
      habit.history = habit.history.filter(d => d !== day.date);
    }
    // Push the update to the store
    $habitStore = $habitStore;
  };
</script>

<div class="habit-list-item" style="background-color: {habit.color};">
  <h3>{habit.title}</h3>
  {#each historyWindow as day}
    <div>
      <div>{convertDateFormat(day.date)}</div>
      <input type="checkbox" checked={day.completed} on:change={() => updateHistory(day)}>
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
