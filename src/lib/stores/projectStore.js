import { writable } from 'svelte/store';

const projectStore = writable([
  {
    id: 1,
    name: "Project 1",
    color: "#c6c6c6",
    showInCalendarView: true
  },
]);

export default projectStore;
