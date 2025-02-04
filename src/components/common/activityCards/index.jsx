/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ActivityLeaderboard from '../activityLeaderboard';
import useAuth from '../../../hooks/useAuth';
import {
	checkIfUserIsInActivity,
	joinUserActivity,
	getLeaderboardByActivityId,
	leaveUserActivity,
} from '../../../service/apiClient';
import Snackbar from '../../common/snackbar';
import useSnackbar from '../../../hooks/useSnackbar';
import './style.css';

export default function ActivityCard({ activity }) {
	const [currentActivity, setCurrentActivity] = useState(activity);
	const [isInActivity, setIsInActivity] = useState(false);
	const [leaderboard, setLeaderboard] = useState([]);
	const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
	const { loggedInUserId } = useAuth();

	// useEffect(() => {
	// 	if (currentActivity?.participant?.some(p => p.userId === loggedInUserId)) {
	// 		setIsInActivity(true);
	// 	} else {
	// 		setIsInActivity(false);
	// 	}
				
	// 	}, [currentActivity, loggedInUserId]);
	

	// Checks if the logged in user is in the activity
	useEffect(() => {
		setCurrentActivity(activity);
		const fetchActivityStatus = async () => {
			try {
				const response = await checkIfUserIsInActivity(
					activity.activityId,
					loggedInUserId
				);
				console.log('Activity status response:', response);
				setIsInActivity(response);
				console.log('isInActivity:', response);
			} catch (error) {
				console.error('Error checking activity status:', error);
			}
		};

		fetchActivityStatus();
	}, [activity, loggedInUserId]);

	// useEffect(() => {
	// 	const fetchActivityLeaderboard = async () => {
	// 		try {
	// 			const data = await getLeaderboardByActivityId(activity.activityId);
	// 			console.log('Leaderboard data: ', data);
	// 			setLeaderboard(data);
	// 		} catch (error) {
	// 			console.error('Error fetching leaderboard:', error);
	// 		}
	// 	};
	// 	fetchActivityLeaderboard();
	// }, [activity.activityId]);

	//Fetches leaderboard data
	useEffect(() => {
		fetchActivityLeaderboard();
	}, [activity.activityId]);

	const fetchActivityLeaderboard = async () => {
		try { 
			const data = await getLeaderboardByActivityId(activity.activityId);
			setLeaderboard(data);
		} catch (error) {
			console.error('Error fetching leaderboard:', error);
		}
		
	};

	const handleLeave = async (activityId) => {
		try {
			await leaveUserActivity(activityId, loggedInUserId);
			setIsInActivity(false);
			showSnackbar('You have left the activity.', 'success');
			fetchActivityLeaderboard();
		} catch (error) {
			console.error('Error leaving activity:', error);
			showSnackbar('Error leaving activity.', 'error');
		}
		// fetchActivityLeaderboard();
	};

	const handleJoin = async (activityId) => {
		if (isInActivity) {
			showSnackbar('You are already in this activity.', 'error');
			return;
		}
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
