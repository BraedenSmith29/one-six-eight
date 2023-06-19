<script>
  // Components
  import HabitListItem from "$lib/components/habits/HabitListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";

  // Stores
  import habitStore from "$lib/stores/habitStore.js";

  // Add functionality and form contents variable for modal
  let addHabitFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addHabitFields = {
      name: "",
      color: "#c6c6c6",
    };
    showModal = !showModal
  };

  const addHabit = () => {
    habitStore.update(habits => {
      let newHabit = {
        id: Math.max(...habits.map(h => h.id)) + 1,
        name: addHabitFields.name,
        color: addHabitFields.color,
        habitHistory: [],
      }
      habits = [...habits, newHabit];
      return habits;
    });
    toggleModal();
  };
</script>

<div class="content">
  {#each $habitStore as habit}
    <HabitListItem habit={habit} />  
  {/each}
  <button class="add-habit-button" on:click={toggleModal}>Add Habit</button>
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <div class="add-habit-modal">
    <label>
      <span>Habit Name: </span>
      <input type="textbox" bind:value={addHabitFields.name}>
    </label>
    <label>
      <span>Habit Color: </span>
      <input type="color" bind:value={addHabitFields.color}>
    </label>
    <button on:click={addHabit}>Add Habit</button>
  </div>
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