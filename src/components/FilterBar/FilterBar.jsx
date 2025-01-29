import styles from './FilterBar.module.css';

const FilterBar = ({
   showFavorites,
  setShowFavorites,
  filter,
  setFilter,
  sort,
  setSort,
}) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        <p>Filters:</p>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={styles.select}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Adventure">Adventure</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className={styles.select}
        >
          <option value="">No Sorting</option>
          <option value="rating">By Rating</option>
        </select>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={styles.button}
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
