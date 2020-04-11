import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyRoom from "./LobbyRoom";
import Form from "react-bootstrap/Form";
/**
 * Lobby Model
 */


const ButtonContainer = styled.div`


`;

const LobbyContainer = styled.div`

float:left;
width: 100%;
background-color: rgb(90, 93, 99, 0.55);
margin-top: 10pt;
margin-bottom: 10pt;
`;



const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size:12pt;
  float: left;
  margin-left: 20%;
`;



class Lobby extends React.Component{

    constructor(props) {

        super(props);

        this.state = {
            playerCount: 0,
            maxPlayerCount: 4,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            lobbyId: this.props.lobbyId,
            lobbyName: this.props.lobbyName,
            lobbyPassword: null
        };

        this.goToLobby=this.goToLobby.bind(this)

    }


    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

     componentDidMount() {

        this.setState({
            lobbyId:this.props.lobbyId,
            ownerId:this.props.ownerId
        })

    }

    // Join Lobby

    async goToLobby(){

        // Check if there's space for the player in the lobby
        if (this.state.playerCount >= this.state.maxPlayerCount){
            return alert("The Lobby is full!");
        }

        // Join - Pass lobbyId
        else{

            const requestBody = JSON.stringify({
                id: localStorage.getItem("current"),
                password: this.state.lobbyPassword
            });


            console.log("PlayerId and lobbypassword (123): ");
            console.log(requestBody);
            console.log("lobbyID: " + this.state.lobbyId);


            try{

            await api.put("/lobby/" + this.state.lobbyId, requestBody);

            this.props.history.push(
                {pathname: `/game/lobby/${this.state.lobbyId}`,
                    state: { lobbyId: this.state.lobbyId,
                        lobbyPassword: this.state.lobbyPassword,
                        lobbyName: this.state.lobbyName,
                        playerId: this.state.playerId,
                        playerName: this.state.playerName,
                        ownerId: null}
                });
            }
            catch(error){
                alert("Could not join the lobby.");
            }


        }

    }


    render() {
        return (
            <BaseContainer>

                <LobbyContainer>

                    <Label> {this.state.lobbyId}</Label>

                    <Label> {this.state.lobbyName}</Label>

                    <Label> OwnerId: {this.state.ownerId}</Label>


                    <Label>Players: {this.state.playerCount}/4</Label>
<Form>
                    <Form.Group controlId="formPassword">
                        <Form.Control
                            onChange={e => {
                                this.handleInputChange('lobbyPassword', e.target.value);
                            }}
                            type="email" placeholder="Enter password"/>
                    </Form.Group>
</Form>
                <ButtonContainer>
                <Button variant="success" size="sm" block onClick={this.goToLobby}>
                   Join
                </Button>
                    </ButtonContainer>

                    </LobbyContainer>
            </BaseContainer>
        );
    }

}
export default Lobby;



