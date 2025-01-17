import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, updateMovie } from '../../services/api'; // Импортируем функции getMovieById и updateMovie из api.js
import './EditMovie.css'; // Подключение стилей

const EditMovie = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actors, setActors] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [poster, setPoster] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        const movie = response.data;
        setTitle(movie.title);
        setDescription(movie.description);
        setActors(movie.actors.join(', '));
        setDirector(movie.director);
        setGenre(movie.genre.join(', '));
        setRating(movie.rating);
        setReleaseDate(movie.releaseDate);
        setPoster(movie.poster);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedMovie = {
      title,
      description,
      actors: actors.split(',').map(actor => actor.trim()),
      director,
      genre: genre.split(',').map(g => g.trim()),
      rating: parseFloat(rating), // Ensure this is a number
      releaseDate,
      poster,
    };
    try {
      await updateMovie(id, updatedMovie);
      setMessage('Movie updated successfully!');
      navigate(`/movie/${id}`); // Redirect to movie details page after update
    } catch (error) {
      console.error('Error updating movie:', error);
      setMessage('Error updating movie. Please try again.');
    }
  };

  return (
    <div className="edit-movie">
      <h1>Edit Movie</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="edit-movie__form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Actors (comma separated)"
          value={actors}
          onChange={e => setActors(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={e => setDirector(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre (comma separated)"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={e => setRating(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Release Date"
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Poster (URL)"
          value={poster}
          onChange={e => setPoster(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMovie;
