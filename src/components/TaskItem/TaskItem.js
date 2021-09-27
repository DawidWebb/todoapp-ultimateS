import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../data/actions";
import styles from "./taskItem.module.scss";

const TaskItem = ({ item, index, indexToDel, setIndexToDel }) => {
  const tasks = useSelector((store) => store.tasks);
  const name = tasks[index].name;
  const id = tasks[index].id;
  const dispatch = useDispatch();
  const [flagIsDone, setFlagIsDone] = useState(tasks[index].isDone);

  const handleChangeStatus = () => {
    setFlagIsDone(!flagIsDone);
    const data = {
      index: index,
      task: {
        id: id,
        name: name,
        isDone: !flagIsDone,
      },
    };
    dispatch(editTask(data));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    return;
  };

  const handleOnSetIndex = () => {
    setIndexToDel(index);
  };

  return (
    <div className={styles.taskWrapper}>
      <form onSubmit={handleOnSubmit}>
        <label className={styles.container}>
          <input
            type="checkbox"
            name="isdone"
            disabled={item.disabled}
            checked={flagIsDone}
            onChange={handleChangeStatus}
          />
          <span className={styles.checkmark}></span>
        </label>

        <input
          className={styles.inputText}
          type="text"
          readOnly
          value={name}
          onClick={handleOnSetIndex}
        />
      </form>
    </div>
  );
};

export default TaskItem;
