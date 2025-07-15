import { useState } from 'react';
import styles from './TaskSearch.module.css';

const TaskSearch = ({ search, setSearch }) => (
  <input
    className={styles.input}
    type="text"
    placeholder="Пошук по завданнях"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
);

export default TaskSearch;