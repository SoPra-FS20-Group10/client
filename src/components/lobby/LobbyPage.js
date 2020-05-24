import React from "react";

import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import LobbylistEntry from "../overview/LobbylistEntry";
import Modal from "react-modal";
import {CloseButton} from "react-bootstrap";
import LobbyList from "../overview/Lobbylist";
import PlayerBar from "./PlayerBar";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert, SnackbarAlert} from "../shared/Other/SnackbarAlert";
import MuiAlert from '@material-ui/lab/Alert';
import {ThemeProvider} from '@livechat/ui-kit'
import "../overview/styles/chat.css"
// import "./styles/chat.css"
import subtleClick from "../../sounds/subtle_click.wav";
import endSound from "../../sounds/misc_sound.wav";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Container = styled(BaseContainer)`
  // color: white;
  // text-align: center;
  // // margin: 0;
  // width: 80%
  // max-width: none;
  // margin-right: 5%;
  // margin-left: 5%;
    align-content: space-between;
 color: white;
  text-align: center;
  width:100%;
  // margin:auto;
`;

const LobbyContainer = styled.div`

`;

const ChatWrapper = styled.div`

border-radius: 4pt;
    width: 25%;
    height: 32em; 
    float:left;
`;

const LobbyWrapper = styled.div`
    width: 100%;
    height: 100%;
    align-content: space-between;
    float: left;
    height: 32em;
// margin-top: 10%;
// margin-left: 5%;
//
// margin-right: 5%;
// width: 60%;
//
// height: 400pt; 
// background: rgba(77, 77, 77, 0.5);
// float:left;
`;

const TitleWrapper = styled.div`
    border-radius: 4pt;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15em;
    flex-flow: column wrap;
    
`;

const ButtonContainer = styled.div`
    margin-top: 3em;
    float:left;
    width: 100%;
    align-items:left;
    justify-items: left;
`;

const ButtonContainer2 = styled.div`
    width: 100%;
    // margin:auto;
    justify-content: space-between;
    float: left;
`;

// Chat title

function Title() {
    return <p className="title">Lobby Chat</p>
}

// TODO: Snackbars for errors?

class LobbyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lobbyName: this.props.location.state.lobbyName,
            lobbyId: this.props.location.state.lobbyId,
            lobbyPassword: this.props.location.state.lobbyPassword,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            lobbyPlayers: null,
            lobbyPlayerNumber: null,
            ownerId: this.props.location.state.ownerId,
            maxPlayerCounter: 4,
            minPlayerCounter: 2,
            isLobbyLeader: false,
            isOpenLobbyCreateSnackbar: false,
            messages: [],
            message: "",
            lobbyLeaderAbort: false,
            isOpenLobbyLeaderCantLeaveSnackbar: false,
            isOpenLobbyLeaderCantStartBecauseMissingPlayers: false,
            isOpenLobbyLeaderCantStartBecauseNotAllReady: false,
            isOpenLobbyLeaderCantStartBecauseTooManyPlayers: false,
            isSnackbarOpen: false,
        };

        this.leaveLobby = this.leaveLobby.bind(this);
        this.fetchLobbyPlayers = this.fetchLobbyPlayers.bind(this);
        this.startGame = this.startGame.bind(this);
        this.countLobbyPlayers = this.countLobbyPlayers.bind(this);
        this.checkLobbyLeader = this.checkLobbyLeader.bind(this);
        this.allPlayersReady = this.allPlayersReady.bind(this);
        this.goToBoard = this.goToBoard.bind(this);
        this.checkStartGame = this.checkStartGame.bind(this);
        this.checkInLobby = this.checkInLobby.bind(this);
        this.handleCloseLobbyCreateSnackbar = this.handleCloseLobbyCreateSnackbar.bind(this);
        this.handleOpenLobbyCreateSnackBar = this.handleOpenLobbyCreateSnackBar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleCloseSnackbars = this.handleCloseSnackbars.bind(this);
        this.showSnackbar = this.showSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);

    }


    componentDidMount() {
        this.fetchLobbyPlayers();
        this.checkLobbyLeader();
        this.checkStartGame();
        this.checkInLobby();
        this.handleOpenLobbyCreateSnackBar();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMessages = this.getMessages.bind(this);
        try {
            this.timerID = setInterval(async () => {
                this.fetchLobbyPlayers();
                this.checkLobbyLeader();
                this.checkStartGame();
                this.checkInLobby();
                this.getMessages();
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    async fetchLobbyPlayers() {

        try {

            const response = await api.get("/games/" + this.state.lobbyId + "/players");
            this.setState({lobbyPlayers: response.data});
            this.countLobbyPlayers();
        } catch (error) {
            console.log(error);
        }
    }

    countLobbyPlayers() {

        let nrPlayers = this.state.lobbyPlayers.length;
        this.setState({
            lobbyPlayerNumber: nrPlayers
        })
    }

    checkInLobby() {
        if (this.state.lobbyPlayers) {

            let isInLobby = false;
            this.fetchLobbyPlayers();
            this.state.lobbyPlayers.map((player) => {
                if (player.id.toString() === localStorage.getItem("current")) {
                    isInLobby = true;
                }
            });

            if (!isInLobby) {
                this.props.history.push(
                    {
                        pathname: `/game/overview/`,
                        state: {
                            playerId: this.state.playerId,
                            playerName: this.state.playerName
                        }
                    });
            }
        }

    }

    showPlayers() {

        if (this.state.lobbyPlayers) {
            let lobbyPlayers = this.state.lobbyPlayers;
            let listPlayers = lobbyPlayers.map((player) =>
                <PlayerBar playerId={player.id} playerName={player.username} readyStatus={player.status}
                           isLobbyLeader={this.state.isLobbyLeader} lobbyId={this.state.lobbyId}/>
            );
            return (
                <LobbyContainer>
                    {listPlayers}

                </LobbyContainer>
            );
        } else {
            return (
                <h1> Waiting For Lobby Fetching</h1>
            );
        }
    }

    async leaveLobby() {
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
        });

        let audio = new Audio(subtleClick);
        this.playSound(audio);

        // If lobbyleader leaves the game, logout all users and delete the game
        if (this.state.isLobbyLeader && this.state.lobbyPlayerNumber == 1) {

            const requestBody = JSON.stringify({
                token: localStorage.getItem("token"),
            });

            let numTries = 0
            while (true) {
                numTries++;
                try {
                    // Start game in backend
                    await api.put("/games/" + this.state.lobbyId, requestBody);

                    break;
                } catch (error) {
                    if (--numTries == 0) throw error;
                }
            }

            localStorage.setItem("currentGame", this.state.lobbyId);

            numTries = 0
            while (true) {
                numTries++;
                try {
                    // End game in backend
                    await api.patch("/games/" + localStorage.getItem("currentGame"), requestBody);

                    break;
                } catch (error) {
                    if (--numTries == 0) throw error;
                }
            }

            numTries = 0
            while (true) {
                numTries++;
                try {
                    // Log out user in backend
                    // -> Because only one player is in the lobby the backend will also delete the game in this step!
                    await api.delete("/games/" + this.state.lobbyId + "/players/" + localStorage.getItem("current"), {data: requestBody});

                    break;
                } catch (error) {
                    if (--numTries == 0) throw error;
                }
            }

            localStorage.removeItem("currentGame");

            this.props.history.push(
                {
                    pathname: `/game/overview/`,
                    state: {
                        playerId: this.state.playerId,
                        playerName: this.state.playerName,
                    }
                });
        }

        // If lobbyleader but lobby still contains other players, show snackbar
        else if (this.state.isLobbyLeader) {
            this.setState({isOpenLobbyLeaderCantLeaveSnackbar: true});
        }

        // if not lobbyleader, leave lobby without deletion
        else {
            try {
                // Log out user in backend
                await api.delete("/games/" + this.state.lobbyId + "/players/" + localStorage.getItem("current"), {data: requestBody});
                this.props.history.push(
                    {
                        pathname: `/game/overview`,
                        state: {
                            playerId: this.state.playerId,
                            playerName: this.state.playerName
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }

    checkLobbyLeader() {
        if (this.state.ownerId) {
            this.setState({
                isLobbyLeader: true
            })
        }
    }

    async startGame() {
        let audio = new Audio(subtleClick);
        await this.playSound(audio);


        let allReady = this.allPlayersReady();
        if (this.state.lobbyPlayerNumber > this.state.maxPlayerCounter) {
            this.setState({isOpenLobbyLeaderCantStartBecauseTooManyPlayers: true});
        } else if (this.state.lobbyPlayerNumber < this.state.minPlayerCounter) {
            this.setState({isOpenLobbyLeaderCantStartBecauseMissingPlayers: true});
        } else if (!allReady) {
            this.setState({isOpenLobbyLeaderCantStartBecauseNotAllReady: true});
        }

        // If all conditions to start a game are met, start the game and tell the backend.
        else {
            const requestBody = JSON.stringify({
                token: localStorage.getItem("token"),
            });
            try {
                // Start game in backend
                await api.put("/games/" + this.state.lobbyId, requestBody);

                this.goToBoard();

            } catch (error) {
                console.log(error);
            }
        }
    }

    allPlayersReady() {
        let allReady = true;
        this.state.lobbyPlayers.map((player) => {

            if (player.status !== "READY") {
                allReady = false;
            }
        });
        return allReady;
    }

    // Redirect player to the board
    async goToBoard() {
        // Redirect to board
        localStorage.setItem("currentGame", this.state.lobbyId);

        this.props.history.push(
            {
                pathname: `/game/board/`,
                gameId: this.state.lobbyId
            });
    }

    // Check if the game had started, if yes --> redirect the player to the board

    async checkStartGame() {
        if (this.state.lobbyPlayerNumber > 1) {
            let response = await api.get("/games");
            let currentGames = response.data;
            currentGames.map((game) => {
                    if (game.id === this.state.lobbyId) {
                        if (game.status === "RUNNING") {
                            this.goToBoard();
                        }
                    }
                }
            );
        }
    }

    handleOpenLobbyCreateSnackBar() {
        if (this.props.location.state.ownerId != null)
            this.setState({
                isOpenLobbyCreateSnackbar: true,
            })
    }

    handleCloseLobbyCreateSnackbar() {
        this.setState({
            isOpenLobbyCreateSnackbar: false,
        })
    }

    showSnackbar(message, type) {

        return SnackbarAlert({close: this.closeSnackbar, type: type, message: message});
    }

    closeSnackbar() {
        this.handleCloseLobbyCreateSnackbar();
        this.handleCloseSnackbars();
    }

    handleCloseSnackbars() {
        this.setState({
            isOpenLobbyLeaderCantLeaveSnackbar: false,
            isOpenLobbyLeaderCantStartBecauseMissingPlayers: false,
            isOpenLobbyLeaderCantStartBecauseNotAllReady: false,
            isOpenLobbyLeaderCantStartBecauseTooManyPlayers: false,
            isOpenLobbyCreateSnackbar: false,
        })
    }


    // CHAT FUNCTIONALITY

    handleChange(e) {

        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    async sendMessage(message) {
        let audio = new Audio(subtleClick);
        this.playSound(audio);

        try {
            const d = new Date();
            const n = d.getTime();
            const requestBody = JSON.stringify({
                username: localStorage.getItem("name"),
                time: n,
                message: message
            });
            let response = await api.put("/chat/" + this.state.lobbyId, requestBody);
        } catch (error) {
            console.log(error);
        }

    }


    async getMessages() {
        try {
            let response = await api.get("chat/" + this.state.lobbyId);
            this.setState({
                messages: response.data
            });
        } catch (error) {
            console.log(error);
        }

    }

    // Helper function to format date for the chat
    formatDate(date) {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        let formatedDate = hours + ":" + minutes;
        return formatedDate;
    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
    }

    render() {

        return (

            <Container>
                {this.state.isOpenLobbyLeaderCantLeaveSnackbar ? this.showSnackbar("You as lobbyleader can only leave once all other people have left", "error") : null}


                {this.state.isOpenLobbyLeaderCantStartBecauseMissingPlayers ? this.showSnackbar("Not enough people in Lobby (at least " + this.state.minPlayerCounter + " required)", "error") : null}
                {this.state.isOpenLobbyLeaderCantStartBecauseNotAllReady ? this.showSnackbar("You can only start the game once all players are ready!", "error") : null}

                {/*TODO: Write max in snackbar?*/}
                {this.state.isOpenLobbyLeaderCantStartBecauseTooManyPlayers ? this.showSnackbar("Too many people in lobby!", "error") : null}


                <TitleWrapper>
                    <Typography variant="h1" component="h2">
                        Lobby - {this.state.lobbyName}
                    </Typography>

                    <Typography variant="subtitle1" component="h3">
                        The Lobbyleader can start the Game once everyone is ready
                    </Typography>
                </TitleWrapper>


                <Grid container alignItems="center" style={{justifyContent: 'space-between', marginTop: '2em'}}>
                    {/*TODO: Add real chat*/}
                    <ChatWrapper>
                        <Paper style={{height: '100%'}}>
                            {/*<Typography variant="subtitle1" component="h2">*/}
                            {/*    Lobby Chat*/}
                            {/*</Typography>*/}
                            <div style={{height: '82%', overflow: "auto", overflowX: "hidden"}}>
                                <ul className="message-list" style={{}}>
                                    {this.state.messages.map((message, index) => {
                                        let date = new Date(message.time);
                                        let dateFormated = this.formatDate(date);
                                        return (

                                            <li className="message">
                                                <div>{message.username + " - " + dateFormated}</div>
                                                <div>{message.message}</div>


                                            </li>
                                        )
                                    })}
                                    <div style={{float: "left", clear: "both"}}
                                         ref={(el) => {
                                             this.messagesEnd = el;
                                         }}>
                                    </div>
                                </ul>
                            </div>

                            <div>
                                <form
                                    onSubmit={this.handleSubmit}
                                >
                                    <TextField
                                        style={{padding: '0.6em'}}
                                        fullWidth
                                        margin="normal"
                                        id="standard-basic"
                                        onChange={this.handleChange}
                                        value={this.state.message}
                                        placeholder="Type your message and hit ENTER"
                                        variant="outlined"
                                    />
                                </form>
                            </div>
                        </Paper>
                    </ChatWrapper>

                    {this.state.isOpenLobbyCreateSnackbar ? this.showSnackbar("Lobby created!", "good") : null}
                    <Paper style={{
                        height: '100%', width: '70%', color: 'white',
                        textAlign: 'center',
                    }}>
                        <LobbyWrapper>

                            <h2> Lobby Name: {this.state.lobbyName}</h2>

                            {this.showPlayers()}

                            <ButtonContainer>
                                <Button color="secondary" variant="contained" size="lg" block onClick={this.leaveLobby}
                                        style={{marginRight: '2em'}}>
                                    Leave Lobby
                                </Button>
                                {this.state.isLobbyLeader ?
                                    <Button color="primary" variant="contained" size="lg" block onClick={this.startGame}
                                            active>
                                        Start Game
                                    </Button> :
                                    null}

                            </ButtonContainer>


                        </LobbyWrapper>
                    </Paper>
                </Grid>

            </Container>
        );
    }
}

export default withRouter(LobbyPage);
