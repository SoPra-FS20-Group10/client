import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyRoom from "./LobbyRoom";
/**
 * Lobby Model
 */


const ButtonContainer = styled.div`


`;

const LobbyContainer = styled.div`

float:left;
width: 100%;
background-color: rgb(90, 93, 99);
height:78pt;
`;



const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size:16pt;
  float: left;
  margin-left: 20%;
`;



class Lobby extends React.Component{

    constructor(props) {

        super(props);

        this.state = {
            lobbyId: null,
            playerCount: 0,
            maxPlayerCount: 4
        };

        this.goToLobby=this.goToLobby.bind(this)

    }

     componentDidMount() {

        this.setState({
            id:this.props.id
        })
    }

    async goToLobby(){


        if (this.state.playerCount >= this.state.maxPlayerCount){
            return alert("The Lobby is full!");
        }
        else{
            // this.props.history.push(`/game/lobby/${this.state.lobbyId}`);
            console.log(this)
            this.props.history.push(
                {pathname: `/game/lobby/${this.props.id}`}
                );
            // return <LobbyRoom id={this.state.lobbyId}/>
        }

    }


    render() {
        return (
            <BaseContainer>

                <LobbyContainer>
               <Label>Lobby ID: {this.state.id}</Label>

                <Label>Players: {this.state.playerCount}/4</Label>


                <ButtonContainer>
                <Button variant="secondary" size="sm" block onClick={this.goToLobby}>
                   Join
                </Button>
                    </ButtonContainer>

                    </LobbyContainer>
            </BaseContainer>
        );
    }

}
export default Lobby;



