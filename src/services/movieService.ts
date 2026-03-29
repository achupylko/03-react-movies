import axios from 'axios';
import type { Movie } from '../types/movie';

const URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export default async function getMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<Movie[]>(`${URL}?${query}`, options);
  return response.data;
}
