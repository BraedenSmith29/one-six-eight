<script>
  let task = {
    name: "Example Task",
    description: "lorem ipsum dolor sit amet",
    complete: false,
    dueDate: "2023-6-11",
    projectId: 1
  }
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
    background-color: azure;
    padding: 10px;
  }
  .task-name {
    font-size: 1.25em;
    font-weight: bold;
  }
</style>
