<script>
  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import groupStore from "$lib/stores/groupStore.js";
  // Properties
  export let group;

  let editButtonVisible = false;
  let confirmDelete = false;

  // Add functionality and form contents variable for modal
  let editGroupFields;
  let showModal = false;
  const toggleModal = () => {
    // Clear the fields and toggle the modal
    editGroupFields = {
      title: group.title,
      color: group.color,
    };
    showModal = !showModal
  };

  let loading = false;
  let editGroupError = null;
  const editGroup = async () => {
    if (loading) return;
    loading = true;

    const { error } = await $page.data.supabase
      .from("groups")
      .update({
        title: editGroupFields.title,
        color: editGroupFields.color.substring(1),
      })
      .eq('id', group.id);

    editGroupError = error;
    if (!error) {
      group.title = editGroupFields.title;
      group.color = editGroupFields.color;
      // Push the update to the store
      $groupStore = $groupStore;
      toggleModal();
    }
    
    loading = false;
  };
  const deleteGroup = async () => {
    if (loading) return;
    loading = true;

    const { error } = await $page.data.supabase
      .from("groups")
      .delete()
      .eq('id', group.id);

    editGroupError = error;
    if (!error) {
      groupStore.update(groups => {
        return groups.filter(g => g.id !== group.id);
      });
      toggleModal();
    }
    
    loading = false;
  };

  // Toggle show
  const toggleShow = async () => {
    // Push the update to the store
    $groupStore = $groupStore;

    // Change on the db
    // I don't really care if it fails, it's pretty inconsequential
    await $page.data.supabase
      .from("groups")
      .update({
        show: group.show,
      })
      .eq('id', group.id);
  }
</script>

<div class="sidebar-group-list-item" style="background-color: {group.color};"
     on:mouseenter={() => editButtonVisible = true} on:mouseleave={() => editButtonVisible = false}>
  <input type="checkbox" bind:checked={group.show} on:change={toggleShow}>
  <p>{group.title}</p>
  <spacer style="flex-grow: 1" />
  {#if editButtonVisible}
    <button on:click={toggleModal}>...</button>
  {/if}
</div>
<Modal showModal={showModal} on:exit={toggleModal}>
  <h2>Edit Event</h2>
  <form class="edit-group-modal" on:submit|preventDefault={editGroup}>
    <label>
      <span>Group Name: </span>
      <input type="textbox" bind:value={editGroupFields.title}>
    </label>
    <label>
      <span>Habit Color: </span>
      <input type="color" bind:value={editGroupFields.color}>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Save</button>
      <div style="margin: 5px;">
        {#if !confirmDelete}
          <button on:click|preventDefault={() => confirmDelete = true}>Delete Group</button>
        {:else}
          <p>Are you sure you want to delete this group?</p>
          <button on:click|preventDefault={() => confirmDelete = false}>No</button>
          <button on:click|preventDefault={deleteGroup}>Yes</button>
        {/if}
      </div>
    {/if}
    {#if editGroupError}
      <p class="error-text">{editGroupError}</p>
    {/if}
  </form>
</Modal>

<style>
  .sidebar-group-list-item {
    display: flex;
  }
  .sidebar-group-list-item p {
    margin: 2px;
    font-size: 1.1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sidebar-group-list-item button {
    margin: 2px;
  }
  .edit-group-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>

