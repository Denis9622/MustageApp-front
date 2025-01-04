import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const saveFavorites = favorites => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: loadFavorites(), 
  },
  reducers: {
    addToFavorites: (state, action) => {
      const camper = action.payload;
      const isAlreadyFavorite = state.list.some(fav => fav.id === camper.id);
      if (!isAlreadyFavorite) {
        state.list.push(camper);
        saveFavorites(state.list); 
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.list = state.list.filter(camper => camper.id !== camperId);
      saveFavorites(state.list); 
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
