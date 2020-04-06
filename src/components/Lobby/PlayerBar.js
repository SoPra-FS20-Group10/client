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
            playerName: null,
            readyStatus: false,
        };

        this.setReady=this.setReady.bind(this)

    }


    componentDidMount() {

        // TODO: GET the Player Name from backend
        

        this.setState({
            playerName:this.props.playerName,
        })
    }



    setReady(){

        this.setState({readyStatus:true})
    }


    render() {
        return (
            <BaseContainer>

                <PlayerBarContainer>

                    <Label>Player Name: {this.state.playerName}</Label>

                    <Label>Ready Status: {this.state.readyStatus}</Label>



                    <ButtonContainer>
                        <Button variant="info" size="sm" block onClick={this.setReady}>
                            Ready
                        </Button>
                    </ButtonContainer>

                </PlayerBarContainer>
            </BaseContainer>
        );
    }

}
export default PlayerBar;
