<script>
  // Components
  import HabitListItem from "$lib/components/habits/HabitListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import habitStore from "$lib/stores/habitStore.js";

  // Add functionality and form contents variable for modal
  let addHabitFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addHabitError = null;
    addHabitFields = {
      name: "",
      color: "#c6c6c6",
    };
    showModal = !showModal
  };

  let loading = false;
  let addHabitError = null;
  const addHabit = async () => {
    if (loading) return;
    loading = true;

    const { data, error } = await $page.data.supabase
      .from("habits")
      .insert({
        title: addHabitFields.title,
        color: addHabitFields.color.substring(1),
      })
      .select().single();

    addHabitError = error?.message;
    if (!error) {
      habitStore.update(habits => {
        let newHabit = {
          id: data.id,
          title: addHabitFields.title,
          color: addHabitFields.color,
          history: [],
        }
        return [...habits, newHabit];
      });
      toggleModal();
    }

    loading = false;
  };
</script>

<svelte:head><title>Habits: One Six Eight</title></svelte:head>
<div class="content">
  {#each $habitStore as habit}
    <HabitListItem habit={habit} />  
  {/each}
  <button class="add-habit-button" on:click={toggleModal}>Add Habit</button>
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <form class="add-habit-modal" on:submit|preventDefault={addHabit}>
    <h2>Add Habit</h2>
    <label>
      <span>Habit Name: </span>
      <input type="textbox" bind:value={addHabitFields.title}>
    </label>
    <label>
      <span>Habit Color: </span>
      <input type="color" bind:value={addHabitFields.color}>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Add Habit</button>
    {/if}
    {#if addHabitError}
      <p class="error-text">{addHabitError}</p>
    {/if}
  </form>
</Modal>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    margin: 10px auto;
  }
  .add-habit-button {
    width: 20%;
  }
  .add-habit-button {
    width: 20%;
  }
  .add-habit-modal label {
    display: block;
    margin: 5px 0px;
  }
</style>