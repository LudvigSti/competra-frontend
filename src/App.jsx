// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import GroupPage from './pages/group';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* TODO: Link to dashboard page when done and protect route (user needs to be logged in) */}
				<Route path="/dashboard" />
				<Route path="/group/:id" element={<GroupPage />} />
			</Routes>
		</>
	);
}

export default App;
