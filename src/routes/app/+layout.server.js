import { dbToStoreGroupMap, dbToStoreEventMap, dbToStoreHabitMap, dbToStoreTaskMap } from "$lib/shared/dbDataMapping";

export const load = async ({ locals }) => {
  console.log("Loaded user data from server")
  return {
    groupsData: loadGroupsData(locals.supabase),
    eventsData: loadEventsData(locals.supabase),
    tasksData: loadTasksData(locals.supabase),
    habitsData: loadHabitsData(locals.supabase),
  };
}

const loadGroupsData = async (sbClient) => {
  const { data, error } = await sbClient
    .from("groups")
    .select();
  if (error) {
    console.log("Error with supabase groups select");
    return [];
  } else {
    return data.map(dbToStoreGroupMap);
  }
}

const loadEventsData = async (sbClient) => {
  const { data, error } = await sbClient
    .from("events")
    .select();
  if (error) {
    console.log("Error with supabase events select");
    return [];
  } else {
    return data.map(dbToStoreEventMap);
  }
}

const loadTasksData = async (sbClient) => {
  const { data, error } = await sbClient
    .from("tasks")
    .select();
  if (error) {
    console.log("Error with supabase tasks select");
    return [];
  } else {
    return data.map(dbToStoreTaskMap);
  } 
}

const loadHabitsData = async (sbClient) => {
  const { data: habitsData, error: habitsError } = await sbClient
    .from("habits")
    .select();
  const { data: historyData, error: historyError } = await sbClient
    .from("habit_history")
    .select();
  if (habitsError) {
    console.log("Error with supabase habits select");
    return [];
  } else if (historyError) {
    console.log("Error with supabase habits history select");
    return [];
  } else {
    return habitsData.map((o) => ({
      id: o.id,
      title: o.title,
      color: "#" + o.color,
      // Map the history data into the array of strings
      history: historyData.filter(i => i.habit_id === o.id).map(i => ({ id: i.id, date: i.entry_date }))
    }));
  }
}
