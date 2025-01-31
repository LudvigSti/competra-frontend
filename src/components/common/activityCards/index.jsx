/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ActivityLeaderboard from '../activityLeaderboard';
import useAuth from '../../../hooks/useAuth';
import {
	checkIfUserIsInActivity,
	joinUserActivity,
	getLeaderboardByActivityId,
} from '../../../service/apiClient';
import Snackbar from '../../common/snackbar';
import useSnackbar from '../../../hooks/useSnackbar';
import './style.css';

export default function ActivityCard({ activity }) {
	const [currentActivity, setCurrentActivity] = useState([]);
	const [isInActivity, setIsInActivity] = useState(false);
	const [leaderboard, setLeaderboard] = useState([]);
	const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
	const { loggedInUserId } = useAuth();

	// Checks if the logged in user is in the activity
	useEffect(() => {
		setCurrentActivity(activity);

		const fetchActivityStatus = async () => {
			try {
				const response = await checkIfUserIsInActivity(
					activity.activityId,
					loggedInUserId
				);
				setIsInActivity(response);
			} catch (error) {
				console.error('Error checking activity status:', error);
			}
		};

		fetchActivityStatus();
	}, [activity, loggedInUserId]);

	// Fetches leaderboard data
	useEffect(() => {
		fetchActivityLeaderboard();
	}, []);

	const fetchActivityLeaderboard = async () => {
		const data = await getLeaderboardByActivityId(activity.activityId);
		setLeaderboard(data);
	};

	const handleLeave = (activityId) => {
		console.log(loggedInUserId + ' has left activity ' + activityId);
		// fetchActivityLeaderboard();
	};

	const handleJoin = async (activityId) => {
		try {
			const data = { userId: loggedInUserId, activityId };
			await joinUserActivity(data);
			setIsInActivity(true);
			showSnackbar('You have joined the activity.', 'success');
			fetchActivityLeaderboard();
		} catch (error) {
			console.error('Error joining activity:', error);
			showSnackbar('Error joining activity.', 'error');
		}
	};

	return (
		<>
			<div className="activity-card">
				<div className="activity-header">
					<h3>{currentActivity.activityName}</h3>
					<button
						className={isInActivity ? 'leave-button' : 'join-button'}
						onClick={
							isInActivity
								? () => handleLeave(currentActivity.activityId)
								: () => handleJoin(currentActivity.activityId)
						}>
						{isInActivity ? 'LEAVE' : 'JOIN'}
					</button>
				</div>

				<ActivityLeaderboard leaderboard={leaderboard} />

				{snackbar.isOpen && (
					<Snackbar
						message={snackbar.message}
						type={snackbar.type}
						onClose={closeSnackbar}
					/>
				)}
			</div>
		</>
	);
}
