import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaderboardEntry = ({data, func, index}) => {
    return (index % 2 == 0 ?
            <tr className='dark' key={data.id} onClick={func}>
                <td>{++index}</td>
                <td>{data.username}</td>
                <td>{data.overallScore}</td>
                <td>{data.playedGames}</td>
                <td>{data.wonGames}</td>
            </tr>
            :
            <tr className='light' key={data.id} onClick={func}>
                <td>{++index}</td>
                <td>{data.username}</td>
                <td>{data.overallScore}</td>
                <td>{data.playedGames}</td>
                <td>{data.wonGames}</td>
            </tr>


    );
}

export default LeaderboardEntry;

