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

<div class="task-list-item" style="background-color: {group.color}">
  <label>
    <input class="task-completed" type="checkbox" checked={task.complete} on:change={toggleCompletion}>
    <span class="task-title">{task.title}</span>
  </label>
  <p class="task-description">{task.description}</p>
  <p class="task-due">{task.dueDate}</p>
</div>

<style>
  .task-list-item {
    padding: 10px;
  }
  .task-title {
    font-size: 1.25em;
    font-weight: bold;
  }
</style>
