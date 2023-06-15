import { writable } from 'svelte/store';

const ProjectStore = writable([
  {
    id: 1,
    name: "Project 1",
    color: "#c6c6c6"
  },
]);

export default ProjectStore;
