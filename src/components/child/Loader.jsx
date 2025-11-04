import "./loader.scss";

export default function Loader() {
	return (
		<div className="loader">
			<div className="loader__ring"></div>
			<p className="loader__text">Загрузка фильмов...</p>
		</div>
	);
}
