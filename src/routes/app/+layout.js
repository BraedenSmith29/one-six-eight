import { browser } from "$app/environment";
import { dbToStoreGroupMap, dbToStoreEventMap, dbToStoreTaskMap } from "$lib/shared/dbDataMapping";
import groupStore from "$lib/stores/groupStore";
import eventStore from "$lib/stores/eventStore";
import taskStore from "$lib/stores/taskStore";
import habitStore from "$lib/stores/habitStore";

export const load = async ({ parent, data }) => {
  // Load data from db into stores
  groupStore.set(data.groupsData);
  eventStore.set(data.eventsData);
  taskStore.set(data.tasksData);
  habitStore.set(data.habitsData);

  // Subscribe to db changes on client
  if (browser) {
    const parentData = await parent();
  
    parentData.supabase
      .channel("any")
      .on("postgres_changes", { event: "*", schema: "public", table: "groups" }, payload => {
        if (payload.eventType === "DELETE") {
          groupStore.update(groups => {
            return groups.filter(g => g.id !== payload.old.id);
          });
        } else if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          groupStore.update(groups => {
            return [...groups.filter(g => g.id !== payload.new.id), dbToStoreGroupMap(payload.new)];
          });
        } else {
          console.error("Unrecognized change type.", payload);
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, payload => {
        if (payload.eventType === "DELETE") {
          eventStore.update(events => {
            return events.filter(e => e.id !== payload.old.id);
          });
        } else if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          eventStore.update(events => {
            return [...events.filter(e => e.id !== payload.new.id), dbToStoreEventMap(payload.new)];
          });
        } else {
          console.error("Unrecognized change type.", payload);
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, payload => {
        if (payload.eventType === "DELETE") {
          taskStore.update(tasks => {
            return tasks.filter(t => t.id !== payload.old.id);
          });
        } else if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          taskStore.update(tasks => {
            return [...tasks.filter(t => t.id !== payload.new.id), dbToStoreTaskMap(payload.new)];
          });
        } else {
          console.error("Unrecognized change type.", payload);
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "habits" }, payload => {
        if (payload.eventType === "DELETE") {
          habitStore.update(habits => {
            return habits.filter(h => h.id !== payload.old.id);
          });
        } else if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          habitStore.update(habits => {
            const newHabit = {
              id: payload.new.id,
              title: payload.new.title,
              color: "#" + payload.new.color,
              // Map the history data into the array of strings
              history: habits.find(h => h.id === payload.new.id)?.history ?? []
            };
            return [...habits.filter(h => h.id !== payload.new.id), newHabit];
          });
        } else {
          console.error("Unrecognized change type.", payload);
        }
      })
      .subscribe();
  }
}