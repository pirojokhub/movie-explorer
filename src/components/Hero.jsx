import { useState, useEffect, useMemo } from "react";
import Loader from "./child/Loader";
import Pagination from "./child/Pagination";
function Hero({
	moviesPopular,
	isLoading,
	error,
	movies,
	favorites,
	toggleFavotites,
}) {
	//---- Пагинация
	const [currentPage, setCurrentPage] = useState(1);
	let perPage = 6;

	const totalPages = Math.max(1, Math.ceil(movies.length / perPage));
	useEffect(() => {
		setCurrentPage(1);
	}, [movies.length]);

	useEffect(() => {
		if (currentPage > totalPages) setCurrentPage(totalPages);
	}, [totalPages, currentPage]);

	const pageMovies = useMemo(() => {
		const start = (currentPage - 1) * perPage;
		return movies.slice(start, start + perPage);
	}, [movies, currentPage, perPage]);

	if (isLoading) return <Loader />;
	if (error) return <div style={{ color: "crimson" }}>{error}</div>;
	if (!moviesPopular.length) return <div>Пока нет фильмов</div>;

	const imgBase = "https://image.tmdb.org/t/p/w342";
	const fallback = "/no-poster.png"; // или любая твоя картинка-заглушка
	console.log(favorites);
	return (
		<section className="hero">
			<div className="hero-wrapper">
				{pageMovies.map((m) => (
					<div className="movies-card" key={m.id}>
						<img
							src={
								m.backdrop_path
									? `${imgBase}${m.backdrop_path}`
									: fallback
							}
							alt=""
						/>
						<div className="movies-card__title">
							<h2>{m.title}</h2>
							<button
								className="movies-card__favourites_btn"
								onClick={() => toggleFavotites(m)}
							>
								<svg
									width="12"
									height="12"
									viewBox="0 0 10 9"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M7.27273 0C6.27273 0 5.54545 0.523077 5 1.08974C4.45455 0.566667 3.72727 0 2.72727 0C1.13636 0 0 1.2641 0 2.83333C0 3.61795 0.318182 4.31538 0.909091 4.79487L5 8.5L9.09091 4.79487C9.63636 4.27179 10 3.61795 10 2.83333C10 1.2641 8.86364 0 7.27273 0Z"
										// fill="#FF3055"
										fill={
											favorites.some(
												(fav) => fav.id === m.id
											)
												? "#FF4D4F"
												: "#B3C0D2"
										}
									/>
								</svg>
							</button>
						</div>
						<div className="line"></div>
						<div className="movies-card__time">
							<span>{m.popularity}</span>
							<svg
								width="18"
								height="18"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 4.03906C6.17879 4.03906 2.71351 6.12968 0.15649 9.52541C-0.0521632 9.80361 -0.0521632 10.1923 0.15649 10.4705C2.71351 13.8703 6.17879 15.9609 10 15.9609C13.8212 15.9609 17.2865 13.8703 19.8435 10.4746C20.0522 10.1964 20.0522 9.8077 19.8435 9.5295C17.2865 6.12968 13.8212 4.03906 10 4.03906ZM10.2741 14.1976C7.73755 14.3572 5.64284 12.2665 5.80239 9.72588C5.93331 7.63117 7.63118 5.9333 9.72589 5.80238C12.2625 5.64283 14.3572 7.73345 14.1976 10.2741C14.0626 12.3647 12.3647 14.0626 10.2741 14.1976ZM10.1473 12.2584C8.78081 12.3443 7.65163 11.2192 7.74164 9.85271C7.81119 8.72353 8.72763 7.81118 9.85681 7.73754C11.2233 7.65162 12.3525 8.77671 12.2625 10.1432C12.1888 11.2765 11.2724 12.1888 10.1473 12.2584Z"
									fill="#B3C0D2"
								/>
							</svg>
						</div>
					</div>
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				paginate={setCurrentPage}
			/>
		</section>
	);
}
export default Hero;
