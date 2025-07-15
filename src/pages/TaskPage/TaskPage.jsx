import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "../../components/TaskList/TaskList";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import TaskSearch from "../../components/TaskSearch/TaskSearch";
import { fetchTasks } from "../../redux/tasksSlice";
import styles from "./TaskPage.module.css";

const TaskPage = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(60); // старт с 60 секунд

  const dispatch = useDispatch();
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks({ status: filter, search }));
    }
  }, [status, dispatch, filter, search]);

  useEffect(() => {
    if (status === "loading" && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [status, timer]);

  return (
    <div className={styles.pageContainer}>
      <h1>Завдання</h1>
      <TaskForm className={styles.form} />
      <div className={styles.filterSearch}>
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskSearch search={search} setSearch={setSearch} />
      </div>
      {status === "loading" && (
        <p style={{ color: "#3182ce", textAlign: "center" }}>
          Завантаження бази даних, зачекайте...{" "}
          {timer > 0 ? `${timer}с` : "Тайм-аут!"}
        </p>
      )}
      {status === "failed" && (
        <p style={{ color: "#e53e3e", textAlign: "center" }}>
          Помилка завантаження задач. Спробуйте пізніше.
        </p>
      )}
      <TaskList filter={filter} search={search} />
    </div>
  );
};

export default TaskPage;