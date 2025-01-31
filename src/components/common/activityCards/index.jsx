/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { mockGroupData } from '../../../service/mockData';
import './style.css';
import ActivityLeaderboard from '../activityLeaderboard';

export default function ActivityCards({ groupId, userId }) {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		if (groupId) {
			/* Fetch activities by group */
		}

		if (userId) {
			/* Fetch activities by user */
		}
	}, [groupId, userId]);

	return (
		<div className="activities">
			{mockGroupData.activities.map((activity) => (
				<div key={activity.id} className="activity-card">
					<div className="activity-header">
						<h3>{activity.title}</h3>
						<button className="join-button">Join</button>
					</div>

					<ActivityLeaderboard activityId={activity.id} />
				</div>
			))}
		</div>
	);
}
