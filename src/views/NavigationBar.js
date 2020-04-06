import React from 'react';
import styled from 'styled-components';


import { withRouter } from 'react-router-dom';

import 'react-tabs/style/react-tabs.css';

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import {BaseContainer} from "../helpers/layout";




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






class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

    }



    goToMainPage = () => {
        this.props.history.push("/game/overview");

        // this.setState({showMainPage: true});
        // this.setState({showLeaderboard: false});
        // this.setState({showProfile: false});
    }

    goToLeaderboard = () => {
        this.props.history.push("/game/leaderboard");

        // this.setState({showLeaderboard: true});
        // this.setState({showMainPage: false});
        // this.setState({showProfile: false});
    }

    goToProfile = () => {
        // TODO: Redirect with user's ID
        this.props.history.push(`/game/profile/${1}`);
        // this.setState({showProfile: true});
        // this.setState({showMainPage: false});
        // this.setState({showLeaderboard: false});
    }



    render() {

        return (

            <Container>

                <ButtonContainer>
                    <Button variant="outline-warning" size="lg" block onClick={this.goToMainPage}>
                        Overview
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button variant="outline-warning" size="lg" block onClick={this.goToLeaderboard}>
                        Leaderboard
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button variant="outline-warning" size="lg" block onClick={this.goToProfile}>
                        Profile
                    </Button>
                </ButtonContainer>


            </Container>
        );
    }
}

export default withRouter(NavigationBar);
