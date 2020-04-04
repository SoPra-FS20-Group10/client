import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MainPage from "./MainPage";

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./Profile";
import Leaderboard from "./Leaderboard";



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




class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      showMainPage: true,
      showLeaderboard: false,
      showProfile: false
    };


  }



  goToMainPage = () => {

    this.setState({showMainPage: true});
    this.setState({showLeaderboard: false});
    this.setState({showProfile: false});
  }

  goToLeaderboard = () => {

    this.setState({showLeaderboard: true});
    this.setState({showMainPage: false});
    this.setState({showProfile: false});
  }

  goToProfile = () => {
    this.setState({showProfile: true});
    this.setState({showMainPage: false});
    this.setState({showLeaderboard: false});
  }

  currentDisplay(){

    console.log(this.state.showMainPage);
    if (this.state.showMainPage == true){
      return (<MainPage />);
    }
    else if (this.state.showLeaderboard == true){
      return (<Leaderboard />);
    }
    else{
      return (<Profile />);
    }
  }

  render() {

    return (

      <Container>
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

          {this.currentDisplay()}


      </Container>
    );
  }
}

export default withRouter(Game);
