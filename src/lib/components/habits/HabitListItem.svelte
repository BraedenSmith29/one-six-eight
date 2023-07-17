<script>
  // Helper functions
  import { getLastSevenDays, convertDateFormat } from "$lib/shared/dateHelper.js";
  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import habitStore from "$lib/stores/habitStore.js";
  // Properties
  export let habit;

  let confirmDelete;
  
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

  let editHabitFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    editHabitFields = {
      title: habit.title,
      color: habit.color,
    };
    showModal = !showModal
  };

  let loading = false;
  let editError = null;
  const editHabit = async () => {
    if (loading) return;
    loading = true;

    const { error } = await $page.data.supabase
      .from("habits")
      .update({
        title: editHabitFields.title,
        color: editHabitFields.color.substring(1),
      })
      .eq('id', habit.id);

    editError = error;
    if (!error) {
      habit.title = editHabitFields.title;
      habit.color = editHabitFields.color;
      // Push the update to the store
      $habitStore = $habitStore;
      toggleModal();
    }
    
    loading = false;
  };
  const deleteHabit = async () => {
    if (loading) return;
    loading = true;

    const { error } = await $page.data.supabase
      .from("habits")
      .delete()
      .eq('id', habit.id);

    editError = error;
    if (!error) {
      habitStore.update(habits => {
        return habits.filter(h => h.id !== habit.id);
      });
      toggleModal();
    }
    
    loading = false;
  };
</script>

<div class="habit-list-item" style="background-color: {habit.color};">
  <div>
    <h3>{habit.title}</h3>
    <button on:click={toggleModal}>Edit</button>
  </div>
  {#each historyWindow as day}
    <div>
      <div>{convertDateFormat(day.date)}</div>
      <input type="checkbox" checked={day.completed} on:change={() => updateHistory(day)}>
    </div>
  {/each}
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <h2>Edit Habit</h2>
  <form class="edit-habit-modal" on:submit|preventDefault={editHabit}>
    <label>
      <span>Habit Name: </span>
      <input type="textbox" bind:value={editHabitFields.title}>
    </label>
    <label>
      <span>Habit Color: </span>
      <input type="color" bind:value={editHabitFields.color}>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Save</button>
      <div style="margin: 5px;">
        {#if !confirmDelete}
          <button on:click|preventDefault={() => confirmDelete = true}>Delete Habit</button>
        {:else}
          <p>Are you sure you want to delete this habit?</p>
          <button on:click|preventDefault={() => confirmDelete = false}>No</button>
          <button on:click|preventDefault={deleteHabit}>Yes</button>
        {/if}
      </div>
    {/if}
    {#if editError}
      <p class="error-text">{editError}</p>
    {/if}
  </form>
</Modal>

<style>
  .habit-list-item {
    padding: 10px;
    background-color: #c6c6c6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .edit-habit-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>
