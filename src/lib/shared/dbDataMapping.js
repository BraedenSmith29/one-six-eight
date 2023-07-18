import { changeTimeByMinutes } from "$lib/shared/dateHelper";

// ***********************************************************
// ** Functions to map data from the database to the stores **
// ***********************************************************

export const dbToStoreGroupMap = (o) => ({
  id: o.id,
  title: o.title,
  color: "#" + o.color,
  show: o.show
});

export const dbToStoreEventMap = (o) => ({
  id: o.id,
  groupId: o.group_id,
  title: o.title,
  description: o.description,
  startTime: o.start_time.substring(0, 16),
  endTime: changeTimeByMinutes(o.start_time, o.duration) // TODO Change internal logic to function off of duration
});

export const dbToStoreTaskMap = (o) => ({
  id: o.id,
  groupId: o.group_id,
  // TODO parentTaskId = o.parent_task
  title: o.title,
  description: o.description,
  dueDate: o.due_time?.substring(0, 10) ?? "", // TODO need to have some kind of time option
  complete: o.complete,
  // TODO autoComplete: o.auto_complete
});