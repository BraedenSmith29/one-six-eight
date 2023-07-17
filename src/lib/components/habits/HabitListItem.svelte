<script>
  // Helper functions
  import { getLastSevenDays, convertDateFormat } from "$lib/shared/dateHelper.js";
  // Stores
  import { page } from "$app/stores";
  import habitStore from "$lib/stores/habitStore.js";
  // Properties
  export let habit;
  
  // Reactively define historyWindow as an array of objects with the date and completion status for that date
  $: historyWindow = getLastSevenDays().map(date => ({ date, completed: habit.history.includes(date) }));

  let habitHistoryLoading = []; // Array of dates that are loading
  const updateHistory = async (day) => {
    if (habitHistoryLoading.includes(day.date)) return;
    habitHistoryLoading = [...habitHistoryLoading, day.date];

    // Logic is sorta backwards
    if (!day.completed) {
      // If the day currently IS NOT completed, then it needs to be ADDED to the list
      const { error } = await $page.data.supabase
        .from("habit_history")
        .insert({
          habit_id: habit.id,
          entry_date: day.date,
        });
      if (!error) {
        habit.history = [...habit.history, day.date];
      } else {
        console.log("There was an error completing " + day.date + ": " + error);
      }
    } else {
      // If the day currently IS completed, then it needs to be REMOVED from the list
      const { error } = await $page.data.supabase
        .from("habit_history")
        .delete()
        .match({ habit_id: habit.id, entry_date: day.date });
      if (!error) {
        habit.history = habit.history.filter(d => d !== day.date);
      } else {
        console.log("There was an error uncompleting " + day.date + ": " + error);
      }
    }
    // Push the update to the store
    $habitStore = $habitStore;

    habitHistoryLoading.filter(d => d !== day.date);
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
