/* eslint-disable react/prop-types */
import { useState } from 'react';
import Steps from './steps';
// import useSnackbar from '../../../hooks/useSnackbar';
// import Snackbar from '../../common/snackbar';
import './style.css';

const Stepper = ({
	header,
	children,
	onComplete,
	stepIsValid,
	isSubmitting,
	setErrors,
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	// const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

	const onBackClick = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const onNextClick = () => {
		// if (stepIsValid(currentStep)) {
		// 	if (currentStep === children.length - 1) {
		// 		onComplete();
		// 		return;
		// 	}

		// 	setCurrentStep(currentStep + 1);
		// 	setErrors({});
		// } else {
		// 	showSnackbar('Please fill out all required fields', 'error');
		// }

		if (currentStep === children.length - 1) {
			onComplete();
			return;
		}

		setCurrentStep(currentStep + 1);
	};

	return (
		<div>
			{header}
			<div className="steps-container">
				<Steps maxSteps={children.length} currentStep={currentStep} />
			</div>

			{children[currentStep]}

			<div className="stepper-buttons">
				{currentStep > 0 && (
					<button
						className="offwhite"
						onClick={onBackClick}
						disabled={isSubmitting}>
						Back
					</button>
				)}

				<button
					onClick={onNextClick}
					className="blue nextButton"
					disabled={isSubmitting}>
					{isSubmitting
						? 'Submitting...'
						: currentStep === children.length - 1
						? 'Submit'
						: 'Next'}
				</button>
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

export default Stepper;
