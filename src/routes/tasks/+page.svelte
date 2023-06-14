<script>
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  let tasks = [
    {
      taskId: 1,
      name: "Example Task",
      description: "lorem ipsum dolor sit amet",
      complete: false,
      dueDate: "2023-6-11",
      projectId: 1
    },
    {
      taskId: 2,
      name: "Example Task",
      description: "lorem ipsum dolor sit amet",
      complete: false,
      dueDate: "2023-6-11",
      projectId: 1
    },
  ];
</script>

<div class="content">
  {#each tasks as task}
    <TaskListItem task={task} />
  {/each}
</div>

<style>
  .content {
    width: 50%;
    margin: auto;
  }
</style>
