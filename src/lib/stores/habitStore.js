import { writable } from 'svelte/store';

const HabitStore = writable([
  {
    id: 1,
    name: "Habit 1",
    color: "#c6c6c6",
    habitHistory: ["2023-06-15", "2023-06-14", "2023-06-12", "2023-06-10"],
  },
  {
    id: 2,
    name: "Habit 2",
    color: "#a0a0a0",
    habitHistory: ["2023-06-15", "2023-06-14", "2023-06-12", "2023-06-10"],
  },
]);

export default HabitStore;
