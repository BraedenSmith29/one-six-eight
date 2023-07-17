<script>
  // Components
  import TaskListItem from "$lib/components/tasks/TaskListItem.svelte";
  import Modal from "$lib/components/shared/Modal.svelte";

  // Stores
  import taskStore from "$lib/stores/taskStore.js";
  import groupStore from "$lib/stores/groupStore.js";

  // Reactively define the subsets of tasks
  $: completeTasks = $taskStore.filter(task => task.complete === true);
  $: incompleteTasks = $taskStore.filter(task => task.complete === false);

  // Add functionality and form contents variable for modal
  let addTaskFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    addTaskFields = {
      title: "",
      description: "",
      dueDate: "",
      groupId: 1,
      groupColor: $groupStore.find(p => p.id === 1).color,
    };
    showModal = !showModal
  };
  const modalChangeGroupColor = () => {
    let selectedGroup = $groupStore.find(p => p.id === addTaskFields.groupId);
    addTaskFields.groupColor = selectedGroup != null ? selectedGroup.color : "#c6c6c6";
  }

  const addTask = () => {
    // This is pretty placeholder for group management
    if ($groupStore.find(p => p.id === addTaskFields.groupId) == null) {
      // If cannot find group with this id, add a new one
      groupStore.update(storedGroups => {
        let newGroup = {
          id: addTaskFields.groupId,
          title: "Group " + addTaskFields.groupId,
          color: addTaskFields.groupColor,
          show: true
        }
        return [...storedGroups, newGroup];
      });
    } else {
      // If we do have this group, just update the color
      groupStore.update(storedGroups => {
        let group = storedGroups.find(p => p.id === addTaskFields.groupId);
        group.color = addTaskFields.groupColor;
        return storedGroups;
      });
    }
    // Add the task
    taskStore.update(tasks => {
      let newTask = {
        // Get the next highest id
        id: Math.max(...tasks.map(o => o.id)) + 1,
        title: addTaskFields.title,
        description: addTaskFields.description,
        complete: false,
        dueDate: addTaskFields.dueDate,
        groupId: addTaskFields.groupId,
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
      <span>Group Id: </span>
      <input type="number" bind:value={addTaskFields.groupId} on:change={modalChangeGroupColor}>
    </label>
    <label>
      <span>Group Color (optional): </span>
      <input type="color" bind:value={addTaskFields.groupColor}>
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
