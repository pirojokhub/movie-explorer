import { Link } from "react-router-dom";

function Navbar() {
	return (
		<>
			<nav className="nav-main">
				<ul className="nav-list">
					<li className="nav-item">
						<Link to={"/"}>
							<button className="nav-btn">Фильмы</button>
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/saved-movies"}>
							<button className="nav-btn">
								Сохранённые фильмы
							</button>
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/profile"}>
							<button className="nav-account">Аккаунт</button>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
export default Navbar;
