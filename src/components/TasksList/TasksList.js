import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask, delTask } from "../../data/actions";
import { Button, TaskItem } from "../../components";
import styles from "./tasksList.module.scss";

const TasksList = () => {
  const tasks = useSelector((store) => store.tasks);

  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState();
  const [indexToDel, setIndexToDel] = useState();
  const [requiredInfo, setRequiredInfo] = useState();

  const handleSetTaskName = (e) => {
    e.preventDefault();
    setTaskName(e.target.value);
  };

  const handleAddTask = () => {
    if (!taskName) {
      setRequiredInfo("Task name is required");
    } else {
      const taskObj = {
        name: taskName,
        isDone: false,
      };
      dispatch(setTask(taskObj));
      setTaskName("");
      setRequiredInfo();
    }
  };

  const tasksListViev = () => {
    if (!tasks.length) {
      return "";
    } else {
      return tasks.map((item, index) => (
        <TaskItem
          key={Math.random() * 0.1234}
          item={item}
          index={index}
          indexToDel={indexToDel}
          setIndexToDel={setIndexToDel}
        />
      ));
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    return;
  };

  const handleDelTask = () => {
    dispatch(delTask(indexToDel));
    setIndexToDel();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tasksList}>{tasksListViev()}</div>
      <form onSubmit={handleOnSubmit} className={styles.taskForm}>
        <label className={styles.container}>
          <input type="checkbox" name="isdone" disabled />
          <span className={styles.checkmark}></span>
        </label>
        <input
          className={styles.inputText}
          type="text"
          name="taskname"
          placeholder="Task name"
          value={taskName}
          onChange={handleSetTaskName}
        />
      </form>
      <span>{requiredInfo}</span>

      <div className={styles.buttonsTask}>
        <Button type="button" name="cancel" onClick={handleDelTask} />
        <Button type="button" name="add" onClick={handleAddTask} />
      </div>
    </div>
  );
};

export default TasksList;
