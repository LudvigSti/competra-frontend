import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../service/formatDate';
import ActivityCard from '../../components/common/activityCards';
import { useEffect, useState } from 'react';
import {
    getActivitiesByGroupId,
    getGroupByGroupId,
    getRecentMatchesByGroupId,
} from '../../service/apiClient';
import './style.css';

export default function GroupPage() {
    const { groupId } = useParams();
    const [activities, setActivities] = useState([]);
    const [groupData, setGroupData] = useState({});
    const [recentMatches, setRecentMatches] = useState([]);

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
    }, [groupId]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentMatchesByGroupId(groupId);
            setRecentMatches(data);
        };

        fetchData();
    }, [groupId]);

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
                {recentMatches.map((match) => (
                    <div key={match.id} className="match-card">
                        <h3>{match.activityName}</h3>
                        <p>
                            Players: 
                            <span style={{ color: match.eloChangeP1 > 0 ? 'green' : 'red' }}>
                                {match.p1Name}
                            </span> 
                              vs  
                            <span style={{ color: match.eloChangeP2 > 0 ? 'green' : 'red' }}>
                                {match.p2Name}
                            </span>
                        </p>
                        <p>
                            Score: 
                            <span style={{ color: match.eloChangeP1 > 0 ? 'green' : 'red' }}>
                                {match.p1Result}
                            </span> 
                            - 
                            <span style={{ color: match.eloChangeP2 > 0 ? 'green' : 'red' }}>
                                {match.p2Result}
                            </span>
                        </p>
                        <p>
                            EloChange: 
                            <span style={{ color: match.eloChangeP1 > 0 ? 'green' : 'red' }}>
                                {match.eloChangeP1}
                            </span> 
                            - 
                            <span style={{ color: match.eloChangeP2 > 0 ? 'green' : 'red' }}>
                                {match.eloChangeP2}
                            </span>
                        </p>
                        <p>Date: {formatDateTime(match.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
