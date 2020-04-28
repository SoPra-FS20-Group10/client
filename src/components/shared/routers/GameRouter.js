import React from "react";
import styled from "styled-components";
import {Redirect, Route} from "react-router-dom";
import OverviewPage from "../../overview/OverviewPage";
import LeaderboardPage from "../../leaderboard/LeaderboardPage";
import ProfilePage from "../../profile/ProfilePage";
import LobbyPage from "../../lobby/LobbyPage";
import GamePage from "../../game/GamePage";
import EndScreenPage from "../../endscreen/EndScreenPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/overview`}
                    render={() => <OverviewPage/>}
                />

                <Route
                    exact
                    path={`${this.props.base}/leaderboard`}
                    render={() => <LeaderboardPage/>}
                />

                {/*// TODO: ID or not?*/}
                <Route
                    exact
                    path={`${this.props.base}/board`}
                    render={() => <GamePage/>}
                />

                {/*// TODO: ID or not?*/}
                <Route
                    exact
                    path={`${this.props.base}/endscreen`}
                    render={() => <EndScreenPage/>}
                />

                <Route
                    exact
                    path={`${this.props.base}/profile/:userId`}
                    render={() => <ProfilePage/>}
                />

                <Route
                    exact
                    path={`${this.props.base}/lobby/:lobbyId`}
                    render={() => <LobbyPage/>}
                />

                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() => <Redirect to={`${this.props.base}/overview`}/>}
                />
            </Container>
        );
    }
}

/*
* Don't forget to export your component!
 */
export default GameRouter;
