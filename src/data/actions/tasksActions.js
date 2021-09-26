export const SET_TASK = "SET_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DEL_TASK = "DEL_TASK";
export const CLEAR_TASKS_LIST = "CLEAR_TASKS_LIST";

export const setTask = (data) => ({
  type: SET_TASK,
  payload: data,
});

export const editTask = (data) => ({
  type: EDIT_TASK,
  payload: data,
});
export const delTask = (data) => ({
  type: DEL_TASK,
  payload: data,
});

export const clearTasksList = () => ({
  type: CLEAR_TASKS_LIST,
});
