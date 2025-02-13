import axios from "axios";

const API_BASE_URL = 'https://filmsapp-back-env.up.railway.app/api/films';

export const getMovies = () => {
  return axios.get(API_BASE_URL);
};

export const getMovieById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const addMovie = (movie) => {
  return axios.post(API_BASE_URL, movie);
};

export const updateMovie = (id, updatedMovie) => {
  return axios.put(`${API_BASE_URL}/${id}`, updatedMovie);
};

export const deleteMovie = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
