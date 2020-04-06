import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import ChatWindow from "../Overview/ChatWindow";
import LobbyList from "../Lobby/LobbyList";
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";

// TODO: WORK IN PROGRESS!

const ChatWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
padding: 5%;
width: 25%;
height: 400pt; 
background: grey;
float:left;
`;

const LobbyWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
width: 60%;
height: 400pt; 
background: rgba(77, 77, 77, 0.5);
float:left;
`;


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
 
`;



class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        };
    }




    render() {
        return (
            <Container>

                <NavigationBar/>

                <ChatWrapper>
                    <h2>This would be the chat</h2>
                </ChatWrapper>

                <LobbyWrapper>

                    <LobbyList/>
                </LobbyWrapper>



            </Container>
        );
    }
}

export default withRouter(MainPage);
