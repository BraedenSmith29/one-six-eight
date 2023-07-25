<script>
  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  import Icon from "$lib/components/shared/Icon.svelte";
  // Stores
  import { page } from "$app/stores";

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

<button class="add-new-group-button" on:click={toggleAddGroupModal}>
  <Icon name="plus-sign" color="#eeeeee" />
  <span>Add New Group</span>
</button>
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
  .add-new-group-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: #353535;
    color: inherit;
    font-size: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .add-group-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>