import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux/tasksSlice";

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
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="undone">Не виконано</option>
        <option value="done">Виконано</option>
      </select>
      <button type="submit">{editTask ? "Зберегти" : "Додати"}</button>
    </form>
  );
};

export default TaskForm;