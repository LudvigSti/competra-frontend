/* eslint-disable react/prop-types */
import './style.css';
import { useEffect } from 'react';

export default function Snackbar({ message, type, onClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return <div className={`snackbar ${type}`}>{message}</div>;
}
