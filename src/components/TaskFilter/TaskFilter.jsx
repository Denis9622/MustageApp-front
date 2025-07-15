import styles from './TaskFilter.module.css';

const TaskFilter = ({ filter, setFilter }) => (
  <select
    className={styles.select}
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="">Всі</option>
    <option value="done">Виконано</option>
    <option value="undone">Не виконано</option>
  </select>
);

export default TaskFilter;