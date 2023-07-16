import { changeTimeByMinutes } from "$lib/shared/dateHelper";

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
    return data.map(o => ({
      id: o.id,
      title: o.title,
      color: "#" + o.color,
      show: o.show
    }));
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
    return data.map(o => ({
      id: o.id,
      groupId: o.group_id,
      title: o.title,
      description: o.description,
      startTime: o.start_time.substring(0, 16),
      endTime: changeTimeByMinutes(o.start_time, o.duration) // TODO Change internal logic to function off of duration
    }));
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
    return data.map(o => ({
      id: o.id,
      groupId: o.group_id,
      // TODO parentTaskId = o.parent_task
      title: o.title,
      description: o.description,
      dueDate: o.due_time.substring(0, 10), // TODO need to have some kind of time option
      complete: o.complete,
      // TODO autoComplete: o.auto_complete
    }));
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
    return habitsData.map(o => ({
      id: o.id,
      title: o.title,
      color: "#" + o.color,
      // Map the history data into the array of strings
      history: historyData.filter(i => i.habit_id === o.id).map(i => i.entry_date)
    }));
  }
}
