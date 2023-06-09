<script>
  // Components
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";

  // Stores
  import taskStore from "$lib/stores/taskStore.js";
  import projectStore from "$lib/stores/projectStore.js";

  // Reactively define the subsets of tasks
  $: completeTasks = $taskStore.filter(task => task.complete === true);
  $: incompleteTasks = $taskStore.filter(task => task.complete === false);

  // Add functionality and form contents variable for modal
  let addTaskFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addTaskFields = {
      name: "",
      description: "",
      dueDate: "",
      projectId: 1,
      projectColor: $projectStore.find(p => p.id === 1).color,
    };
    showModal = !showModal
  };
  const modalChangeProjectColor = () => {
    let selectedProject = $projectStore.find(p => p.id === addTaskFields.projectId);
    addTaskFields.projectColor = selectedProject != null ? selectedProject.color : "#c6c6c6";
  }

  const addTask = () => {
    // This is pretty placeholder for project management
    if ($projectStore.find(p => p.id === addTaskFields.projectId) == null) {
      // If cannot find project with this id, add a new one
      projectStore.update(storedProjects => {
        let newProject = {
          id: addTaskFields.projectId,
          name: "Project " + addTaskFields.projectId,
          color: addTaskFields.projectColor,
          showInCalendarView: true
        }
        return [...storedProjects, newProject];
      });
    } else {
      // If we do have this project, just update the color
      projectStore.update(storedProjects => {
        let project = storedProjects.find(p => p.id === addTaskFields.projectId);
        project.color = addTaskFields.projectColor;
        return storedProjects;
      });
    }
    // Add the task
    taskStore.update(tasks => {
      let newTask = {
        // Get the next highest id
        id: Math.max(...tasks.map(o => o.id)) + 1,
        name: addTaskFields.name,
        description: addTaskFields.description,
        complete: false,
        dueDate: addTaskFields.dueDate,
        projectId: addTaskFields.projectId,
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
    <label>
      <span>Project Id: </span>
      <input type="number" bind:value={addTaskFields.projectId} on:change={modalChangeProjectColor}>
    </label>
    <label>
      <span>Project Color (optional): </span>
      <input type="color" bind:value={addTaskFields.projectColor}>
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
    margin: 10px auto;
  }
  .add-task-button {
    width: 20%;
  }
  .add-task-modal label {
    display: block;
    margin: 5px 0px;
  }
</style>
