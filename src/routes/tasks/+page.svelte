<script>
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import TaskStore from "$lib/stores/taskStore.js";

  let completeTasks = [];
  let incompleteTasks = [];

  TaskStore.subscribe(tasks => {
    completeTasks = tasks.filter(task => task.complete === true);
    incompleteTasks = tasks.filter(task => task.complete === false);
  });
</script>

<div class="content">
  {#each incompleteTasks as task}
    <TaskListItem task={task} />
  {/each}
  {#each completeTasks as task}
    <TaskListItem task={task} />
  {/each}
</div>

<style>
  .content {
    width: 50%;
    margin: auto;
  }
</style>
