import { ADD_USER } from "../actions";

export const accountReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];

    default:
      // console.warn(`No have action type ${action.type}`);
      return state;
  }
};
