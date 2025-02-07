/* eslint-disable */
import React from 'react';
import { formatDateTime } from '../../../service/formatDate';
import './style.css';


const MatchHistoryCarousel = ({ matchHistory }) => 
{
    const sortedMatchHistory = [...matchHistory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <div className="horizontal-scroll">

            <ul>
                {sortedMatchHistory.map((match) => (
                    <li className={`${match.result.trim().toLowerCase() === 'won' ? 'match-won' : 'match-lost'}`} key={match.id}>
                        <p>Opponent: {match.opponentName}</p>
                        <p>Result: {match.result}</p>
                        <p>Elo Change: {match.eloChange}</p>
                        <p>Date: {formatDateTime(match.createdAt)}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MatchHistoryCarousel;