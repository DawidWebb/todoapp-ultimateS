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

  const [listName, setListName] = useState();
  const [requiredInfo, setRequiredInfo] = useState();
  useEffect(() => {
    setListName(name);
  }, [edit, name]);

  const dispatch = useDispatch();

  const handleSetListName = (e) => {
    e.preventDefault();
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
        name: name,
      };
      dispatch(updateTasksList(tasksListEditedObj));
      dispatch(editDel());
      dispatch(clearTasksList());
    }
  };

  const handleOnCloseModal = () => {
    dispatch(editDel());
    dispatch(clearTasksList());
    setRequiredInfo();
  };

  const handleOnDelete = () => {
    const dataObj = {
      id: id,
      jwt: login[0].jwt,
    };
    dispatch(removeTasksList(dataObj));
    dispatch(editDel());
    dispatch(clearTasksList());
    setRequiredInfo();
  };
  return (
    <Modal isModalOpen={edit.isEdit}>
      <div className={styles.wrapper}>
        <div className={styles.forms}>
          <form className={styles.titleForm}>
            <input
              type="text"
              name="listname"
              placeholder="List name"
              value={listName}
              onChange={handleSetListName}
            />
            <span>{requiredInfo}</span>
          </form>
          <TasksList />
        </div>
        <div className={styles.buttonsList}>
          <Button type="button" name="cancel" onClick={handleOnCloseModal} />
          {!edit.data.length ? (
            ""
          ) : (
            <Button type="button" name="delete" onClick={handleOnDelete} />
          )}
          <Button type="button" name="save" onClick={handleOnSubbmitList} />
        </div>
      </div>
    </Modal>
  );
};

export default TasksListModal;
