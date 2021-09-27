import { useDispatch } from "react-redux";
import { editSet, setTask } from "../../data/actions";
import styles from "./listItem.module.scss";

const ListItem = (item) => {
  const { name, task, created_at } = item.item;

  const dispatch = useDispatch();

  const dataOfCreated = created_at.toLocaleString().slice(0, 10);

  let numberOfCompleted = 0;

  task.forEach((item) => {
    if (item.isDone) {
      numberOfCompleted++;
    }
  });

  let numberOfUncompleted = task.length - numberOfCompleted;

  const handleOpenModal = () => {
    dispatch(editSet([item.item]));
    task.map((item) => dispatch(setTask(item)));
  };

  return (
    <div className={styles.itemWrapper} onClick={handleOpenModal}>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
      <div className={styles.create}>
        <p>Created at: {dataOfCreated}</p>
      </div>
      <div className={styles.details}>
        <p>Completed: {numberOfCompleted}</p>
        <p>Uncompleted: {numberOfUncompleted}</p>
        <p>All: {task.length}</p>
      </div>
    </div>
  );
};

export default ListItem;
