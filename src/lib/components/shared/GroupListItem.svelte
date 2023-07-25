<script>
  // Components
  import Icon from "$lib/components/shared/Icon.svelte";
  // Properties
  export let group;
</script>

<div class="group-list-item" on:click>
  <Icon name={group == null ? "inbox" : "small-circle"} color="#eeeeee" />
  <span>{group == null ? "Inbox" : group.title}</span>
</div>

<style>
  .group-list-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9em;
    padding: 6px;
    padding-right: 9px;
    margin-left: 4px;
    border-radius: 5px;
    cursor: pointer;
  }
  .group-list-item:hover {
    background-color: #353535;
  }
</style>