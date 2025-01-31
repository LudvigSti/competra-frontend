import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../service/formatDate';
import ActivityCards from '../../components/common/activityCards';
import { useEffect } from 'react';
import { mockGroupData } from '../../service/mockData';
import './style.css';

export default function GroupPage() {
	const { groupId } = useParams();

	useEffect(() => {
		// Fetch group data
	}, [groupId]);

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
			<ActivityCards groupId={groupId} />

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
}
