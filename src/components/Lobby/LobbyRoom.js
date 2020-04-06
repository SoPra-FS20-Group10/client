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
            playerId: this.props.location.state.playerId
        }
    }

    componentDidMount() {


        console.log(this);
    }

    showPlayers(){

        return(
        <PlayerBar playerId={this.state.playerId}/>
        )
    }


    render() {
        return (

            <Container>

                <h2> Lobby Name: {this.state.lobbyName}</h2>

                <h2> Lobby ID:  {this.state.lobbyId}  </h2>
                <div> Note: This is currently always set to 4. The Backend should return a free Lobby ID/Slot</div>

                <h3> Lobby Password: {this.state.lobbyPassword}</h3>




                <ChatWrapper>
                    <h2>This would be the chat</h2>
                </ChatWrapper>

                <LobbyWrapper>

                    <h2> Lobby Name: {this.state.lobbyName}</h2>

                    {this.showPlayers()}

                    <view style={{margin: 40}}/>

                    <ButtonContainer2>
                        <Button variant="dark" size="sm" block >
                            Leave Lobby
                        </Button>

                    </ButtonContainer2>



                </LobbyWrapper>





            </Container>
        );
    }
}

export default withRouter(LobbyRoom);
