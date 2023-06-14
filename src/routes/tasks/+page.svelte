<script>
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import TaskStore from "$lib/stores/taskStore.js";
</script>

<div class="content">
  {#each $TaskStore as task}
    <TaskListItem task={task} />
  {/each}
</div>

<style>
  .content {
    width: 50%;
    margin: auto;
  }
</style>
