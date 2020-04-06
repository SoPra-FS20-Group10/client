import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';

import {withRouter} from 'react-router-dom';
import LobbyList from "../Lobby/LobbyList";
import Button from "react-bootstrap/Button";
import Chart from "./Chart";

const StatsWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    padding: 5%;
    width: 90%;
    height: 100pt; 
    background: grey;
    float:left;
`;

const GraphWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    padding: 5%;
    width: 60%;
    height: 500pt;
    background: grey;
    float:left;
    color: white;
     
`;


const MatchHistoryWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    width: 25%;
    height: 500pt;
    background: grey;
    float:left;
`;

const Container = styled(BaseContainer)`
    color: white;
    text-align: center;
    width:100%;
    margin:auto;
`;

const ButtonContainer = styled.div`
    width: 33.3%;
    float:left;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = { // some example data for the profile page
            // example data for the stat overview
            stats: {id: 1, name: 'HOTCHILIEATER', wins: 1000, winPercentage: '59%', timePlayed: '370h'}

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

                {/*TODO: Implement stats overview*/}
                <StatsWrapper>
                    <h1> Here are some stats</h1>
                </StatsWrapper>

                {/*TODO: Refine Chart view*/}
                <GraphWrapper>
                    <Chart></Chart>
                </GraphWrapper>

                {/*TODO: Implement match-history view*/}
                <MatchHistoryWrapper>
                    <h1> Here is the match history</h1>
                </MatchHistoryWrapper>


            </Container>
        );
    }
}

export default withRouter(Profile);