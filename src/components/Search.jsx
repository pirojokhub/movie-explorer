import { useState, useEffect } from "react";
import ModalsGenres from "./child/ModalsGenres";

function SearchMovies({
	movieName,
	setMovieName,
	selectedGenres,
	setSelectedGenres,
	handleClick,
}) {
	const key = import.meta.env.VITE_TMDB_KEY;

	//---- Запрос на данные(жанры)
	const [genres, setGenres] = useState([]);
	useEffect(() => {
		const Debounce = setTimeout(() => {
			fetch(
				`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ru-RU`
			)
				.then((res) => {
					if (!res.ok) throw Error("Ошибка при отброжений жанров");
					return res.json();
				})
				.then((data) => setGenres(data.genres));
		}, 600);
		return () => clearTimeout(Debounce);
	}, []);

	//---- Это часть Модалки
	const [isModals, setIsModals] = useState(false);
	const isOpen = () => {
		setIsModals(true);
	};
	const isClose = () => {
		setIsModals(false);
	};
	return (
		<section className="search" aria-labelledby="genres-heading">
			<div className="search-wrapper">
				<label htmlFor="movie-query" className="sr-only">
					Поиск фильмов
				</label>
				<input
					id="movie-query"
					className="search__input"
					type="search"
					placeholder="Фильм"
					autoComplete="off"
					value={movieName}
					onChange={(e) => setMovieName(e.target.value)}
				/>
				<button
					className="search__searchBtn"
					type="button"
					aria-label="Найти"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden
					>
						<path
							d="M21 21l-4.2-4.2"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<circle
							cx="11"
							cy="11"
							r="7"
							stroke="currentColor"
							strokeWidth="2"
						/>
					</svg>
				</button>
			</div>
			{/* Чипы топ‑жанров */}
			<div
				className="search__chips"
				role="toolbar"
				aria-label="Топ жанры"
			>
				{genres.slice(0, 7).map((g) => (
					<button
						key={g.id}
						type="button"
						className={`search__chip ${
							selectedGenres.includes(g.id) ? "active" : ""
						}`}
						onClick={() => handleClick(g.id)}
					>
						{g.name}
					</button>
				))}

				<button
					type="button"
					className="search__chip search__chip--all "
					aria-haspopup="dialog"
					aria-expanded={isModals} 
					onClick={isOpen}
				>
					<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
						<path
							d="M3 6h18M3 12h18M3 18h18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
					Все жанры
				</button>
			</div>
			<ModalsGenres
				close={isClose}
				open={isModals}
				genresAll={genres}
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
			/>
			<div className="line"></div>
		</section>
	);
}
export default SearchMovies;
