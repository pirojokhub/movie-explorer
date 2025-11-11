import SearchMovies from './Search';
import Hero from './Hero';
import { useEffect, useState } from 'react';
// import ProtectedRoute from "./ProtectedRoute";

function HomaPages({
  moviesPopular,
  isLoading,
  error,
  favorites,
  toggleFavotites,
}) {
  const key = import.meta.env.VITE_TMDB_KEY;

  // Отфильтрованный по названию
  const [movieItem, setMovieItem] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [searItem, setsearItem] = useState(movieItem);

  useEffect(() => {
    const Debounce = setTimeout(() => {
      async function fetchAllMovies(pages) {
        let movieFull = [];

        try {
          for (let i = 1; i <= pages; i++) {
            const res = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=ru-RU&page=${i}`
            );
            const data = await res.json();
            movieFull.push(...(data.results || []));
          }
        } catch (error) {
          alert(error);
        }
        return movieFull;
      }
      fetchAllMovies().then((m) => {
        setMovieItem(m);
      });
      const filteredMovies = filterMovies(movieName, movieItem);
      setsearItem(filteredMovies);
    }, 300);
    return () => clearTimeout(Debounce);
  }, [movieName]);

  //---- Отфильтрованный по жанрам
  const [movieSelected, setMovieSelected] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${selectedGenres}&language=ru-RU`
    )
      .then((res) => {
        if (!res.ok) throw Error('Ошибка при отброжений жанров');
        return res.json();
      })
      .then((data) => setMovieSelected(data.results || []));
  }, [selectedGenres]);

  //---- Клик по жанрам
  const handleClick = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectedGenres((prev) => [...prev, id]);
    }
  };
  //---- Фильтрация по названию
  const filterMovies = (searchText, listOfCars) => {
    if (!searchText) return listOfCars;
    return listOfCars.filter(({ title }) =>
      title.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  ///--- Отфильтрованные филтмы по названию и жанрам
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    let movieAll = [...searItem, ...movieSelected];
    let filterDuble = movieAll.filter((m, i, self) => {
      return i === self.findIndex((item) => item.id === m.id);
    });
    setMovie(filterDuble);
  }, [searItem, movieSelected]);

  return (
    <>
      <SearchMovies
        movieName={movieName}
        setMovieName={setMovieName}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        handleClick={handleClick}
      />
      <Hero
        moviesPopular={moviesPopular}
        isLoading={isLoading}
        error={error}
        movies={movie}
        favorites={favorites}
        toggleFavotites={toggleFavotites}
      />
    </>
  );
}
export default HomaPages;
