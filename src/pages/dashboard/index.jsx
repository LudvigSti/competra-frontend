import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';
import { getActiveGroups, getUserGroupByUserId } from '../../service/apiClient';
import { leaveGroup } from '../../service/apiClient';
import { joinGroup } from '../../service/apiClient';
import Snackbar from '../../components/common/snackbar';
import useSnackbar from '../../hooks/useSnackbar';
import useAuth from '../../hooks/useAuth';

const CompetraDashboard = () => {
	const [userGroups, setUserGroups] = useState([]);
	const [activeGroups, setActiveGroups] = useState([]);
	const { loggedInUserId } = useAuth();
	const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
	const navigate = useNavigate();

	useEffect(() => {
		if (loggedInUserId) {
			fetchUserGroups();
			fetchActiveGroups();
		}
	}, [loggedInUserId]);

	const fetchUserGroups = async () => {
		const userGroups = await getUserGroupByUserId(loggedInUserId);
		setUserGroups(userGroups);
	};

	const fetchActiveGroups = async () => {
		try {
			const activeGroups = await getActiveGroups(loggedInUserId);
			setActiveGroups(activeGroups);
		} catch (error) {
			console.error('Error fetching active groups:', error);
		}
	};

	// const activeGroups = [{ name: 'Experis Salgsteam', action: 'JOIN' }];

	const handleGroupClick = (id) => {
		navigate(`/group/${id}`);
	};

	const handleGroupLeave = async (groupId) => {
		try {
			await leaveGroup(loggedInUserId, groupId);
			showSnackbar('You have left the group.', 'success');
			console.log('left group with id: ', groupId);
			setUserGroups((prevGroups) =>
				prevGroups.filter((group) => group.groupId !== groupId)
			);
			fetchActiveGroups();
		} catch (error) {
			console.error('Error leaving group:', error);
		}
		// FIXME: Replace with real endpoint when backend is done
	};

	const handleGroupJoin = async (groupId) => {
		try {
			const data = { userId: loggedInUserId, groupId };
			await joinGroup(data);
			console.log('joined group with id: ', groupId);
			fetchUserGroups();
			fetchActiveGroups();
		} catch (error) {
			console.error('Error joining group:', error);
		}
	};

	return (
		<div className="competra-dashboard">
			<h1>Competra Dashboard</h1>

			{/* Your Groups Section */}
			<div className="group-section">
				<h2>Your Groups</h2>
				<ul>
					{userGroups.map((group, index) => (
						<li key={index} className="group-item">
							<span
								className="group-name"
								onClick={() => handleGroupClick(group.groupId)}>
								{group.groupName}
							</span>

							<button
								className="group-action leave"
								onClick={() => handleGroupLeave(group.groupId)}>
								LEAVE
							</button>
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
							<span
								className="group-name"
								onClick={() => handleGroupClick(group.groupId)}>
								{group.groupName}
							</span>
							<button
								className="group-action join"
								onClick={() => handleGroupJoin(group.groupId)}>
								JOIN
							</button>
						</li>
					))}
				</ul>
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

export default CompetraDashboard;
