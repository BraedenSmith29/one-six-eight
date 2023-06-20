import { writable } from 'svelte/store';

const eventStore = writable([
  {
    id: 1,
    name: "Event 1",
    startTime: "2023-06-20T08:00",
    endTime: "2023-06-20T10:00",
    description: "lorem ipsum dolor sit amet",
    calendarId: 1
  },
  {
    id: 2,
    name: "Event 2",
    startTime: "2023-06-21T09:00",
    endTime: "2023-06-21T13:00",
    description: "lorem ipsum dolor sit amet",
    calendarId: 1
  },
]);

export default eventStore;
