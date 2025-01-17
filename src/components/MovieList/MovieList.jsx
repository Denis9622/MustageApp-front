import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilms, toggleFavorite } from '../../redux/filmsSlice';
import './MovieList.css';

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
    navigate('/add');
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
    <div className="movie-list">
      <h1>Films</h1>
      {status === 'failed' && (
        <p>Failed to fetch movies. Please try again later.</p>
      )}
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
        <select onChange={e => setFilter(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Adventure">Adventure</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <select onChange={e => setSort(e.target.value)}>
          <option value="">No Sorting</option>
          <option value="rating">By Rating</option>
        </select>
      </div>
      <ul className="movie-list__items">
        {filteredMovies.map(movie => (
          <li key={movie._id} className="movie-item">
            <Link to={`/movie/${movie._id}`} className="movie-link">
              <img
                src={movie.poster}
                alt={`${movie.title} Poster`}
                className="movie-poster"
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>
                  <strong>Director:</strong> {movie.director || 'N/A'}
                </p>
                <p>
                  <strong>Year:</strong>{' '}
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).getFullYear()
                    : 'N/A'}
                </p>
                <p>
                  <strong>Genre:</strong>{' '}
                  {movie.genre && Array.isArray(movie.genre)
                    ? movie.genre.join(', ')
                    : 'N/A'}
                </p>
                <p>
                  <strong>Description:</strong> {movie.description || 'N/A'}
                </p>
                <p>
                  <strong>Actors:</strong>{' '}
                  {movie.actors && Array.isArray(movie.actors)
                    ? movie.actors.join(', ')
                    : 'N/A'}
                </p>
                <p>
                  <strong>Rating: </strong> {movie.rating || 'N/A'}/10
                </p>
              </div>
            </Link>
            <button onClick={() => dispatch(toggleFavorite(movie._id))}>
              {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
