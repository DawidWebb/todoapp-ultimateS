import {
  ADD_TASKS_LIST,
  GET_TASKS_LIST,
  UPDATE_TASKS_LIST,
  SORT_TASKS_LIST,
  REVERSE_TASKS_LIST,
  REMOVE_TASKS_LIST,
} from "../actions";

export const listReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASKS_LIST:
      return [...state, action.payload];
    case GET_TASKS_LIST:
      return (state = action.payload);

    case UPDATE_TASKS_LIST:
      const indexListToUpdate = state.findIndex(
        (list) => list.id === action.payload.id
      );
      state.splice(indexListToUpdate, 1, action.payload);
      return [...state];

    case SORT_TASKS_LIST:
      return [...state].sort((a, b) => (a.name > b.name && 1) || -1);

    case REVERSE_TASKS_LIST:
      return [...state].reverse();

    case REMOVE_TASKS_LIST:
      return state.filter((item) => item.id !== action.payload);

    default:
      // console.warn(`It's no action: ${action.type}`);
      return state;
  }
};
