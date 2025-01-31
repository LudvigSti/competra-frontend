/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ActivityLeaderboard from '../activityLeaderboard';
import { getActivitiesByGroupId } from '../../../service/apiClient';
import './style.css';

export default function ActivityCards({ groupId, userId }) {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			if (groupId !== null) {
				const data = await getActivitiesByGroupId(groupId);
				setActivities(data);
			}

			if (userId !== null) {
				/* Fetch activities by user */
			}
		};

		fetchData();
	}, [groupId, userId]);

	return (
		<div className="activities">
			{activities.map((activity) => (
				<div key={activity.activityId} className="activity-card">
					<div className="activity-header">
						<h3>{activity.activityName}</h3>
						<button className="join-button">Join</button>
					</div>

					<ActivityLeaderboard activityId={activity.activityId} />
				</div>
			))}
		</div>
	);
}
