
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { formatDateTime } from '../../service/formatDate';
import { getMatchHistoryByUserId, getUserGroupByUserId, getUserActivitiesByUserId } from '../../service/apiClient';


const ProfilePage = () => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
//  const [userActivities, setUserActivities] = useState([]);
    const { loggedInUserId } = useAuth();

    useEffect(() => {
        if (!loggedInUserId) {
            console.error('loggedInUserId is null');
            return;
        }

     const fetchData = async () => {
        try {
            const matches = await getMatchHistoryByUserId(loggedInUserId);
            setMatchHistory(matches);

            const groups = await getUserGroupByUserId(loggedInUserId);
            setUserGroups(groups);

            // const activities = await getUserActivitiesByUserId(loggedInUserId);
            // setUserActivities(activities);

        } catch (error) {
            console.log(error);

        }
     }
        fetchData();
    }, [loggedInUserId]);
    
  



    return (
        <div className='profile-page'>
            <h1>Profile Page</h1>

            <section>
                <h2>Match History</h2>
                
                    {matchHistory.map((match) => (
                        <li className='listH' key={match.id}>
                            <p>Opponent: {match.opponentName}</p>
                            <p>Result: {match.result}</p>
                            <p>Elo Change: {match.eloChange}</p>
                            <p>Date: {formatDateTime(match.createdAt)}</p>
                        </li>
                    ))}
                
            </section>

            <section>
                <h2>User Groups</h2>
                
                    {userGroups.map((group) => (
                        <li className='listH' key={group.id}>{group.groupName}
                            
                        </li>
                    ))}
                
            </section>
        
         {/* <section>
            <h2>User Activites</h2>
            <ul>
                {userActivities.map((activity) => (
                    <li key={activity.id}>{activity.activityName}
                        
                    </li>
                ))}
            </ul>
        </section>  */}
        
            

        </div>
    )

}




export default ProfilePage;