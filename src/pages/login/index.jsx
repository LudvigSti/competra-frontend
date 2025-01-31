import { useState } from 'react';
// import useAuth from '../../hooks/useAuth';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import Snackbar from '../../components/common/snackbar';
import useSnackbar from '../../hooks/useSnackbar';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import './style.css';

const LoginPage = () => {
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [rememberMe, setRememberMe] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { onLogin } = useAuth();
	const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

	// MODAL TESTING
	const { openModal, setModal } = useModal();

	const onChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	// const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		// if (!validateInputs()) return;
		console.log("BACKEND URL: ", import.meta.env.VITE_BACKEND_URL);

		setIsSubmitting(true);

		try {
			await onLogin(formData);
		} catch (error) {
			console.error('Error during login:', error);
			showSnackbar('Invalid username or password.', 'error');
		} finally {
			setIsSubmitting(false);
		}
	};

	// MODAL TESTING
	const handleModal = () => {
		setModal('Modal title test', <h1>Modal content test</h1>);
		openModal();
	};

	// const handleLogin = (e) => {
	// 	e.preventDefault();
	// 	console.log('Login button clicked');
	// 	navigate('/dashboard');
	// 	// TODO: Replace with actual login logic when backend is ready
	// };

	return (
		<div className="login-container">
			<div className="login-box">
				<h1>Welcome to Competra</h1>

				<form onSubmit={handleLogin}>
					<div className="input-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={onChange}
							placeholder="Enter your username"
							required
						/>
					</div>

					<div className="input-group">
						<label htmlFor="password">Password</label>
						<div className="password-container">
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								value={formData.password}
								onChange={onChange}
								placeholder="Enter your password"
								required
							/>

							<button
								type="button"
								className="show-password-button"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
							</button>
						</div>
					</div>

					<div className="options-row">
						<label className="remember-me">
							<input
								type="checkbox"
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
							/>
							Remember me
						</label>

						<Link to="/" className="forgot-password-link">
							Forgot password?
						</Link>
					</div>

					<button
						type="submit"
						className="login-button"
						disabled={isSubmitting}>
						{isSubmitting ? 'Logging in...' : 'Log In'}
					</button>

					<Link to="/register" className="navigate-to-register">
						Create a new account?
					</Link>
				</form>

				<button onClick={handleModal}>Modal test</button>
			</div>

			{snackbar.isOpen && (
				<Snackbar
					message={snackbar.message}
					type={snackbar.type}
					onClose={closeSnackbar}
				/>
			)}
		</div>
	);
};

export default LoginPage;
