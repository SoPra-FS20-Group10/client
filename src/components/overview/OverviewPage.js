import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MainPage from "./Overview";

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "../profile/ProfilePage";
import Leaderboard from "../leaderboard/LeaderboardPage";
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";



const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width:100%;
  margin:auto;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ButtonContainer = styled.div`
  width: 33.3%;
  float:left;
  
`;


const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;




class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: Replace placeholder
      // playerId: this.props.location.state.playerId,
      playerId: localStorage.getItem("current"),
      playerName: localStorage.getItem("name"),
      showMainPage: true,
      showLeaderboard: false,
      showProfile: false,
    };

  }

  currentDisplay(){

      return (<MainPage />);

  }

  render() {

    return (
      <Container>
        {/*<div className="bg-image"></div>*/}
        <NavigationBar history={this.props} value={0} playerId={localStorage.getItem("current")}/>
          {this.currentDisplay()}
      </Container>
    );
  }
}

export default withRouter(OverviewPage);
