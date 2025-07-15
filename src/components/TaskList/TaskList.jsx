import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../../redux/tasksSlice";
import TaskForm from "../TaskForm/TaskForm";
import styles from './TaskList.module.css';

const TaskList = ({ filter, search }) => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks({ status: filter, search }));
  }, [dispatch, filter, search]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleStatus = (task) => {
    dispatch(updateTask({ id: task._id, task: { ...task, status: task.status === "done" ? "undone" : "done" } }));
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleEditSuccess = () => {
    setEditTask(null);
  };

  if (status === "loading") return <div>Завантаження...</div>;

  return (
    <div>
      {editTask && (
        <TaskForm editTask={editTask} onSuccess={handleEditSuccess} />
      )}
      {tasks.length === 0 && <div>Немає завдань</div>}
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} className={styles.item}>
            <div className={styles.info}>
              <span className={styles.title}>{task.title}</span>
              <span className={styles.desc}>{task.description}</span>
              <span className={`${styles.status} ${task.status === 'undone' ? styles.statusUndone : ''}`}>
                {task.status === "done" ? "Виконано" : "Не виконано"}
              </span>
            </div>
            <div className={styles.actions}>
              <button onClick={() => handleToggleStatus(task)} className={styles.button}>
                {task.status === "done" ? "Зробити невиконаним" : "Зробити виконаним"}
              </button>
              <button onClick={() => handleEdit(task)} className={`${styles.button} ${styles.editBtn}`}>
                Редагувати
              </button>
              <button onClick={() => handleDelete(task._id)} className={`${styles.button} ${styles.deleteBtn}`}>
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;