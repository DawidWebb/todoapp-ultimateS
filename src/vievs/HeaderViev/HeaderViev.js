import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLogout } from "../../data/actions";
import styles from "./headerViev.module.scss";

const HeaderViev = () => {
  const login = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const history = useHistory();

  const userLoged = !login.length ? false : login[0].user;

  const handleLogOut = () => {
    dispatch(addLogout());
    history.push("/");
  };

  const logoutViev = !userLoged ? (
    ""
  ) : (
    <div onClick={handleLogOut}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="28px"
        viewBox="0 0 24 24"
        width="28px"
        fill="none"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
    </div>
  );

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logo}>
        <h2>AppToDo</h2>
      </div>
      <div className={styles.logout}>{logoutViev}</div>
    </div>
  );
};

export default HeaderViev;
