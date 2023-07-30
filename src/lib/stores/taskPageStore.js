import { writable } from 'svelte/store';

const taskPageStore = writable({
  selectedView: -2, //TODO -2 is upcoming view. This should pull from the db someday.
  upcomingFilter: [], // Array of group ids to disclude
});

export default taskPageStore;
