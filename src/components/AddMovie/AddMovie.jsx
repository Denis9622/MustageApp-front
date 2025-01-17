import { useState } from 'react';
import { addMovie } from '../../services/api'; // Импортируем функцию addMovie из api.js
import './AddMovie.css'; // Подключение стилей

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actors, setActors] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [poster, setPoster] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const movie = {
      title,
      description,
      actors: actors.split(',').map(actor => actor.trim()),
      director,
      genre: genre.split(',').map(g => g.trim()),
      rating: Number(rating),
      releaseDate,
      poster,
    };
    try {
      await addMovie(movie);
      setMessage('Movie added successfully!');
    } catch (error) {
      console.error('Error adding movie:', error);
      setMessage('Error adding movie. Please try again.');
    }
  };

  return (
    <div className="add-movie">
      <h1 >Add Movie</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="add-movie__form">
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddMovie;
