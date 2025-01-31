/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getLeaderboardByActivityId } from '../../../service/apiClient';

export default function ActivityLeaderboard({ activityId }) {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getLeaderboardByActivityId(activityId);
			setLeaderboard(data);
		};

		fetchData();
	}, [activityId]);

	if (!leaderboard) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<h4>Leaderboard</h4>
			<ul>
				{leaderboard.map((leader, index) => (
					<li key={index}>
						{index + 1}. {leader.userName} - {leader.elo}
					</li>
				))}
			</ul>
		</>
	);
}
