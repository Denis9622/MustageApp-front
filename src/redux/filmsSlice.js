import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilms = createAsyncThunk('films/fetchFilms', async () => {
  const response = await axios.get('http://localhost:5000/api/films');
  return response.data;
});

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const film = state.films.find(film => film._id === action.payload);
      if (film) {
        film.isFavorite = !film.isFavorite;
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
          state.films = action.payload;
        } else {
          state.films = [];
          state.error = 'Данные получены не в виде массива';
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
