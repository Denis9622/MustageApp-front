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
  const movies = useSelector(state => state.films.films);
  const status = useSelector(state => state.films.status);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [timer, setTimer] = useState(60); // старт с 60 секунд
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFilms());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'loading' && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [status, timer]);

  const filteredMovies = Array.isArray(movies)
    ? movies
        .filter(movie => (showFavorites ? movie.isFavorite : true))
        .filter(movie => movie.title.toLowerCase().includes(searchQuery))
        .filter(movie =>
          filter ? movie.genre.some(genre => genre.includes(filter)) : true
        )
        .sort((a, b) => (sort === 'rating' ? b.rating - a.rating : 0))
    : [];

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        handleSearch={e => setSearchQuery(e.target.value.toLowerCase())}
        handleAddMovie={() => navigate('/add')}
      />
      <div className={styles.movieList}>
        {status === 'loading' && (
          <p className={styles.loading}>
            Loading database, please wait...{' '}
            {timer > 0 ? `${timer}s` : 'Timeout!'}
          </p>
        )}
        {status === 'failed' && (
          <p className={styles.error}>
            Error loading movies. Please try again later.
          </p>
        )}
        {status === 'succeeded' && (
          <>
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
                  key={movie._id || movie.id}
                  movie={movie}
                  className={styles.movieCard}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieList;
