import { createContext } from 'react';
export const AuthContext = createContext({
  isAuth: false,
  user: null,
  setIsAuth: () => {},
  setUser: () => {},
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});
