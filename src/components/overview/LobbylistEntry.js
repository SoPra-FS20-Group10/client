import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyRoom from "../lobby/LobbyPage";
import Form from "react-bootstrap/Form";

import subtleClick from "../../sounds/subtle_click.wav";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Modal from "react-modal";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

/**
 * LobbylistEntry Model
 */


const ButtonContainer = styled.div`


`;

const LobbyContainer = styled.div`
float:left;
width: 100%;
// background-color: rgb(1, 1, 1, 0.55);
margin-top: 10pt;
margin-bottom: 10pt;
`;


const Label = styled.label`
    width: 10em;
  color: black;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-align: initial;
  font-size:12pt;
  float: left;
`;
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0pt",
        width: "20%"
    }
};

const useStylesPopup = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

class LobbylistEntry extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            playerCount: 0,
            maxPlayerCount: 4,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            lobbyId: this.props.lobbyId,
            lobbyName: this.props.lobbyName,
            lobbyPassword: "",
            isRunning: false,
            showModal: false,
        };

        // try {
        //     this.timerID = setInterval(async () => {
        //     }, 1000);
        // } catch (e) {
        //     console.log(e);
        // }
        this.goToLobby = this.goToLobby.bind(this);
        this.getLobbyPlayers = this.getLobbyPlayers.bind(this);
        this.updateRunning = this.updateRunning.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.checkForPassword = this.checkForPassword.bind(this);


    }

    componentDidMount() {
        this.getLobbyPlayers();
        this.updateRunning();

        this.setState({
            lobbyId: this.props.lobbyId,
            ownerId: this.props.ownerId
        })
        try {
            this.timerID = setInterval(async () => {
                this.getLobbyPlayers();
                this.updateRunning();
            }, 500);
        } catch (e) {
            console.log(e);
        }
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModal: false});
    }


    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    async updateRunning() {

        try {
            let response = await api.get("/games/" + this.state.lobbyId);

            let status = response.data.status;
            if (status == "ENDED") {
                this.componentWillUnmount()
            }

            if (status === "RUNNING") {
                this.setState({
                    isRunning: true,
                })
            }
        } catch (error) {
            console.log(error);
        }


    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }


    async getLobbyPlayers() {
        try {
            let response = await api.get("/games/" + this.state.lobbyId + "/players");
            this.setState({playerCount: response.data.length});
        } catch (error) {
            // Nothing bad happens as the lobby entry won't show anymore in a few milliseconds...
        }
    }

    // Join LobbylistEntry

    async checkForPassword() {
        let requestBody = JSON.stringify({
            id: localStorage.getItem("current"),
            password: this.state.lobbyPassword
        });
        try {
            await api.put("/games/" + this.state.lobbyId + "/players", requestBody);
        } catch (error) {
            alert("Wrong password, could not join the lobby.");
        }

    }

    async checkForPassword() {
        this.playSound(new Audio(subtleClick));
        if (!this.state.showModal) {
            // try joining lobby without pw
            const requestBody = JSON.stringify({
                id: localStorage.getItem("current"),
                password: ""
            });
            try {

                await api.put("/games/" + this.state.lobbyId + "/players", requestBody);

                this.props.history.push(
                    {
                        pathname: `/game/lobby/${this.state.lobbyId}`,
                        state: {
                            lobbyId: this.state.lobbyId,
                            lobbyPassword: this.state.lobbyPassword,
                            lobbyName: this.state.lobbyName,
                            playerId: this.state.playerId,
                            playerName: this.state.playerName,
                            ownerId: null,
                            modalErrorMsg: null,
                        }
                    });
            } catch (error) {
                this.handleOpenModal()
            }
        } else {
            this.goToLobby()
        }

    }


    async goToLobby() {
        this.handleCloseModal()
        this.playSound(new Audio(subtleClick));

        // Check if there's space for the player in the lobby
        if (this.state.playerCount >= this.state.maxPlayerCount) {
            return alert("The LobbylistEntry is full!");
        }

        // Join - Pass lobbyId
        else {

            const requestBody = JSON.stringify({
                id: localStorage.getItem("current"),
                password: this.state.password
            });
            try {

                await api.put("/games/" + this.state.lobbyId + "/players", requestBody);

                this.props.history.push(
                    {
                        pathname: `/game/lobby/${this.state.lobbyId}`,
                        state: {
                            lobbyId: this.state.lobbyId,
                            lobbyPassword: this.state.lobbyPassword,
                            lobbyName: this.state.lobbyName,
                            playerId: this.state.playerId,
                            playerName: this.state.playerName,
                            ownerId: null
                        }
                    });
            } catch (error) {
                // alert("Wrong password, could not join the lobby.");
                this.setState({modalErrorMsg: "Wrong password, could not join the lobby."})
            }
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
            this.state.showModal == false ?
                <div style={{padding: '1em'}}>

                    <LobbyContainer>

                        <Grid container alignItems="center" style={{justifyContent: 'space-between'}}>
                            <Label> {this.state.lobbyName}</Label>
                            <Label>Players: {this.state.playerCount}/4</Label>

                            <Button variant="success" size="lg" onClick={this.checkForPassword}
                                    disabled={this.state.isRunning}>
                                Join
                            </Button>


                        </Grid>

                        <Divider orientation="horizontal" style={{marginTop: "1em"}}/>

                    </LobbyContainer>
                </div> :
                <div style={{padding: '1em'}}>
                    <LobbyContainer>

                        <Grid container alignItems="center" style={{justifyContent: 'space-between'}}>
                            <Label> {this.state.lobbyName}</Label>
                            <Label>Players: {this.state.playerCount}/4</Label>

                            <Button variant="success" size="lg" onClick={this.checkForPassword}
                                    disabled={this.state.isRunning}>
                                Join
                            </Button>
                        </Grid>

                        <Divider orientation="horizontal" style={{marginTop: "1em"}}/>

                    </LobbyContainer>

                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="Inline Styles Modal GameBoard"
                        style={customStyles}
                    >
                        <Paper elevation={3} style={{padding: '1em'}}>
                            <form className={useStylesPopup} noValidate autoComplete="off">
                                <div>
                                    <Typography variant="body1" component="h2">
                                        Enter Password
                                    </Typography>

                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.password}

                                        error={this.state.modalErrorMsg != null}
                                        helperText={this.state.modalErrorMsg != null
                                            ? this.state.modalErrorMsg : null
                                        }
                                        onChange={e => {
                                            this.handleInputChange('password', e.target.value);
                                        }}
                                    />

                                </div>
                                <div>
                                    <IconButton aria-label="delete">
                                        <ArrowBackIcon
                                            onClick={this.handleCloseModal}
                                        />
                                    </IconButton>

                                    <IconButton
                                        style={{float: 'right'}}
                                        disabled={this.state.password == null || !!this.state.password.match(/^[\s]*$/i)}
                                        onClick={this.goToLobby}
                                    >
                                        <CheckCircleOutlineIcon/>
                                    </IconButton>
                                </div>
                            </form>
                        </Paper>
                    </Modal>
                </div>
        );
    }

}

export default LobbylistEntry;



