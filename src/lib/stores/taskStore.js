import { writable } from 'svelte/store';

const taskStore = writable([
  {
    id: 1,
    name: "Example Task",
    description: "lorem ipsum dolor sit amet",
    complete: false,
    dueDate: "2023-06-29",
    projectId: 1
  },
  {
    id: 2,
    name: "Another Example Task",
    description: "lorem ipsum dolor sit amet",
    complete: false,
    dueDate: "2023-06-29",
    projectId: 1
  },
]);

export default taskStore;
