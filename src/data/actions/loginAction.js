import {
  timeoutShowTask,
  getTasksList,
  addSpinner,
  removeSpinner,
} from "../actions";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

const baseURL = "https://recruitment.ultimate.systems/auth/local";

export const addLogin = (data) => async (dispatch) => {
  dispatch(addSpinner());
  const orderRes = await fetch(baseURL, {
    method: "POST",
    mode: "cors",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const status = orderRes.status;
  const content = await orderRes.json();

  if (status === 200) {
    dispatch(getTasksList(content.jwt));

    dispatch({
      type: LOG_IN,
      payload: content,
    });
    dispatch(removeSpinner());
  } else if (status === 404) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(content.error));
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(content.error));
  }
};

export const addLogout = () => ({
  type: LOG_OUT,
});
