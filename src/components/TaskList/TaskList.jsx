import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../../redux/tasksSlice";
import TaskForm from "../TaskForm/TaskForm";

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
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: 10 }}>
            <b>{task.title}</b> — {task.description} [{task.status === "done" ? "Виконано" : "Не виконано"}]
            <button onClick={() => handleToggleStatus(task)} style={{ marginLeft: 10 }}>
              {task.status === "done" ? "Зробити невиконаним" : "Зробити виконаним"}
            </button>
            <button onClick={() => handleEdit(task)} style={{ marginLeft: 10 }}>
              Редагувати
            </button>
            <button onClick={() => handleDelete(task._id)} style={{ marginLeft: 10, color: "red" }}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;