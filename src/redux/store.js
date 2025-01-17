import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "./filmsSlice";

const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
});

export default store;
