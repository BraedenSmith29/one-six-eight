<script>
  // Components
  import Icon from "$lib/components/shared/Icon.svelte";
  
  let showDropdown = false;

  function openPopout() {
    window.addEventListener("mousedown", closePopout);
    showDropdown = true;
  }
  function closePopout() {
    window.removeEventListener("mousedown", closePopout);
    showDropdown = false;
  }
</script>

<div class="filter-dropdown" on:mousedown|stopPropagation>
  <button class="dropdown-button" on:click={() => showDropdown ? closePopout() : openPopout()}>
    <Icon name="down-arrow" color="#eeeeee" height="0.9rem" width="0.9rem"/>
    <span>Filters</span>
  </button>
  {#if showDropdown}
    <div class="dropdown">
      
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
  }
</style>