// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</>
	);
}

export default App;
