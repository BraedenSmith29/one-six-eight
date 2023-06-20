<script>
  // Stores
  import habitStore from "$lib/stores/habitStore.js";

  // Properties
  export let habit;
  export let date;

  $: complete = habit.habitHistory.includes(date);

  const toggleCompletion = () => {
    // Add/remove the habit from the list
    if (!complete) {
      // If the day currently IS NOT completed, then it needs to be ADDED to the list
      habit.habitHistory = [...habit.habitHistory, date];
    } else {
      // If the day currently IS completed, then it needs to be REMOVED from the list
      habit.habitHistory = habit.habitHistory.filter(d => d !== date);
    }
    // Push the update to the store
    $habitStore = $habitStore;
  }
</script>

<div class="calendar-habit-item" style="background-color: {habit.color};">
  <label>
    <input type="checkbox" checked={complete} on:change={toggleCompletion}>
    <span>{habit.name}</span>
  </label>
</div>

<style>
  .calendar-habit-item {
    padding: 1px;
  }
</style>