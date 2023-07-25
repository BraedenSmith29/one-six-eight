<script>
  // Constants
  const TODAY = -3;
  const UPCOMING = -2;
  const HISTORY = -1;
  const INBOX = 0;
  // Components
  import Sidebar from "./Sidebar.svelte";
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import taskStore from "$lib/stores/taskStore.js";
  import groupStore from "$lib/stores/groupStore.js";
  import taskPageStore from "$lib/stores/taskPageStore.js";

  // Reactively define the subsets of tasks
  $: completeTasks = $taskStore.filter(task => task.complete === true);
  $: incompleteTasks = $taskStore.filter(task => task.complete === false);

  // Add functionality and form contents variable for modal
  let addTaskFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addError = null;
    addTaskFields = {
      title: "",
      description: "",
      dueDate: "",
      groupId: $groupStore[0].id,
    };
    showModal = !showModal
  };

  let loading = false;
  let addError = null;
  const addTask = async () => {
    if (loading) return;
    loading = true;

    const { data, error } = await $page.data.supabase
      .from("tasks")
      .insert({
        title: addTaskFields.title,
        description: addTaskFields.description,
        due_time: addTaskFields.dueDate === "" ? null : addTaskFields.dueDate,
        group_id: addTaskFields.groupId,
      })
      .select().single();
    
    addError = error?.message;
    if (!error) {
      // Add the task
      taskStore.update(tasks => {
        let newTask = {
          id: data.id,
          title: addTaskFields.title,
          description: addTaskFields.description,
          complete: false,
          dueDate: addTaskFields.dueDate,
          groupId: addTaskFields.groupId,
        };
        return [...tasks, newTask];
      });
      toggleModal();
    }

    loading = false;
  }
</script>

<svelte:head><title>Tasks: One Six Eight</title></svelte:head>
<div class="task-view-wrapper">
  <Sidebar />
  <div class="task-view">
    {#if $taskPageStore.selectedView === UPCOMING}
      <div class="content">
        {#each incompleteTasks as task}
          <TaskListItem task={task} />
        {/each}
        <button class="add-task-button" on:click={toggleModal}>Add Task</button>
        {#each completeTasks as task}
          <TaskListItem task={task} />
        {/each}
      </div>
    {/if}
  </div>
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <form class="add-task-modal" on:submit={addTask}>
    <label>
      <span>Task Name: </span>
      <input type="textbox" bind:value={addTaskFields.title}>
    </label>
    <label>
      <span>Description: </span>
      <input type="textbox" bind:value={addTaskFields.description}>
    </label>
    <label>
      <span>Due Date: </span>
      <input type="date" bind:value={addTaskFields.dueDate}>
    </label>
    <label>
      <span>Group: </span>
      <select type="number" bind:value={addTaskFields.groupId}>
        {#each $groupStore as group}
          <option value={group.id}>{group.title}</option>
        {/each}
      </select>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Add Task</button>
    {/if}
    {#if addError}
      <p class="error-text">{addError}</p>
    {/if}
  </form>
</Modal>

<style>
  .task-view-wrapper {
    display: flex;
    height: calc(100vh - 72px);
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    margin: 10px auto;
  }
  .task-view {
    flex: 1;
  }
  .add-task-button {
    width: 20%;
  }
  .add-task-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>
