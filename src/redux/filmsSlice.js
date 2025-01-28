import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Загрузка избранных фильмов из localStorage
const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

export const fetchFilms = createAsyncThunk('films/fetchFilms', async () => {
  const response = await axios.get(
    'https://filmsapp-back.onrender.com/api/films'
  );
  return response.data;
});

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    favorites: savedFavorites, // Инициализация избранных фильмов
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const film = state.films.find(film => film._id === action.payload);
      if (film) {
        film.isFavorite = !film.isFavorite;
        // Обновление избранных фильмов в state и localStorage
        if (film.isFavorite) {
          state.favorites.push(film._id);
        } else {
          state.favorites = state.favorites.filter(id => id !== film._id);
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.films = action.payload.map(film => ({
            ...film,
            isFavorite: state.favorites.includes(film._id),
          }));
        } else {
          state.films = [];
          state.error = 'Data received is not an array';
        }
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = filmsSlice.actions;
export default filmsSlice.reducer;
