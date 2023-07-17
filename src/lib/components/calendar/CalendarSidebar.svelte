<script>
  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import groupStore from "$lib/stores/groupStore.js";

  // Add functionality and form contents variable for modal
  let addGroupFields;
  let showModal = false;
  const toggleAddGroupModal = () => {
    // Clear the fields and toggle the modal
    addGroupFields = {
      title: "",
      color: "#c6c6c6",
    };
    showModal = !showModal
  };

  let loading = false;
  let addGroupError = null;
  const addGroup = async () => {
    if (loading) return;
    loading = true;

    const { data, error } = await $page.data.supabase
      .from("groups")
      .insert({
        title: addGroupFields.title,
        color: addGroupFields.color.substring(1),
        show: true,
      })
      .select().single();

    addGroupError = error;
    if (!error) {
      groupStore.update(groups => {
        let newGroup = {
          id: data.id,
          title: addGroupFields.title,
          color: addGroupFields.color,
          show: true,
        }
        return [...groups, newGroup];
      });
      toggleAddGroupModal();
    }
    
    loading = false;
  };
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <span>June 2023</span>
    <button>&lt;</button>
    <button>&gt;</button>
  </div>
  <h2>Group Visibility</h2>
  {#each $groupStore as group}
    <div style="background-color: {group.color};">
      <input type="checkbox" bind:checked={group.show}>{group.title}
    </div>
  {/each}
  <spacer style="flex-grow: 1" />
  <button on:click={toggleAddGroupModal}>Add New Group</button>
</div>
<Modal showModal={showModal} on:exit={toggleAddGroupModal}>
  <form class="add-group-modal" on:submit|preventDefault={addGroup}>
    <label>
      <span>Group Name: </span>
      <input type="textbox" bind:value={addGroupFields.title}>
    </label>
    <label>
      <span>Habit Color: </span>
      <input type="color" bind:value={addGroupFields.color}>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Add Group</button>
    {/if}
    {#if addGroupError}
      <p class="error-text">{addGroupError}</p>
    {/if}
  </form>
</Modal>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 216px;
    border-right: 2px solid grey;
  }
  .sidebar-header {
    font-size: 1.5em;
    font-weight: bold;
  }
  .add-group-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>