import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Game from "../../overview/OverviewPage";
import Leaderboard from "../../leaderboard/Leaderboard";
import Profile from "../../profile/ProfilePage";
import LobbyRoom from "../../lobby/LobbyPage";
import Board from "../../game/Board";

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
          render={() => <Game />}
        />

        <Route
            exact
            path={`${this.props.base}/leaderboard`}
            render={() => <Leaderboard />}
        />

          <Route
              exact
              path={`${this.props.base}/board`}
              render={() => <Board/>}
          />
        <Route
            exact
            path={`${this.props.base}/profile/:userId`}
            render={() => <Profile />}
        />

        <Route
            exact
            path={`${this.props.base}/lobby/:lobbyId`}
            render={() => <LobbyRoom/>}
        />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/overview`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
