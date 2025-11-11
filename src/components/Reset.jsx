import { useState } from 'react';
import { useAuth } from '../auth/useAuth';

export default function ResetPage() {
  const { updatePassword, authError } = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handle(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await updatePassword(password);
      alert('Пароль обновлён. Теперь можно войти.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card stack">
        <h2>Новый пароль</h2>
        <form onSubmit={handle} className="stack">
          <input
            className="input"
            type="password"
            placeholder="Введите новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn" disabled={loading}>
            {loading ? 'Сохраняем...' : 'Сохранить'}
          </button>
        </form>
        {authError && <p className="err">{authError}</p>}
        <p className="s">
          Эта страница должна совпадать с Redirect URL в настройках Supabase
          (…/reset)
        </p>
      </div>
    </div>
  );
}
