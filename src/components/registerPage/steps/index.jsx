/* eslint-disable react/prop-types */
import './steps.css';

const Steps = ({ maxSteps, currentStep = 0 }) => {
	return (
		<ul className="steps">
			{[...Array(maxSteps)].map((_, i) => (
				<li className={`steps-number ${currentStep === i && 'active'}`} key={i}>
					<span className="text-white">{i + 1}</span>
				</li>
			))}
		</ul>
	);
};

export default Steps;
