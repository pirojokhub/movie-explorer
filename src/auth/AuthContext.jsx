import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext } from './context';

// export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // 🔹 Получаем сессию при старте и слушаем изменения
  useEffect(() => {
    let mounted = true;

    // Проверка активной сессии при старте
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const session = data?.session ?? null;
      setUser(session?.user ?? null);
      setIsAuth(!!session);
    });

    // Подписка на события аутентификации
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsAuth(!!session);
      }
    );

    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  // 🔹 Вход
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    setUser(data.user);
    setIsAuth(true);
    return data.user;
  };

  // 🔹 Регистрация
  const signUp = async (email, password, profileData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: profileData },
    });

    if (error) throw new Error(error.message);

    const newUser = data.user;
    if (!newUser) {
      // Почта требует подтверждения
      return { registered: true, message: 'Проверьте почту для подтверждения' };
    }

    // Создаём профиль, если нужно
    if (profileData && Object.keys(profileData).length > 0) {
      await supabase.from('profiles').insert({
        user_id: newUser.id,
        ...profileData,
      });
    }

    setUser(newUser);
    setIsAuth(true);
    return newUser;
  };

  // 🔹 Выход
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuth(false);
  };

  const value = useMemo(
    () => ({ isAuth, user, setIsAuth, setUser, signIn, signUp, signOut }),
    [isAuth, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
