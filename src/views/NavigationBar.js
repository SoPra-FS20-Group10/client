import React from 'react';
import styled from 'styled-components';


import {withRouter} from 'react-router-dom';

import 'react-tabs/style/react-tabs.css';

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import {BaseContainer} from "../helpers/layout";
import {CloseButton} from "react-bootstrap";
import subtleClick from "../sounds/subtle_click.wav";


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
    sClick = new Audio(subtleClick);

    goToMainPage = () => {
        this.playSound(this.sClick);
        this.props.history.push({
            pathname: '/game/overview',
            state: {
                playerId: this.props.playerId
            }
        });
    }

    goToLeaderboard = () => {
        this.playSound(this.sClick);
        this.props.history.push({
            pathname: '/game/leaderboard',
            state: {
                playerId: this.props.playerId
            }
        });
    }

    goToProfile = () => {
        this.playSound(this.sClick);
        this.props.history.push({
            pathname: `/game/profile/${this.props.playerId}`,
            state: {
                playerId: this.props.playerId
            }
        });
    }

    playSound(sfx) {
        sfx.play();
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
