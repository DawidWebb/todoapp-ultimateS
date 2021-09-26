import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLogin } from "../../data/actions";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const handleSetLogin = (e) => {
    e.preventDefault();
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  const handleOnSubmitLogin = (e) => {
    e.preventDefault();
    const loginObj = {
      identifier: login,
      password: pass,
    };
    dispatch(addLogin(loginObj));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.insideBox}>
        <h2>Login</h2>
        <form onSubmit={handleOnSubmitLogin}>
          <input
            type="text"
            name="login"
            placeholder="Email or Username"
            onChange={handleSetLogin}
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            onChange={handleSetPass}
          />
          <Button type="submit" name="Login" />
        </form>
        <p>or</p>
        <Link to="/create-account">
          <h3>create an account</h3>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
