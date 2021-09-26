import axios from "axios";
import { timeoutShowTask } from "./taskActions";
import { addSpinner, removeSpinner } from "./spinnerActions";

export const ADD_TASKS_LIST = "ADD_TASKS_LIST";
export const GET_TASKS_LIST = "GET_TASKS_LIST";
export const UPDATE_TASKS_LIST = "UPDATE_TASKS_LIST";
export const SORT_TASKS_LIST = "SORT_TASKS_LIST";
export const REVERSE_TASKS_LIST = "REVERSE_TASKS_LIST";
export const REMOVE_TASKS_LIST = "REMOVE_TASKS_LIST";
export const TASK_COMPLET_SELECTED = "TASK_COMPLET_SELECTED";

const request = axios.create({
  baseURL: "http://localhost:8000",
  validateStatus: false,
});

const baseURL = `https://recruitment.ultimate.systems/to-do-lists`;

export const getTasksList = (jwt) => async (dispatch) => {
  dispatch(addSpinner());

  const orderRes = await fetch(baseURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${[jwt]}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const status = orderRes.status;
  const content = await orderRes.json();
  console.log(content);
  if (status === 200) {
    dispatch({
      type: GET_TASKS_LIST,
      payload: content,
    });
    dispatch(removeSpinner());
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        "Sorry, it's some mistyke from our side, please procced again."
      )
    );
    console.log(status, content);
  }
};

export const getList = (name) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get(`/tasks-list/${name}`);
  if (status === 200) {
    dispatch({
      type: GET_TASKS_LIST,
      payload: [data],
    });
    dispatch(removeSpinner());
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
export const updateTasksList = (dataObj) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.put("tasks-list", dataObj);
  if (status === 202) {
    dispatch({
      type: UPDATE_TASKS_LIST,
      payload: data,
    });
    dispatch(removeSpinner());
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

// export const sortTasksList = (name) => async (dispatch) => {
//   dispatch(addSpinner());
//   const { data, status } = await request.get(`/tasks-list`);
//   if (status === 200) {
//     dispatch({
//       type: SORT_TASKS_LIST,
//       payload: data,
//     });
//     dispatch(removeSpinner());
//   } else {
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask(data.message));
//   }
// };

export const sortTasksList = () => ({
  type: SORT_TASKS_LIST,
});

export const reverseTasksList = () => ({
  type: REVERSE_TASKS_LIST,
});

export const removeTasksList = (id) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.delete(`tasks-list/${id}`);
  if (status === 200) {
    dispatch({
      type: REMOVE_TASKS_LIST,
      payload: id,
    });
    dispatch(removeSpinner());
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const addTasksList = (data) => async (dispatch) => {
  dispatch(addSpinner());
  console.log(data);
  const orderRes = await fetch(baseURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${[data.jwt]}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const status = orderRes.status;
  const content = await orderRes.json();
  if (status === 200) {
    dispatch({
      type: ADD_TASKS_LIST,
      payload: content,
    });

    dispatch(removeSpinner());
    dispatch(timeoutShowTask("TasksList added"));
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        "Sorry, it's some mistyke from our side, please procced again"
      )
    );
    console.log(status, content);
  }
};

// export const updateTasksList = (data) => async (dispatch) => {
//   console.log(data);
//   dispatch(addSpinner());
//   const orderRes = await fetch(`${baseURL}/${data.id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${[data.jwt]}`,
//       accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data.dataObj),
//   });
//   const status = orderRes.status;
//   const content = await orderRes.json();
//   if (status === 200) {
//     getTasksList();
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask("TasksList deleted"));
//   } else {
//     dispatch(removeSpinner());
//     dispatch(
//       timeoutShowTask(
//         "Sorry, it's some mistyke from our side, please procced again."
//       )
//     );
//     console.log(status, content);
//   }
// };

// export const removeTasksList = (data) => async (dispatch) => {
//   dispatch(addSpinner());
//   const orderRes = await fetch(
//     `https://recruitment.ultimate.systems/to-do-lists/${data.id}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${[data.jwt]}`,
//         accept: "application/json",
//       },
//     }
//   );
//   const status = orderRes.status;
//   const content = await orderRes.json();
//   if (status === 200) {
//     dispatch({
//       type: REMOVE_TASKS_LIST,
//       payload: data.id,
//     });
//     dispatch(removeSpinner());
//     dispatch(timeoutShowTask("TasksList deleted"));
//   } else {
//     dispatch(removeSpinner());
//     dispatch(
//       timeoutShowTask(
//         "Sorry, it's some mistyke from our side, please procced again."
//       )
//     );
//     console.log(status, content);
//   }
// };
