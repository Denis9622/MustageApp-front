import styles from './Header.module.css';

const Header = ({
  searchQuery,
  handleSearch,
  handleAddMovie,
}) => {
  return (
    <div className={styles.searchcgcontainer}>
        <h1>Films</h1>
      <div className={styles.gapmob}>
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
        
      </div>
    </div>
  );
};

export default Header;
