import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";
import { AuthContext } from "./useAuth";
// export const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const [authError, setAuthError] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function init() {
			try {
				setIsAuthLoading(true);
				const { data, error } = await supabase.auth.getSession();
				if (error) throw error;
				if (!mounted) return;
				setSession(data.session ?? null);
				setUser(data.session?.user ?? null);
			} catch (e) {
				if (mounted) setAuthError(e.message);
			} finally {
				if (mounted) setIsAuthLoading(false);
			}
		}
		init();

		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s ?? null);
			setUser(s?.user ?? null);
		});

		return () => {
			mounted = false;
			sub.subscription?.unsubscribe?.();
		};
	}, []);

	async function signUp(email, password, profileData = {}) {
		setAuthError(null);
		const redirect =
			(import.meta.env.VITE_SITE_URL || window.location.origin) +
			"/reset";
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: profileData, emailRedirectTo: redirect },
		});
		if (error) {
			setAuthError(error.message);
			throw error;
		}
		return data;
	}

	async function signIn(email, password) {
		setAuthError(null);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			setAuthError(error.message);
			throw error;
		}
		return data;
	}

	async function signOut() {
		setAuthError(null);
		const { error } = await supabase.auth.signOut();
		if (error) {
			setAuthError(error.message);
			throw error;
		}
	}

	async function resetPassword(email) {
		setAuthError(null);
		const redirect =
			(import.meta.env.VITE_SITE_URL || window.location.origin) +
			"/reset";
		const { data, error } = await supabase.auth.resetPasswordForEmail(
			email,
			{ redirectTo: redirect }
		);
		if (error) {
			setAuthError(error.message);
			throw error;
		}
		return data;
	}

	async function updatePassword(newPassword) {
		setAuthError(null);
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword,
		});
		if (error) {
			setAuthError(error.message);
			throw error;
		}
		return data;
	}

	const value = useMemo(
		() => ({
			session,
			user,
			isAuthLoading,
			authError,
			signUp,
			signIn,
			signOut,
			resetPassword,
			updatePassword,
		}),
		[session, user, isAuthLoading, authError]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
