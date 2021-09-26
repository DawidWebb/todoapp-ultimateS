import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editSet,
  getList,
  getTasksList,
  sortTasksList,
  reverseTasksList,
} from "../../data/actions";
import { ListItem } from "../../components";
import styles from "./taskPage.module.scss";

const TaskPage = () => {
  const tasksList = useSelector((store) => store.list);

  const dispatch = useDispatch();

  const [sortMethod, setDortMethod] = useState();

  const handleSortByName = (e) => {
    setDortMethod(e.target.value);
  };

  useEffect(() => {
    if (sortMethod === "reverse") {
      dispatch(reverseTasksList());
    }
    if (sortMethod === "sort") {
      dispatch(sortTasksList());
    }
  }, [sortMethod]);

  const listsViev = !tasksList.length
    ? ""
    : tasksList.map((item) => <ListItem key={item.id} item={item} />);

  const [listName, setListName] = useState(false);

  const handleOpenModal = () => {
    dispatch(editSet([]));
  };

  const handleSetListName = (e) => {
    e.preventDefault();
    setListName(e.target.value);
  };

  const handleSearchList = (e) => {
    e.preventDefault();
    if (!listName) {
      dispatch(getTasksList());
    } else {
      dispatch(getList(listName));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.insideBox}>
        <div className={styles.search}>
          <form onSubmit={handleSearchList}>
            <input
              type="text"
              placeholder="Search"
              onChange={handleSetListName}
            />
          </form>
          <form>
            <select onChange={handleSortByName}>
              <option value="sort">Sort by name</option>
              <option value="reverse">Reverse sort</option>
            </select>
          </form>
        </div>
        <div className={styles.tasks}>{listsViev}</div>
        <div className={styles.button}>
          <div onClick={handleOpenModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34px"
              viewBox="0 0 24 24"
              width="34px"
              fill="rgb(216, 145, 2)"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
