// useAuth.js (Новый файл)

import { createContext, useContext } from "react";
// 1. Импортируем AuthContext из файла AuthProvider

export const AuthContext = createContext(null);
// 2. Экспортируем хук отсюда
export const useAuth = () => {
	const context = useContext(AuthContext);

	// (Бонус: хорошая практика - проверять, что хук используется внутри провайдера)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
