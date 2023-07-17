import habitStore from "$lib/stores/habitStore";
import taskStore from "$lib/stores/taskStore";

export const load = async ({ data }) => {
  // Load data from db into stores
  taskStore.set(data.tasksData);
  habitStore.set(data.habitsData);
}