import { writable } from 'svelte/store';

const eventStore = writable([
  {
    id: 1,
    name: "Event 1",
    startTime: "2023-06-28T08:00",
    endTime: "2023-06-28T10:00",
    description: "lorem ipsum dolor sit amet",
    calendarId: 1
  },
  {
    id: 2,
    name: "Event 2",
    startTime: "2023-06-29T09:00",
    endTime: "2023-06-29T13:00",
    description: "lorem ipsum dolor sit amet",
    calendarId: 1
  },
]);

export default eventStore;
