import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

export default function ForgotPage() {
  const { resetPassword, authError } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handle(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await resetPassword(email);
      alert('Мы отправили письмо для сброса пароля (если email существует)');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card stack">
        <h2>Забыли пароль</h2>
        <form onSubmit={handle} className="stack">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn" disabled={isLoading}>
            {isLoading ? 'Отправляем...' : 'Отправить ссылку'}
          </button>
        </form>
        {authError && <p className="err">{authError}</p>}
        <div className="row">
          <Link className="link" to="/login">
            Назад ко входу
          </Link>
        </div>
      </div>
    </div>
  );
}
