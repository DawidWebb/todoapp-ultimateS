import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../../data/actions";
import { Button } from "../../components";
import styles from "./createAccountPage.module.scss";

const CreateAccountPage = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSetUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  const handleSetEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleSetPass = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  const handleOnSubmitUser = (e) => {
    e.preventDefault();
    const registrationSchemaObject = {
      username: user,
      email: email,
      password: pass,
    };
    dispatch(addUser(registrationSchemaObject));
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.insideBox}>
        <div className={styles.backArrow} onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
          </svg>
        </div>
        <h2>Create an new account</h2>
        <form onSubmit={handleOnSubmitUser}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleSetUser}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleSetEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleSetPass}
          />
          <input
            type="password"
            name="repeatPass"
            placeholder="Repeat password"
          />
          <Button type="submit" name="Create" />
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
