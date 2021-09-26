import { combineReducers } from "redux";

import { accountReducer } from "./accountReducer";
import { editReducer } from "./editReducer";
import { listReducer } from "./listReducer";
import { loginReducer } from "./loginReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";
import { tasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
  account: accountReducer,
  edit: editReducer,
  login: loginReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  list: listReducer,
  tasks: tasksReducer,
});
