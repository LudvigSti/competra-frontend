import { useNavigate } from 'react-router-dom';
import './style.css';

const CompetraDashboard = () => {
	// Fake data
	const yourGroups = [
		{ name: 'Experis Academy', action: 'LEAVE' },
		{ name: 'Benkvarmere', action: 'LEAVE' },
	];

	const activeGroups = [{ name: 'Experis Salgsteam', action: 'JOIN' }];

	// TODO: Delete after standup
	const navigate = useNavigate();
	const standupRouting = () => {
		navigate('/group/1');
	};

	return (
		<div className="competra-dashboard">
			<h1>Competra Dashboard</h1>

			{/* Your Groups Section */}
			<div className="group-section">
				<h2>Your Groups</h2>
				<ul>
					{yourGroups.map((group, index) => (
						<li key={index} className="group-item">
							<span className="group-name" onClick={standupRouting}>
								{group.name}
							</span>
							<button className="group-action leave">{group.action}</button>
						</li>
					))}
				</ul>
			</div>

			{/* Active Groups Section */}
			<div className="group-section">
				<h2>Active Groups</h2>
				<ul>
					{activeGroups.map((group, index) => (
						<li key={index} className="group-item">
							<span className="group-name">{group.name}</span>
							<button className="group-action join">{group.action}</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CompetraDashboard;
