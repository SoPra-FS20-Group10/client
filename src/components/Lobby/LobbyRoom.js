import React from "react";

import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Lobby from "./Lobby";
import Modal from "react-modal";
import {CloseButton} from "react-bootstrap";
import LobbyList from "./LobbyList";
import PlayerBar from "./PlayerBar";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
 
`;

const LobbyContainer = styled.div`

`;

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


const ButtonContainer = styled.div`
    padding-top: 10pt;
`;

const ButtonContainer2 = styled.div`
    width: 50%;
    margin:auto;
`;



class LobbyRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lobbyName: this.props.location.state.lobbyName,
            lobbyId: this.props.location.state.lobbyId,
            lobbyPassword: this.props.location.state.lobbyPassword,
            playerId: this.props.location.state.playerId,
            playerName: this.props.location.state.playerName
        }

        this.leaveLobby=this.leaveLobby.bind(this);
    }



    componentDidMount() {


    }

    showPlayers(){

        return(
        <PlayerBar playerId={this.state.playerId} playerName={this.state.playerName}/>
        )
    }

    leaveLobby(){

        this.props.history.push(
            {pathname: `/game/overview/`,
                state: {
                    playerId: this.state.playerId,
                    playerName: this.state.playerName}
            });

    }


    render() {
        return (

            <Container>


                <ChatWrapper>
                    <h2>This would be the chat</h2>
                </ChatWrapper>

                <LobbyWrapper>

                    <h2> Lobby Name: {this.state.lobbyName}</h2>

                    {this.showPlayers()}

                    <view style={{margin: 40}}/>

                    <ButtonContainer2>
                        <Button variant="dark" size="sm" block onClick={this.leaveLobby}>
                            Leave Lobby
                        </Button>

                    </ButtonContainer2>



                </LobbyWrapper>





            </Container>
        );
    }
}

export default withRouter(LobbyRoom);
