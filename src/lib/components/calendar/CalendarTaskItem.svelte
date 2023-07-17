<script>
  // Stores
  import taskStore from "$lib/stores/taskStore.js";
  import groupStore from "$lib/stores/groupStore.js";

  // Properties
  export let task;

  $: group = $groupStore.find(p => p.id === task.groupId);

  const toggleCompletion = () => {
    // Toggle the state of the checkbox
    task.complete = !task.complete;
    // Push the update to the store
    $taskStore = $taskStore;
  }
</script>

<div class="calendar-task-item" style="background-color: {group.color};">
  <label>
    <input type="checkbox" checked={task.complete} on:change={toggleCompletion}>
    <span>{task.title}</span>
  </label>
</div>

<style>
  .calendar-task-item {
    padding: 1px;
    margin-left: 1px;
  }
</style>