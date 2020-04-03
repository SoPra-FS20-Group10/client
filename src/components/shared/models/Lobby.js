import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../../helpers/api";
import {BaseContainer} from "../../../helpers/layout";

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
/**
 * Lobby Model
 */


const ButtonContainer = styled.div`
  width: 50pt;
float: left;
margin-left: 60pt;
`;

const LobbyContainer = styled.div`

float:left;
width: 100%;
background-color: rgb(90, 93, 99);
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size:30pt;
  float: left;
  margin-left: 60pt;
`;

class Lobby extends React.Component{
    constructor() {
        super();
        this.state = {
            id: null,
            playerCount: 0
        };

    }

     componentDidMount() {

        this.setState({
            id:this.props.id
        })
    }


    render() {
        return (
            <BaseContainer>

                <LobbyContainer>
               <Label>{this.state.id}</Label>
                <view style={{margin: 40}}/>
                <Label>{this.state.playerCount}/4</Label>
                <view style={{margin: 40}}/>

                <ButtonContainer>
                <Button variant="secondary" size="sm" block onClick={this.goToProfile}>
                   Join
                </Button>
                    </ButtonContainer>

                    </LobbyContainer>
            </BaseContainer>
        );
    }

}
export default Lobby;
