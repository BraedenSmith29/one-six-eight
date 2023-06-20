import { writable } from 'svelte/store';

const calendarStore = writable([
  {
    id: 1,
    name: "Calendar 1",
    color: "#faa0a0",
    showInCalendarView: true
  },
]);

export default calendarStore;
