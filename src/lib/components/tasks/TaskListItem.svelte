<script>
  export let task;
</script>

<div class="task-list-item">
  <label>
    <input class="task-completed" type="checkbox" bind:checked={task.complete}>
    <span class="task-name">{task.name}</span>
  </label>
  <p class="task-description">{task.description}</p>
  <p class="task-due">{task.dueDate}</p>
</div>

<style>
  .task-list-item {
    background-color: rgb(198, 198, 198);
    padding: 10px;
    margin-bottom: 10px;
  }
  .task-name {
    font-size: 1.25em;
    font-weight: bold;
  }
</style>
