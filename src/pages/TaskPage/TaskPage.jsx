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
    let countdown;
    if (status === "loading") {
      setTimer(60); // сбросить таймер при начале загрузки
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [status]);

  return (
    <div className={styles.pageContainer}>
      <h1>Завдання</h1>
      <TaskForm className={styles.form} />
      <div className={styles.filterSearch}>
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskSearch search={search} setSearch={setSearch} />
      </div>
      {/* Таймер-оверлей только если нет подключения */}
      {status !== "succeeded" && timer > 0 && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            Очікування підключення... {timer}с
          </div>
        </div>
      )}
      <TaskList filter={filter} search={search} />
    </div>
  );
};

export default TaskPage;