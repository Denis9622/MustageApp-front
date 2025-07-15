const TaskFilter = ({ filter, setFilter }) => (
  <select value={filter} onChange={e => setFilter(e.target.value)}>
    <option value="">Всі</option>
    <option value="done">Виконані</option>
    <option value="undone">Невиконані</option>
  </select>
);

export default TaskFilter;