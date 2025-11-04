import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomaPages from "./components/Home";
import SaveMovies from "./components/SaveMovies";
import Profil from "./components/Profil";
import Login from "./components/Login";

import NotFounds from "./components/Not-fount";
import Header from "./components/Header";
import ForgotPage from "./components/ForgotPage";
import ResetPage from "./components/Reset";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

	const [moviesPopular, setMoviesPopular] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;

		fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=ru-RU&page=1`
		)
			.then((res) => {
				if (!res.ok) throw new Error("Ошибка при загрузке");
				return res.json();
			})
			.then((data) => {
				if (!ignore) setMoviesPopular(data.results || []);
			})
			.catch((err) => setError(err.message))
			.finally(() => setIsLoading(false));

		return () => (ignore = true);
	}, [TMDB_KEY]);

	//---- Избранное кнопка
	const [favorites, setFavorites] = useState([]);
	const toggleFavotites = (productItem) => {
		setFavorites((prevFavorites) =>
			prevFavorites.some((fav) => fav.id === productItem.id)
				? prevFavorites.filter((fav) => fav.id !== productItem.id)
				: [...prevFavorites, productItem]
		);
	};
	return (
		<div className="app-container">
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<HomaPages
							moviesPopular={moviesPopular}
							isLoading={isLoading}
							error={error}
							key={TMDB_KEY}
							favorites={favorites}
							toggleFavotites={toggleFavotites}
						/>
					}
				/>
				<Route
					path="/saved-movies"
					element={
						<ProtectedRoute>
							<SaveMovies
								favorites={favorites}
								toggleFavotites={toggleFavotites}
							/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profil />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFounds />} />
				<Route path="/forgot" element={<ForgotPage />} />
				<Route path="/reset" element={<ResetPage />} />
			</Routes>
		</div>
	);
}
export default App;
