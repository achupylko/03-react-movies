import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default async function getMovies(query: string, page: number = 1) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const { data } = await axios.get(`${URL}&${query}&page=${page}`, options);

  return data;
}
