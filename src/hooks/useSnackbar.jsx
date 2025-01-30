import { useState } from 'react';

export default function useSnackbar() {
	const [snackbar, setSnackbar] = useState({
		message: '',
		type: '',
		isOpen: false,
	});

	const showSnackbar = (message, type = 'info') => {
		setSnackbar({ message, type, isOpen: true });
	};

	const closeSnackbar = () => {
		setSnackbar({ ...snackbar, isOpen: false });
	};

	return { snackbar, showSnackbar, closeSnackbar };
}
