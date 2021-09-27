import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTasksList,
  clearTasksList,
  editDel,
  removeTasksList,
  updateTasksList,
} from "../../data/actions";
import { Button, Modal, TasksList } from "../../components";
import styles from "./tasksListModal.module.scss";

const TasksListModal = () => {
  const login = useSelector((store) => store.login);
  const tasks = useSelector((store) => store.tasks);
  const edit = useSelector((store) => store.edit[0]);
  const name = !edit.data.length ? "" : edit.data[0].name;
  const id = !edit.data.length ? "" : edit.data[0].id;

  const [listName, setListName] = useState("");
  const [requiredInfo, setRequiredInfo] = useState();

  useEffect(() => {
    setListName(name);
  }, [edit, name]);

  const dispatch = useDispatch();

  const handleSetListName = (e) => {
    setListName(e.target.value);
  };

  const handleOnSubbmitList = () => {
    if (!edit.data.length) {
      if (!listName) {
        setRequiredInfo("List name is required");
      } else {
        const tasksListObj = {
          jwt: login[0].jwt,
          name: listName,
          task: tasks,
        };
        dispatch(addTasksList(tasksListObj));
        dispatch(editDel());
        dispatch(clearTasksList());
        setRequiredInfo();
      }
    } else {
      const tasksListEditedObj = {
        id: id,
        jwt: login[0].jwt,
        task: tasks,
        name: listName,
      };
      dispatch(updateTasksList(tasksListEditedObj));
      dispatch(editDel());
      dispatch(clearTasksList());
      setListName("");
    }
  };

  const handleOnCloseModal = () => {
    dispatch(editDel());
    dispatch(clearTasksList());
    setRequiredInfo();
  };

  const handleOnDelete = () => {
    if (!edit.data.length) {
      return;
    } else {
      const dataObj = {
        id: id,
        jwt: login[0].jwt,
      };
      dispatch(removeTasksList(dataObj));
      dispatch(editDel());
      dispatch(clearTasksList());
      setRequiredInfo();
      setListName("");
    }
  };
  return (
    <Modal isModalOpen={edit.isEdit} handleOnCloseModal={handleOnCloseModal}>
      <div className={styles.wrapper}>
        <div className={styles.forms}>
          <form className={styles.titleForm}>
            <input
              onChange={handleSetListName}
              type="text"
              name="listname"
              placeholder="List name"
              value={listName}
            />

            <span>{requiredInfo}</span>
          </form>
          <TasksList />
        </div>
        <div className={styles.buttonsList}>
          <Button type="button" name="cancel" onClick={handleOnDelete} />
          <Button type="button" name="save" onClick={handleOnSubbmitList} />
        </div>
      </div>
    </Modal>
  );
};

export default TasksListModal;
