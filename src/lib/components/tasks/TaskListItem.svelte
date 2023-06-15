<script>
  import TaskStore from "$lib/stores/taskStore.js";
  import ProjectStore from "$lib/stores/projectStore.js";

  export let task;

  let project;
  ProjectStore.subscribe(projects => {
    project = projects.find(p => p.id === task.projectId);
  });

  const toggleCompletion = () => {
    // Toggle the state of the checkbox
    task.complete = !task.complete;
    // Update the store with the new state
    TaskStore.update(tasks => {
      // Find the current task in the array and update it, then return the new array
      let changedTask = tasks.find(t => t.id === task.id);
      changedTask.complete = task.complete;
      return tasks;
    });
  }
</script>

<div class="task-list-item" style="background-color: {project.color}">
  <label>
    <input class="task-completed" type="checkbox" bind:checked={task.complete} on:click={toggleCompletion}>
    <span class="task-name">{task.name}</span>
  </label>
  <p class="task-description">{task.description}</p>
  <p class="task-due">{task.dueDate}</p>
</div>

<style>
  .task-list-item {
    padding: 10px;
  }
  .task-name {
    font-size: 1.25em;
    font-weight: bold;
  }
</style>
