import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, deleteMovie } from '../../services/api';
import styles from './MovieDetails.module.css'; 

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Failed to load movie details. Please try again later.');
      }
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteMovie(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError('Failed to delete movie. Please try again later.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <a className={styles.go_back} href="/">
        Go back
      </a>
      <h1>{movie.title}</h1>
      <img
        src={movie.poster}
        alt={movie.title}
        className={styles.moviePoster}
      />
      <p>{movie.description}</p>
      <p>
        <strong>Actors:</strong> {movie.actors.join(', ')}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre.join(', ')}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p>
        <strong>Release Date:</strong>{' '}
        {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
      <button onClick={() => navigate(`/edit/${id}`)} className={styles.button}>
        Edit
      </button>
      <button onClick={handleDelete} className={styles.button}>
        Delete
      </button>
    </div>
  );
};

export default MovieDetails;
