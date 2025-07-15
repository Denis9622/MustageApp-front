const TaskSearch = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Пошук по завданнях"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ marginLeft: 10 }}
  />
);

export default TaskSearch;