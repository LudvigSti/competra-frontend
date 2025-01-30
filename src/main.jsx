import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { ModalProvider } from './context/modal.jsx';
import Modal from './components/common/modal/index.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ModalProvider>
					<App />
					<Modal />
				</ModalProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
