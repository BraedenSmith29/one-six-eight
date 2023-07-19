<script>
  // Stores
  import { page } from "$app/stores";
  import taskStore from "$lib/stores/taskStore.js";
  import groupStore from "$lib/stores/groupStore.js";

  // Properties
  export let task;

  $: group = $groupStore.find(p => p.id === task.groupId);

  let toggleCompletionLoading = false;
  const toggleCompletion = async () => {
    if (toggleCompletionLoading) return;
    toggleCompletionLoading = true;

    // Toggle the state of the checkbox
    task.complete = !task.complete;
    // Push the update to the store
    $taskStore = $taskStore;

    const { error } = await $page.data.supabase
      .from("tasks")
      .update({
        complete: task.complete
      })
      .eq('id', task.id);
    
    if (error) {
      console.log("There was an error changing completion status for task " + task.id + ": " + error);
      task.complete = !task.complete;
    }
    
    toggleCompletionLoading = false;
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