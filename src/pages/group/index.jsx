import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../service/formatDate';
import './style.css';

const mockGroupData = {
	name: 'Experis Academy',
	createdBy: 'John',
	createdAt: '2023-10-01',
	activities: [
		{
			id: 1,
			title: 'Table Tennis',
			leaderboard: [
				{ name: 'Ali', elo: 1500 },
				{ name: 'John', elo: 1450 },
				{ name: 'Ludvig', elo: 1400 },
				{ name: 'Ibbi', elo: 1350 },
				{ name: 'Ateeb', elo: 1300 },
			],
		},
		{
			id: 2,
			title: 'Chess',
			leaderboard: [
				{ name: 'Espen', elo: 1550 },
				{ name: 'Steven', elo: 1500 },
				{ name: 'Ali', elo: 1450 },
				{ name: 'John', elo: 1400 },
				{ name: 'Ludvig', elo: 1350 },
			],
		},
		{
			id: 3,
			title: 'Shuffleboard',
			leaderboard: [
				{ name: 'Ibbi', elo: 1600 },
				{ name: 'Ateeb', elo: 1550 },
				{ name: 'Espen', elo: 1500 },
				{ name: 'Steven', elo: 1450 },
				{ name: 'Ali', elo: 1400 },
			],
		},
	],
	recentMatches: [
		{
			id: 1,
			activity: 'Table Tennis',
			players: ['Ali', 'John'],
			date: '2023-10-10',
		},
		{
			id: 2,
			activity: 'Chess',
			players: ['Espen', 'Steven'],
			date: '2023-10-11',
		},
		{
			id: 3,
			activity: 'Shuffleboard',
			players: ['Ibbi', 'Ateeb'],
			date: '2023-10-12',
		},
	],
};

const GroupPage = () => {
	const { id } = useParams();

	return (
		<div className="group-page">
			<div className="group-header">
				<h1>{mockGroupData.name}</h1>
				<p>
					Created by: {mockGroupData.createdBy} on{' '}
					{formatDateTime(mockGroupData.createdAt)}
				</p>
			</div>

			<h2>Activities</h2>
			<div className="activities">
				{mockGroupData.activities.map((activity) => (
					<div key={activity.id} className="activity-card">
						<div className="activity-header">
							<h3>{activity.title}</h3>
							<button className="join-button">Join</button>
						</div>
						<h4>Leaderboard</h4>

						<ul>
							{activity.leaderboard.map((leader, index) => (
								<li key={index}>
									{index + 1}. {leader.name} - {leader.elo}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<h2>Recent Matches</h2>
			<div className="recent-matches">
				{mockGroupData.recentMatches.map((match) => (
					<div key={match.id} className="match-card">
						<h3>{match.activity}</h3>
						<p>Players: {match.players.join(' vs ')}</p>
						<p>Date: {formatDateTime(match.date)}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default GroupPage;
