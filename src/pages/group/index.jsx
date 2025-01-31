import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../service/formatDate';
import ActivityCard from '../../components/common/activityCards';
import { useEffect, useState } from 'react';
import { mockGroupData } from '../../service/mockData';
import {
	getActivitiesByGroupId,
	getGroupByGroupId,
} from '../../service/apiClient';
import './style.css';

export default function GroupPage() {
	const { groupId } = useParams();
	const [activities, setActivities] = useState([]);
	const [groupData, setGroupData] = useState({});

	useEffect(() => {
		// Fetch group data
		const fetchGroupData = async () => {
			const data = await getGroupByGroupId(groupId);
			setGroupData(data);
		};

		fetchGroupData();
	}, [groupId]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getActivitiesByGroupId(groupId);
			setActivities(data);
		};

		fetchData();
	}, []);

	return (
		<div className="group-page">
			<div className="group-header">
				<h1>{groupData.groupName}</h1>
				<p>Created on {formatDateTime(groupData.createdAt)}</p>
			</div>

			<h2>Activities</h2>
			<div className="activities">
				{activities.map((activity) => (
					<ActivityCard key={activity.id} activity={activity} />
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
}
