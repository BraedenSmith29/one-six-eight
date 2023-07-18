<script>
  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import taskStore from "$lib/stores/taskStore.js";
  import groupStore from "$lib/stores/groupStore.js";
  // Properties
  export let task;

  let confirmDelete = false;

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

  let editTaskFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    editError = null;
    editTaskFields = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      groupId: task.groupId
    };
    showModal = !showModal
  };

  let loading = false;
  let editError = null;
  const editTask = async () => {
    if (loading) return;
    loading = true;

    const { error } = await $page.data.supabase
      .from("tasks")
      .update({
        title: editTaskFields.title,
        description: editTaskFields.description,
        due_time: editTaskFields.dueDate === "" ? null : editTaskFields.dueDate,
        group_id: editTaskFields.groupId,
      })
      .eq('id', task.id);

    editError = error?.message;
    if (!error) {
      task.title = editTaskFields.title;
      task.description = editTaskFields.description;
      task.dueDate = editTaskFields.dueDate;
      task.groupId = editTaskFields.groupId;
      // Push the update to the store
      $taskStore = $taskStore;
      toggleModal();
    }
    
    loading = false;
  };
  const deleteTask = async () => {
    if (loading) return;
    loading = true;

    const { error } = await $page.data.supabase
      .from("tasks")
      .delete()
      .eq('id', task.id);

    editError = error?.message;
    if (!error) {
      taskStore.update(tasks => {
        return tasks.filter(t => t.id !== task.id);
      });
      toggleModal();
    }
    
    loading = false;
  };
</script>

<div class="task-list-item" style="background-color: {group.color}">
  <button style="float: right" on:click={toggleModal}>Edit</button>
  <label>
    <input class="task-completed" type="checkbox" checked={task.complete} on:change={toggleCompletion}>
    <span class="task-title">{task.title}</span>
  </label>
  <p class="task-description">{task.description}</p>
  <p class="task-due">{task.dueDate}</p>
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <h2>Edit Task</h2>
  <form class="edit-task-modal" on:submit|preventDefault={editTask}>
    <label>
      <span>Task Name: </span>
      <input type="textbox" bind:value={editTaskFields.title}>
    </label>
    <label>
      <span>Description: </span>
      <input type="textbox" bind:value={editTaskFields.description}>
    </label>
    <label>
      <span>Due Date: </span>
      <input type="date" bind:value={editTaskFields.dueDate}>
    </label>
    <label>
      <span>Group: </span>
      <select type="number" bind:value={editTaskFields.groupId}>
        {#each $groupStore as group}
          <option value={group.id}>{group.title}</option>
        {/each}
      </select>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Save</button>
      <div style="margin: 5px;">
        {#if !confirmDelete}
          <button on:click|preventDefault={() => confirmDelete = true}>Delete Task</button>
        {:else}
          <p>Are you sure you want to delete this task?</p>
          <button on:click|preventDefault={() => confirmDelete = false}>No</button>
          <button on:click|preventDefault={deleteTask}>Yes</button>
        {/if}
      </div>
    {/if}
    {#if editError}
      <p class="error-text">{editError}</p>
    {/if}
  </form>
</Modal>

<style>
  .task-list-item {
    padding: 10px;
  }
  .task-title {
    font-size: 1.25em;
    font-weight: bold;
  }
  .edit-task-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>
