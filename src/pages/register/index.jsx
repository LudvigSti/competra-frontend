/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import Snackbar from '../../components/common/snackbar';
// import useSnackbar from '../../hooks/useSnackbar';
import Stepper from '../../components/registerPage';
import ProfileImage from '../../components/common/profileImage';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import './style.css';

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		profileImage: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { onRegister } = useAuth();
	// const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData((prev) => ({ ...prev, profileImage: reader.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRegister = async () => {
		// if (!stepIsValid(0) || !stepIsValid(1)) {
		// 	return;
		// }
		setIsSubmitting(true);
		try {
			const payload = {
				username: formData.username,
				password: formData.password,
				// email: formData.email,
				// mobile: formData.mobile,
				// profileImage: formData.profileImage,
			};
			
			await onRegister(payload);
		} catch (error) {
			console.error('Error during register:', error);
			// showSnackbar('An error occurred. Please try again.', 'error');
		} finally {
			setIsSubmitting(false);
		}
	};

	// FIXME: Temporary validations, should be moved to service folder
	const stepIsValid = (currentStep) => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;

		switch (currentStep) {
			// Step 1
			case 0:
				if (!emailRegex.test(formData.email)) {
					newErrors.email = 'Invalid email format.';
				}

				if (formData.password.length < 8) {
					newErrors.password = 'Password must be at least 8 characters long.';
				}

				if (formData.password !== formData.confirmPassword) {
					newErrors.confirmPassword = 'Passwords do not match!';
				}

				break;

			// Step 2
			case 1:
				if (!usernameRegex.test(formData.username)) {
					newErrors.username = 'Must be alphanumeric and 3-15 characters.';
				}

				if (formData.username === '') {
					newErrors.username = 'Username cannot be empty.';
				}

				if (/\s/.test(formData.username)) {
					newErrors.username = 'Username cannot contain whitespace.';
				}

				if (formData.mobile.length !== 8) {
					newErrors.mobile = 'Mobile number must be 8 digits long.';
				}

				break;

			default:
				break;
		}

		setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
		return Object.keys(newErrors).length === 0;
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<Stepper
					header={<h2>Register account</h2>}
					onComplete={handleRegister}
					stepIsValid={stepIsValid}
					isSubmitting={isSubmitting}
					setErrors={setErrors}>
					{/* Step 1 */}
					<div>
						<div className="input-group">
							<label htmlFor="username">Username*</label>
							<input
								type="text"
								id="username"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								placeholder="Enter your username"
								required
							/>

							{/* {errors.email && <p className="error-message">{errors.email}</p>} */}
						</div>

						<div className="input-group">
							<label htmlFor="password">Password*</label>
							<div className="password-container">
								<input
									type={showPassword ? 'text' : 'password'}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
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

							{/* {errors.password && (
								<p className="error-message">{errors.password}</p>
							)} */}
						</div>

						<div className="input-group">
							<label htmlFor="confirmPassword">Confirm Password*</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								placeholder="Confirm your password"
								required
							/>
						</div>

						{/* {errors.confirmPassword && (
							<p className="error-message">{errors.confirmPassword}</p>
						)} */}
					</div>

					{/* Step 2 */}
					<div>
						<div className="input-group">
							<ProfileImage image={formData.profileImage} />

							<label htmlFor="profileImage">Profile Image</label>
							<input
								type="file"
								id="profileImage"
								accept="image/*"
								onChange={handleImageChange}
								className="file-input"
							/>
						</div>
					</div>
				</Stepper>

				<Link to="/" className="navigate-to-login">
					Already have an account?
				</Link>
			</div>

			{/* {snackbar.isOpen && (
				<Snackbar
					message={snackbar.message}
					type={snackbar.type}
					onClose={closeSnackbar}
				/>
			)} */}
		</div>
	);
};

export default RegisterPage;
