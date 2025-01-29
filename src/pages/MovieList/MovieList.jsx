import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFilms } from '../../redux/filmsSlice';
import FilterBar from '../../components/FilterBar/FilterBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import Header from '../../components/Header/Header';
import styles from './MovieList.module.css';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.films.films) || [];
  const status = useSelector(state => state.films.status);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFilms());
    }
  }, [status, dispatch]);

  const handleSearch = event => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleAddMovie = () => {
    navigate('/add', { state: { movies } }); // Передаём список фильмов
  };

  const filteredMovies = Array.isArray(movies)
    ? movies
        .filter(movie => (showFavorites ? movie.isFavorite : true))
        .filter(movie => movie.title.toLowerCase().includes(searchQuery))
        .filter(movie =>
          filter ? movie.genre.some(genre => genre.includes(filter)) : true
        )
        .sort((a, b) => {
          if (sort === 'rating') {
            return b.rating - a.rating;
          }
          return 0;
        })
    : [];

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleAddMovie={handleAddMovie}
      />
      <div className={styles.movieList}>
        {status === 'failed' && (
          <p className={styles.error}>
            Failed to fetch movies. Please try again later.
          </p>
        )}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />
        <ul className={styles.movieListItems}>
          {filteredMovies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              className={styles.movieCard}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
