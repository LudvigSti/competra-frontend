import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';
import { getUserGroupByUserId } from '../../service/apiClient';
import { jwtDecode } from 'jwt-decode';

const CompetraDashboard = () => {
	const [userGroups, setUserGroups] = useState([]);

	const decodedToken = jwtDecode(localStorage.getItem('token'));

	useEffect(() => {
		fetchUserGroups();
	}, []);

	const fetchUserGroups = async () => {
		const userGroups = await getUserGroupByUserId(parseInt(decodedToken.sub, 10));
		setUserGroups(userGroups);
	}

	const activeGroups = [{ name: 'Experis Salgsteam', action: 'JOIN' }];

	const navigate = useNavigate();

	const handleGroupClick = (id) => {
		navigate(`/group/${id}`);
	}

	const handleGroupLeave = (id) => {
		// FIXME: Replace with real endpoint when backend is done
		console.log("left group with id: ", id);
	}

	//const handleGroupJoin 

	return (
		<div className="competra-dashboard">
			<h1>Competra Dashboard</h1>

			{/* Your Groups Section */}
			<div className="group-section">
				<h2>Your Groups</h2>
				<ul>
					{userGroups.map((group, index) => (
						<li key={index} className="group-item">
							<span className="group-name" onClick={() => handleGroupClick(group.groupId)}>
								{group.groupName}
							</span>

							<button className="group-action leave" onClick={() => handleGroupLeave(group.groupId)}>LEAVE</button>
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
