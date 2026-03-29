import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import type { Movie } from '../../types/movie';

import SearchBar from '../SearchBar/SearchBar';
import getMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './App.module.css';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const closeModal = () => setSelectedMovie(null);

  const handlerSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const newMovies = await getMovies(query);

      if (newMovies.length < 1) {
        setMovies([]);
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(newMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handlerSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies && <MovieGrid onSelect={setSelectedMovie} movies={movies} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
