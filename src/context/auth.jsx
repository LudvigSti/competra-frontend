/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { logInUser, registerUser } from '../service/apiClient';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [token, setToken] = useState(null);
	const [loggedInUserId, setLoggedInUserId] = useState(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedUserId = localStorage.getItem('loggedInUserId');

		if (storedToken) {
			setToken(storedToken);
		}

		if (storedUserId) {
			setLoggedInUserId(parseInt(storedUserId, 10));
		}
	}, []);

	useEffect(() => {
		if (token) {
			const redirectPath = localStorage.getItem('redirectPath');

			if (redirectPath) {
				localStorage.removeItem('redirectPath');
				navigate(redirectPath);
			}
		}
	}, [token, navigate]);

	const handleLogin = async (data) => {
		const res = await logInUser(data);

		if (!res.token) {
			return navigate('/');
		}

		localStorage.setItem('token', res.token);
		setToken(res.token);

		const decodedToken = jwtDecode(res.token);
		const userId = parseInt(decodedToken.sub, 10);
		setLoggedInUserId(userId);
		localStorage.setItem('loggedInUserId', userId);

		localStorage.setItem('redirectPath', '/dashboard');

		navigate('/dashboard');
	};

	const handleRegister = async (data) => {
		const res = await registerUser(data);

		if (!res.token) {
			return navigate('/register');
		}

		localStorage.setItem('token', res.token);
		setToken(res.token);

		const decodedToken = jwtDecode(res.token);
		const userId = parseInt(decodedToken.sub, 10);
		setLoggedInUserId(userId);
		localStorage.setItem('loggedInUserId', userId);

		localStorage.setItem('redirectPath', '/dashboard');
		navigate('/dashboard');
	};

	const value = {
		token,
		loggedInUserId,
		onLogin: handleLogin,
		onRegister: handleRegister,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
	const { token } = useAuth();
	const location = useLocation();

	if (!token) {
		if (!localStorage.getItem('redirectPath')) {
			localStorage.setItem('redirectPath', location.pathname);
		}

		return <Navigate to="/" replace state={{ from: location }} />;
	}

	return children;
};

export { AuthContext, AuthProvider, ProtectedRoute };
