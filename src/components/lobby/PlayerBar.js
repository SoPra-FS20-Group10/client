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

import NameLengthChecker from "../shared/Other/NameLengthChecker";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
/**
 * LobbylistEntry Model
 */


const ButtonContainer = styled.div`
    width: 15em;
    margin-bottom: 10pt;
`;

const PlayerBarContainer = styled.div`

width: 100%;
    // background-color: rgb(90, 93, 99);
    // height:78pt;
  text-align: center;
    padding: 1em;
`;


const Label = styled.label`
    width: 15em;
  color: black;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size:12pt;
  text-align: center;
  
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

        this.timerID = setInterval(() => {
            this.setState({
                playerName: this.props.playerName,
                readyStatus: this.props.readyStatus
            })
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
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

            button = null
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
            <div>
                <PlayerBarContainer>
                    <Grid container alignItems="center" style={{justifyContent: 'space-between'}}>
                        <Label>{NameLengthChecker(this.state.playerName)}</Label>
                        <ButtonContainer>
                            {this.readyButton()}
                        </ButtonContainer>

                        <ButtonContainer>
                            {this.kickButton()}
                        </ButtonContainer>

                    </Grid>

                    <Divider orientation="horizontal" style={{marginTop: "0.5em"}}/>




                </PlayerBarContainer>
            </div>
        );
    }

}

export default PlayerBar;
