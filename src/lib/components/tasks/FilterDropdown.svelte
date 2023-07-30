<script>
  // Components
  import Icon from "$lib/components/shared/Icon.svelte";
  // Stores
  import groupStore from "$lib/stores/groupStore.js";
  import taskPageStore from "$lib/stores/taskPageStore.js";
  
  let showDropdown = false;

  function updateFilter(id) {
    taskPageStore.update(store => {
      if (store.upcomingFilter.includes(id)) {
        store.upcomingFilter = store.upcomingFilter.filter(i => i !== id);
      } else {
        store.upcomingFilter.push(id);
      }
      return store;
    })
  }

  function openPopout() {
    window.addEventListener("mousedown", closePopout);
    showDropdown = true;
  }
  function closePopout() {
    window.removeEventListener("mousedown", closePopout);
    showDropdown = false;
  }
</script>

<div class="filter-dropdown">
  <button class="dropdown-button" on:click={openPopout}>
    <Icon name="down-arrow" color="#eeeeee" height="0.9rem" width="0.9rem"/>
    <span>Filters</span>
  </button>
  {#if showDropdown}
    <div class="dropdown" on:mousedown|stopPropagation>
      <div class="dropdown-header">
        <div class="dropdown-label">Group Filter</div>
      </div>
      {#each $groupStore as group}
        <div class="group-filter" on:click={() => updateFilter(group.id)}>
          <Icon name={$taskPageStore.upcomingFilter.includes(group.id) ? "unselected" : "selected"} color="#eeeeee" />
          <div>{group.title}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .filter-dropdown {
    position: relative;
    user-select: none;
  }
  .dropdown-button {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    padding: 4px 7px;
    padding-left: 4px; /* Manually adjust padding for spacing with icon */
    color: inherit;
    background-color: #272727;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    cursor: pointer;
  }
  .dropdown {
    position: absolute;
    background-color: #2e2e2e;
    border-radius: 10px;
    top: calc(100% + 8px);
    right: 0%;
    padding: 15px;
    width: max-content;
  }
  .dropdown-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0px 3px 9px;
    border-bottom: solid 1px #eeeeee;
    margin-bottom: 13px;
  }
  .dropdown-label {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .group-filter {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 5px;
    margin-top: 6px;
  }
</style>