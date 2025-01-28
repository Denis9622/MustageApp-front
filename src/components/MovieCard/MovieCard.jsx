import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/filmsSlice';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.movieItem}>
      <Link to={`/movie/${movie._id}`} className={styles.movieLink}>
        <img
          src={movie.poster}
          alt={`${movie.title} Poster`}
          className={styles.moviePoster}
        />
        <div className={styles.movieDetails}>
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
      <button
        onClick={() => dispatch(toggleFavorite(movie._id))}
        className={styles.movieItemButton}
      >
        {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </li>
  );
};

export default MovieCard;
