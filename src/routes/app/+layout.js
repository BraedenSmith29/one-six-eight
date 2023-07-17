import groupStore from "$lib/stores/groupStore";
import taskStore from "$lib/stores/taskStore";
import habitStore from "$lib/stores/habitStore";

export const load = async ({ data }) => {
  // Load data from db into stores
  groupStore.set(data.groupsData);
  taskStore.set(data.tasksData);
  habitStore.set(data.habitsData);
}