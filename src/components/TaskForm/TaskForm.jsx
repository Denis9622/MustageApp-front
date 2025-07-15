import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux/tasksSlice";
import styles from './TaskForm.module.css';

const TaskForm = ({ editTask, onSuccess }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editTask ? editTask.title : "");
  const [description, setDescription] = useState(editTask ? editTask.description : "");
  const [status, setStatus] = useState(editTask ? editTask.status : "undone");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      dispatch(updateTask({ id: editTask._id, task: { title, description, status } })).then(onSuccess);
    } else {
      dispatch(addTask({ title, description, status })).then(() => {
        setTitle("");
        setDescription("");
        setStatus("undone");
        if (onSuccess) onSuccess();
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="undone">Не виконано</option>
        <option value="done">Виконано</option>
      </select>
      <button className={styles.button} type="submit">{editTask ? "Зберегти" : "Додати"}</button>
    </form>
  );
};

export default TaskForm;