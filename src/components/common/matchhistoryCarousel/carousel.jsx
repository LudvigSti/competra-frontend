/* eslint-disable */
import React from 'react';
import { formatDateTime } from '../../../service/formatDate';
import './style.css';


const MatchHistoryCarousel = ({ matchHistory }) => 
{
    return (
        <div className="horizontal-scroll">
            <ul>
                {matchHistory.map((match) => (
                    <li className="listH" key={match.id}>
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