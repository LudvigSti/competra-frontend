// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import GroupPage from './pages/group';
import CompetraDashboard from './pages/dashboard';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/dashboard" element={<CompetraDashboard />} />
				<Route path="/group/:groupId" element={<GroupPage />} />
			</Routes>
		</>
	);
}

export default App;
