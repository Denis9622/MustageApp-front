import styles from './FilterBar.module.css'; // Импортируем стили как модуль

const FilterBar = ({
  searchQuery,
  handleSearch,
  showFavorites,
  setShowFavorites,
  filter,
  setFilter,
  sort,
  setSort,
  handleAddMovie,
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
      </div>
      <div className={styles.filtersright}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.input}
        />

        <button onClick={handleAddMovie} className={styles.button}>
          Add Movie
        </button>
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
