/* eslint-disable */
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { getMatchHistoryByUserId, getUserGroupByUserId, getUserByUserId } from '../../service/apiClient';
import MatchHistoryCarousel from '../../components/common/matchhistoryCarousel/carousel';


const ProfilePage = () => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
//  const [userActivities, setUserActivities] = useState([]);
    const [userName, setUserName] = useState('');
    const { loggedInUserId } = useAuth();

    useEffect(() => {
        if (!loggedInUserId) {
            console.error('loggedInUserId is null');
            return;
        }

     const fetchData = async () => {
        try {

            const user = await getUserByUserId(loggedInUserId);
            console.log(user.username);
            setUserName(user.username);
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
                <h2>{userName}'s Match History</h2>
                <MatchHistoryCarousel matchHistory={matchHistory} />
                
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