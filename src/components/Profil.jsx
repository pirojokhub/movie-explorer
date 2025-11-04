import { useState } from "react";

function Profil() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("Users");
	const handleSubmit = (event) => {
		event.preventDefault();
		setName("Users");
	};

	return (
		<>
			<form className="profile-form" onSubmit={handleSubmit}>
				<h2 className="profile-form__title">Привет {name}</h2>

				<div className="profile-form__group">
					<label htmlFor="email" className="profile-form__label">
						Имя
					</label>
					<input
						type="text"
						className="profile-form__input"
						placeholder={name}
					/>
				</div>
				<div className="line-1"></div>

				<div className="profile-form__group">
					<label htmlFor="password" className="profile-form__label">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="profile-form__input"
						placeholder="example@mail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<button type="submit" className="profile-form__button">
					Редактировать
				</button>
				<button type="submit" className="profile-form__button_exit">
					Выйти из аккаунта
				</button>
			</form>
		</>
	);
}
export default Profil;
