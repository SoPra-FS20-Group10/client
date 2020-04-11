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

const PlayerBarContainer = styled.div`

float:left;
width: 100%;
background-color: rgb(90, 93, 99);
height:78pt;
`;



const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size:12pt;
  float: left;
  margin-left: 20%;
`;



class PlayerBar extends React.Component{

    constructor(props) {

        super(props);

        this.state = {
            readyStatus: false,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name")
        };

        this.setReady=this.setReady.bind(this)
        this.readyButton = this.readyButton.bind(this);
    }


    componentDidMount() {

        // TODO: GET the Player Name from backend
        

        this.setState({
            playerName:this.props.playerName,
        })
    }



    setReady(){

        this.state.readyStatus ? this.setState({readyStatus:false}) : this.setState({readyStatus:true})
    }

    readyButton(){

        let button = this.state.readyStatus ? (<Button variant="danger" size="sm" block onClick={this.setReady}>
            Ready
        </Button>) : (<Button variant="success" size="sm" block onClick={this.setReady}>
            Ready
        </Button>)

        return (button);
    }

    render() {
        return (
            <BaseContainer>

                <PlayerBarContainer>

                    <Label>Player Name: {this.state.playerName}</Label>
                    <Label>Player ID: {this.state.playerId}</Label>

                    <ButtonContainer>
                        {this.readyButton()}
                    </ButtonContainer>

                </PlayerBarContainer>
            </BaseContainer>
        );
    }

}
export default PlayerBar;
