import { writable } from 'svelte/store';

const TaskStore = writable([
  {
    id: 1,
    name: "Example Task",
    description: "lorem ipsum dolor sit amet",
    complete: false,
    dueDate: "2023-6-11",
    projectId: 1
  },
  {
    id: 2,
    name: "Another Example Task",
    description: "lorem ipsum dolor sit amet",
    complete: false,
    dueDate: "2023-6-11",
    projectId: 1
  },
]);

export default TaskStore;
