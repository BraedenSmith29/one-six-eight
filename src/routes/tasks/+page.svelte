<script>
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";

  import TaskStore from "$lib/stores/taskStore.js";

  let completeTasks = [];
  let incompleteTasks = [];

  TaskStore.subscribe(tasks => {
    completeTasks = tasks.filter(task => task.complete === true);
    incompleteTasks = tasks.filter(task => task.complete === false);
  });

  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addTaskFields = {
      name: "",
      description: "",
      dueDate: "",
    };
    showModal = !showModal
  };

  let addTaskFields = {
    name: "",
    description: "",
    dueDate: "",
  }
  const addTask = () => {
    // Add the task
    TaskStore.update(tasks => {
      let newTask = {
        // Get the next highest id
        id: Math.max(...tasks.map(o => o.id)) + 1,
        name: addTaskFields.name,
        description: addTaskFields.description,
        complete: false,
        dueDate: addTaskFields.dueDate,
        projectId: 1
      };
      tasks = [...tasks, newTask];
      return tasks;
    });
    toggleModal();
  }
</script>

<div class="content">
  {#each incompleteTasks as task}
    <TaskListItem task={task} />
  {/each}
  <button class="add-task-button" on:click={toggleModal}>Add Task</button>
  {#each completeTasks as task}
    <TaskListItem task={task} />
  {/each}
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <div class="add-task-modal">
    <label>
      <span>Task Name: </span>
      <input type="textbox" bind:value={addTaskFields.name}>
    </label>
    <label>
      <span>Description: </span>
      <input type="textbox" bind:value={addTaskFields.description}>
    </label>
    <label>
      <span>Due Date: </span>
      <input type="date" bind:value={addTaskFields.dueDate}>
    </label>
    <button on:click={addTask}>Add Task</button>
  </div>
</Modal>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    margin: auto;
  }
  .add-task-button {
    width: 20%;
  }
  .add-task-modal label {
    display: block;
    margin: 5px 0px;
  }
</style>
