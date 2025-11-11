import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(form);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(form.email, form.password, { name: form.name });
      navigate('/profile');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 19C0 8.50659 8.50659 0 19 0C29.4934 0 38 8.50659 38 19C38 29.4934 29.4934 38 19 38C8.50659 38 0 29.4934 0 19Z"
          fill="#2BE080"
        />
        <path
          d="M26.3752 11H11.6248C10.1751 11 9 12.212 9 13.7061V21.203C9 21.3421 9.01022 21.4788 9.03025 21.6124C9.00974 21.8121 9 22.014 9 22.2178C9 26.5151 13.4769 30 18.9999 30C24.5229 30 29 26.5151 29 22.2178C29 22.0139 28.9893 21.8121 28.9697 21.6124C28.9893 21.4789 29 21.3421 29 21.203V13.7062C29 12.2116 27.8236 11 26.3752 11Z"
          fill="white"
        />
      </svg>
      <h2 className="login-form__title">Добро пожаловать!</h2>

      <div className="login-form__group">
        <label htmlFor="email" className="login-form__label">
          Имя
        </label>
        <input
          type="text"
          name="name"
          className="login-form__input"
          placeholder="Имя"
          value={form.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="login-form__group">
        <label htmlFor="email" className="login-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="login-form__input"
          placeholder="example@mail.com"
          value={form.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="login-form__group">
        <label htmlFor="password" className="login-form__label">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="login-form__input"
          placeholder="• • • • • • • •"
          // 4. Связываем инпут с состоянием
          value={form.password}
          onChange={onChange}
          minLength={8}
          required
        />
        <small className="login-form__hint">Минимум 8 символов.</small>
      </div>

      <button className="login__btn" disabled={isLoading}>
        {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
      </button>
      {/* {authError && <p className="err">{authError}</p>} */}
      <div className="row">
        <Link className="link" to="/login">
          У меня уже есть аккаунт
        </Link>
      </div>
    </form>
  );
}

export default Register;
