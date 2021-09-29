import { timeoutShowTask } from "./taskActions";
import { addSpinner, removeSpinner } from "./spinnerActions";

export const ADD_USER = "ADD_USER";

const baseURL = "https://recruitment.ultimate.systems/auth/local/register";

export const addUser = (data) => async (dispatch) => {
  dispatch(addSpinner());
  const orderRes = await fetch(baseURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const status = orderRes.status;
  const content = await orderRes.json();

  if (status === 200) {
    dispatch({
      type: ADD_USER,
      payload: content,
    });
    dispatch(removeSpinner());
    dispatch(timeoutShowTask("User added"));
  } else if (status === 400) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask("User exists"));
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
