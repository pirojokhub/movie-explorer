import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

function Profil() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  const [name, setName] = useState('Users');
  const handleSubmit = (event) => {
    event.preventDefault();
    setName('Users');
  };

  const handleClick = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="profile-form__title">Привет {name}</h2>

        <div className="profile-form__group">
          <label htmlFor="text" className="profile-form__label">
            Имя
          </label>
          <input
            type="email"
            id="email"
            className="profile-form__input"
            placeholder="Имя"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="line-1"></div>
        <div className="profile-form__group">
          <label htmlFor="email" className="profile-form__label">
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
        {/* <button type="submit" className="profile-form__button">
          Редактировать
        </button> */}
        <button
          type="submit"
          className="profile-form__button_exit"
          onClick={handleClick}
        >
          Выйти из аккаунта
        </button>
      </form>
    </>
  );
}
export default Profil;
