import React from "react";
import styled from "styled-components";
import {Redirect, Route} from "react-router-dom";
import OverviewPage from "../../overview/OverviewPage";
import LeaderboardPage from "../../leaderboard/LeaderboardPage";
import ProfilePage from "../../profile/ProfilePage";
import LobbyPage from "../../lobby/LobbyPage";
import GamePage from "../../game/GamePage";
import EndScreenPage from "../../endscreen/EndScreenPage";
import {InGameGuard} from "../routeProtectors/InGameGuard";

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
                    render={() =>
                        <InGameGuard>
                            <OverviewPage/>
                        </InGameGuard>
                    }
                />

                <Route
                    exact
                    path={`${this.props.base}/leaderboard`}
                    render={() =>

                        <InGameGuard>
                            <LeaderboardPage/>
                        </InGameGuard>
                    }
                />

                {/*// TODO: ID or not?*/}
                <Route
                    exact
                    path={`${this.props.base}/board`}
                    render={() =>
                        <GamePage/>
                    }
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
                    render={() =>
                        <InGameGuard>
                            <ProfilePage/>
                        </InGameGuard>
                    }
                />

                <Route
                    exact
                    path={`${this.props.base}/lobby/:lobbyId`}
                    render={() =>
                        <InGameGuard>
                            <LobbyPage/>
                        </InGameGuard>
                    }
                />

                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() =>
                        <InGameGuard>
                            <Redirect to={`${this.props.base}/overview`}/>
                        </InGameGuard>
                    }
                />
            </Container>
        );
    }
}

/*
* Don't forget to export your component!
*/
export default GameRouter;
