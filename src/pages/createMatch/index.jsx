import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { getAllUserActivities, createMatch } from '../../service/apiClient';

const CreateMatch = () => {
  const [activities, setActivities] = useState([]);
  const [activityUsers, setActivityUsers] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [currentUserActivity, setCurrentUserActivity] = useState('');
  const [selectedOpponentId, setSelectedOpponentId] = useState('');
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [p1Result, setP1Result] = useState('');
  const [p2Result, setP2Result] = useState('');
  const { loggedInUserId } = useAuth();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserActivities(loggedInUserId);
  }, [loggedInUserId]);

  const fetchUserActivities = async (userId) => {
    try {
      const allActivities = await getAllUserActivities();
      const userActivities = allActivities.filter(activity => activity.userId === userId);
      setActivities(userActivities);
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  };

  const fetchActivityUsers = async (activityId) => {
    try {
      const allActivities = await getAllUserActivities();
      const users = allActivities.filter(activity => activity.activityId === Number(activityId) && activity.userId !== loggedInUserId);
      setActivityUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleActivityChange = (event) => {
    const selectedActivityId = event.target.value;
    setSelectedActivity(selectedActivityId);
    fetchActivityUsers(selectedActivityId);
    const activity = activities.find(activity => activity.activityId === Number(selectedActivityId));
    setCurrentUserActivity(activity);
  };

  const handleOpponentChange = (event) => {
    const selectedOpponentId = event.target.value;
    setSelectedOpponentId(selectedOpponentId);
    const opponent = activityUsers.find(user => user.userId === Number(selectedOpponentId));
    setSelectedOpponent(opponent);
  };

  const handleCreateMatch = async () => {
    const matchData = {
      p1Id: loggedInUserId,
      p2Id: selectedOpponentId,
      activityId: selectedActivity,
      p1Result: p1Result || 0,
      p2Result: p2Result || 0
    };

    try {
      const response = await createMatch(matchData);
      setResponse(response);
    } catch (error) {
      console.error('Failed to create match', error);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="create-match">
      <h1>Create Match</h1>
      <div>
        <h2>Select Activity</h2>
        <select value={selectedActivity} onChange={handleActivityChange}>
          <option value="" disabled>Select an activity</option>
          {activities.map(activity => (
            <option key={activity.activityId} value={activity.activityId}>
              {activity.activityName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>You</p>
        <p>{currentUserActivity ? currentUserActivity.elo : ''}</p>
        <p>vs</p>
        <select value={selectedOpponentId} onChange={handleOpponentChange}>
          <option value="" disabled>Select a user</option>
          {activityUsers.map(user => (
            <option key={user.userId} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>
        <p>{selectedOpponent ? selectedOpponent.elo : ''}</p>
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter your score"
          value={p1Result}
          onChange={(e) => setP1Result(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter opponent's score"
          value={p2Result}
          onChange={(e) => setP2Result(e.target.value)}
        />
        {response ? (
          <button onClick={handleGoBack}>Go Back</button>
        ) : (
          <button onClick={handleCreateMatch}>Create Match</button>
        )}
      </div>
      {response && (
        <div>
          <h2>Match Result</h2>
          <p>
            Your new ELO: <span style={{ color: response.p1NewElo > response.p1OldElo ? 'green' : 'red' }}>{response.p1NewElo}</span> 
            (Change: <span style={{ color: response.match.eloChangeP1 > 0 ? 'green' : 'red' }}>{response.match.eloChangeP1}</span>)
          </p>
          <p>
            Opponent's new ELO: <span style={{ color: response.p2NewElo > response.p2OldElo ? 'green' : 'red' }}>{response.p2NewElo}</span> 
            (Change: <span style={{ color: response.match.eloChangeP2 > 0 ? 'green' : 'red' }}>{response.match.eloChangeP2}</span>)
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateMatch;