import { SET_TASK, EDIT_TASK, CLEAR_TASKS_LIST, DEL_TASK } from "../actions";

export const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TASK:
      return [...state, action.payload];
    case CLEAR_TASKS_LIST:
      return (state = []);
    case EDIT_TASK:
      state.splice(action.payload.index, 1, action.payload.task);
      return state;
    case DEL_TASK:
      state.splice(action.payload, 1);
      return state;

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
