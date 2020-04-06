import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Header from "../../views/Header";

const ButtonContainer = styled.div`
  width: 33.3%;
  float:left;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width:100%;
  margin:auto;
`;


const LeaderboardWrapper = styled.div`
    margin-top: 10%;
    margin: 10%;
    background: rgba(77, 77, 77, 0.5);
    float:center;
`;

// TODO: All time, last month, last year....
// TODO: Make list sortable by enties
class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = { // just some example data for the leaderboard
            data: [
                {id: 1, name: 'HOTCHILIEATER', wins: 1000, winPercentage: '59%', timePlayed: '370h'},
                {id: 2, name: 'Kortay', wins: 800, winPercentage: '54%', timePlayed: '320h'},
                {id: 3, name: 'xSchnipi', wins: 500, winPercentage: '62%', timePlayed: '240h'},
                {id: 4, name: 'M3TIS', wins: 420, winPercentage: '53%', timePlayed: '200h'}
            ]
        }
    }


    goToMainPage = () => {
        this.props.history.push("/game/overview");
    }

    goToLeaderboard = () => {
        this.props.history.push("/game/leaderboard");
    }

    goToProfile = () => {
        // TODO: Redirect with user's ID
        this.props.history.push(`/game/profile/${1}`);
    }

    renderTableHeader() {
        let header = ['#', 'Name', 'Wins', 'Win %', 'Time Played']
        // let header = Object.keys(this.state.data[0])
        return header.map((key, index) => {
            return <th class='text-white' key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.data.map((data, index) => {
                const {id, name, wins, winPercentage, timePlayed} = data //destructuring
                if (index % 2 == 0) {
                    return (
                        // <tr  class='text-white' key={id}>

                        <tr className='a' key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{wins}</td>
                            <td>{winPercentage}</td>
                            <td>{timePlayed}</td>
                        </tr>

                    )
                } else {
                    return (
                        <tr className='b' key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{wins}</td>
                            <td>{winPercentage}</td>
                            <td>{timePlayed}</td>
                        </tr>
                    )
                }


            }
        )
    }

    render() {
        return (
            <Container>
                {/*Navigation Bar*/}
                <div className="bg-image"></div>
                <ButtonContainer>
                    <Button variant="secondary" size="lg" block onClick={this.goToMainPage}>
                        Overview
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button variant="secondary" size="lg" block onClick={this.goToLeaderboard}>
                        Leaderboard
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button variant="secondary" size="lg" block onClick={this.goToProfile}>
                        Profile
                    </Button>
                </ButtonContainer>

                {/*Leaderboard*/}
                <div>
                    <LeaderboardWrapper responsive>
                        <h1 id='title'>Leaderboard</h1>
                        <table class="table" id='leaderboard'>
                            <tbody block>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </LeaderboardWrapper>
                </div>
            </Container>
        );
    }
}

export default withRouter(Leaderboard);
