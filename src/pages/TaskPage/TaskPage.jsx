import { useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import TaskSearch from "../../components/TaskSearch/TaskSearch";
import styles from "./TaskPage.module.css";

const TaskPage = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className={styles.pageContainer}>
      <h1>Завдання</h1>
      <TaskForm className={styles.form} />
      <div className={styles.filterSearch}>
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskSearch search={search} setSearch={setSearch} />
      </div>
      <TaskList filter={filter} search={search} />
    </div>
  );
};

export default TaskPage;