import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "../profile/ProfilePage";
import Leaderboard from "../leaderboard/LeaderboardPage";
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";
import GameBoard from "./GameBoard";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend"


// const Container = styled(BaseContainer)`
//     color: white;
//     text-align: center;
//     width:100%;
//     padding:0;
// `;

const BoardWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 500pt;
    height: 550pt;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const SideWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 150pt;
    height: 100%;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeckWrapper = styled.div`
    margin-top:8pt;
    padding: 1em;
    height: 52pt;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

class GamePage extends React.Component {
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

    render() {
        return (

            <Container>

                    <Row className="justify-content-md-center">
                        <Col className="py-2 px-0"  md="auto" >
                            <SideWrapper>
                                UI-elements on the left side
                            </SideWrapper>
                        </Col>

                        <Col  className="p-2" md="auto">
                            <BoardWrapper>
                                <DndProvider backend={Backend}>
                                <GameBoard/>
                                </DndProvider>
                            </BoardWrapper>

                        </Col>

                        <Col  className="py-2 px-0" md="auto">
                            <SideWrapper>
                                UI-elements on the right side
                            </SideWrapper>
                        </Col>
                    </Row>

            </Container>

        );
    }
}

export default withRouter(GamePage);