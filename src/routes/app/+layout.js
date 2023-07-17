import habitStore from "$lib/stores/habitStore"

export const load = async ({ data }) => {
  // Load data from db into stores
  habitStore.set(data.habitsData);
}