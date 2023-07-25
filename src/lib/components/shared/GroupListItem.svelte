<script>
  // Assets
  import inboxIcon from "$lib/assets/inbox-icon.svg";
  import groupIcon from "$lib/assets/group-icon.svg";
  // Properties
  export let group;
</script>

<div class="group-list-item" on:click>
  <img src={group == null ? inboxIcon : groupIcon} />
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