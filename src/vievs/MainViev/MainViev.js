import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginPage, TaskPage } from "../../vievs";
import { getTasksList } from "../../data/actions";
import styles from "./mainViev.module.scss";

const MainViev = () => {
  const login = useSelector((store) => store.login);

  const jwt = !login.length ? false : login[0].jwt;

  const pageViev = jwt ? <TaskPage /> : <LoginPage />;

  return <div className={styles.wrapper}>{pageViev}</div>;
};

export default MainViev;
