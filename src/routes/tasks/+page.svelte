<script>
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";

  import TaskStore from "$lib/stores/taskStore.js";
  import ProjectStore from "$lib/stores/projectStore.js";

  let completeTasks = [];
  let incompleteTasks = [];
  let projects = [];

  TaskStore.subscribe(tasks => {
    completeTasks = tasks.filter(task => task.complete === true);
    incompleteTasks = tasks.filter(task => task.complete === false);
  });
  ProjectStore.subscribe(storedProjects => projects = storedProjects);

  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addTaskFields = {
      name: "",
      description: "",
      dueDate: "",
      projectId: 1,
      projectColor: projects.find(p => p.id === 1).color,
    };
    showModal = !showModal
  };

  let addTaskFields = {
    name: "",
    description: "",
    dueDate: "",
    projectId: 1,
    projectColor: projects.find(p => p.id === 1).color,
  }
  const addTask = () => {
    if (projects.find(p => p.id === addTaskFields.projectId) == null) {
      // If cannot find project with this id, add a new one
      ProjectStore.update(storedProjects => {
        let newProject = {
          id: addTaskFields.projectId,
          name: "Project " + addTaskFields.projectId,
          color: addTaskFields.projectColor,
        }
        return [...storedProjects, newProject];
      });
    } else {
      // If we do have this project, just update the color
      ProjectStore.update(storedProjects => {
        let project = storedProjects.find(p => p.id === addTaskFields.projectId);
        project.color = addTaskFields.projectColor;
        return storedProjects;
      });
    }
    // Add the task
    TaskStore.update(tasks => {
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

  const changeProject = () => {
    let selectedProject = projects.find(p => p.id === addTaskFields.projectId);
    addTaskFields.projectColor = selectedProject != null ? selectedProject.color : "#c6c6c6";
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
      <input type="number" bind:value={addTaskFields.projectId} on:change={changeProject}>
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
