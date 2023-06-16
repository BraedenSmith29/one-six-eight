<script>
  import HabitListItem from "$lib/components/habits/HabitListItem.svelte";

  let habitList = [
    {
      id: 1,
      name: "Habit 1",
      color: "#c6c6c6",
      habitHistory: ["2023-06-15", "2023-06-14", "2023-06-12", "2023-06-10"],
    },
    {
      id: 2,
      name: "Habit 2",
      color: "#a0a0a0",
      habitHistory: ["2023-06-15", "2023-06-14", "2023-06-12", "2023-06-10"],
    },
  ]

</script>

<div class="content">
  {#each habitList as habit}
    <HabitListItem habit={habit} />  
  {/each}
  <button class="add-habit-button">Add Habit</button>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    margin: auto;
  }
  .add-habit-button {
    width: 20%;
  }
</style>