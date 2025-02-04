/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

export default function ActivityLeaderboard({ leaderboard }) {
	const [currentLeaderboard, setCurrentLeaderboard] = useState([]);

	useEffect(() => {
		console.log('Leaderboard data: ', leaderboard)
		setCurrentLeaderboard(leaderboard);
	}, [leaderboard]);

	if (!leaderboard){
		return <p>Loading...</p>
	}

	if (leaderboard.length === 0) {
		return <p>No entries in the leaderboard.</p>;
	}

	return (
		<>
			<h4>Leaderboard</h4>
			<ul>
				{currentLeaderboard.map((leader, index) => (
					<li key={index}>
						{index + 1}. {leader.userName} - {leader.elo}
					</li>
				))}
			</ul>
		</>
	);
}
