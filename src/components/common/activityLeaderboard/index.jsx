/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { mockGroupData } from '../../../service/mockData';

export default function ActivityLeaderboard({ activityId }) {
	const activity = mockGroupData.activities.find(
		(act) => act.id === activityId
	);

	useEffect(() => {
		// Fetch leaderboard data from API if needed
		console.log(activityId);
	}, [activityId]);

	if (!activity) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<h4>Leaderboard</h4>
			<ul>
				{activity.leaderboard.map((leader, index) => (
					<li key={index}>
						{index + 1}. {leader.name} - {leader.elo}
					</li>
				))}
			</ul>
		</>
	);
}
