import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyRoom from "./LobbyPage";

import activateSFX from "../../sounds/activate.wav";
import deactivateSFX from "../../sounds/deactivate.wav";
import subtleClick from "../../sounds/subtle_click.wav";

/**
 * LobbylistEntry Model
 */


const ButtonContainer = styled.div`

    margin-bottom: 10pt;
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


class PlayerBar extends React.Component {
    activate = new Audio(activateSFX);
    deactivate = new Audio(deactivateSFX);

    constructor(props) {

        super(props);

        this.state = {
            readyStatus: this.props.readyStatus,
            playerId: this.props.playerId,
            playerName: this.props.playerName,
        };

        this.setReady = this.setReady.bind(this)
        this.readyButton = this.readyButton.bind(this);
        this.kickButton = this.kickButton.bind(this);
        this.kickPlayer = this.kickPlayer.bind(this);
    }


    componentDidMount() {

        // TODO: GET the Player Name from backend


        this.setState({
            playerName: this.props.playerName,
            readyStatus: this.props.readyStatus
        })

        setInterval(() => {
            this.setState({
                playerName: this.props.playerName,
                readyStatus: this.props.readyStatus
            })
        }, 500);

    }


    async setReady() {
        // this.state.readyStatus == "READY" ? this.setState({readyStatus:"NOT_READY"}) : this.setState({readyStatus:"READY"});
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
        });
        try {
            await api.put("/players/" + localStorage.getItem("current"), requestBody);
            // Play sounds depending on statechange
            if (this.state.readyStatus == "READY") {
                let audio = new Audio(deactivateSFX);
                this.playSound(audio);
            } else {
                let audio = new Audio(activateSFX);
                this.playSound(audio);
            }
        } catch (error) {

        }
    }


    readyButton() {

        let button;
        const ownPlayerId = localStorage.getItem("current");
        if (this.props.playerId.toString() === ownPlayerId) {
            button = this.state.readyStatus === "READY" ? (<Button variant="success" size="sm" block onClick={
                (event) => {
                    this.setReady(event);
                }
            }>
                YOU ARE READY
            </Button>) : (<Button variant="danger" size="sm" block onClick={
                (event) => {
                    this.setReady(event);
                }
            }>
                YOU ARE NOT READY
            </Button>)
        } else {

            button = this.state.readyStatus === "READY" ? (
                <Button variant="success" size="sm" block onClick={this.setReady} disabled>
                    PLAYER READY
                </Button>) : (<Button variant="danger" size="sm" block onClick={this.setReady} disabled>
                PLAYER NOT READY
            </Button>)
        }
        return (button);
    }

    kickButton() {
        let button;
        const ownPlayerId = localStorage.getItem("current");

        if (this.props.isLobbyLeader) {

            if (this.props.playerId.toString() === ownPlayerId) {
                button = <div/>
            } else {
                button =
                    (<Button variant="danger" size="sm" block onClick={this.kickPlayer}>
                        KICK
                    </Button>)
            }
        } else {

            button = <div></div>
        }
        return (button);

    }

    async kickPlayer() {
        // TODO: Popup if couldn't kick player?

        this.playSound(new Audio(subtleClick));

        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
        });

        try {
            // Kick user in backend
            await api.delete("/games/" + this.props.lobbyId + "/players/" + this.props.playerId, {data: requestBody});

        } catch (error) {
            console.log(error);
        }


    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
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

                    <ButtonContainer>
                        {this.kickButton()}
                    </ButtonContainer>

                </PlayerBarContainer>
            </BaseContainer>
        );
    }

}

export default PlayerBar;
