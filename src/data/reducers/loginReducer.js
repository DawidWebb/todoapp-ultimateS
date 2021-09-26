import { LOG_IN, LOG_OUT } from "../actions";

export const loginReducer = (state = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return [...state, action.payload];

    case LOG_OUT:
      return (state = []);

    default:
      // console.warn(`No have action type ${action.type}`);
      return state;
  }
};
