import React from "react";

import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Button} from '../../views/design/Button';
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
import "./styles/chat.css"
import subtleClick from "../../sounds/subtle_click.wav";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  // margin: 0;
  width: 80%
  max-width: none;
  margin-right: 5%;
  margin-left: 5%;
 
`;

const LobbyContainer = styled.div`

`;

const ChatWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
width: 25%;
height: 325pt; 
float:left;
`;

const LobbyWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;

margin-right: 5%;
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
            message: ""
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
            }, 500);
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
            this.setState({lobbyPlayers: response.data})
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
        console.log('check')
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
                window.location.reload();
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
        const headers = {
            'Authorization': null,
        };
        try {
            let audio = new Audio(subtleClick);
            this.playSound(audio);

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
            alert("Too many people in lobby");
        }
        if (this.state.lobbyPlayerNumber < this.state.minPlayerCounter) {
            alert("Not enoguh people in Lobby (at least" + this.state.minPlayerCounter + "required)");
        } else if (!allReady) {
            alert("Not all players are ready!");
        }



        // If all conditions to start a game are met, start the game and tell the backend.
        else {
            const requestBody = JSON.stringify({
                token: localStorage.getItem("token"),
            });
            try {
                console.log(this.state.lobbyId);
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

    showSnackbar() {
        return SnackbarAlert({close: this.closeSnackbar, type: "good", message: "Lobby created!"});
    }

    closeSnackbar() {
        this.handleCloseLobbyCreateSnackbar();
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

                {/*TODO: Add real chat*/}
                <ChatWrapper>
                    <Title/>
                    <ul className="message-list">
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
                    </ul>
                    <form
                        onSubmit={this.handleSubmit}
                        className="send-message-form">
                        <input
                            onChange={this.handleChange}
                            value={this.state.message}
                            placeholder="Type your message and hit ENTER"
                            type="text"/>
                    </form>
                </ChatWrapper>


                {this.state.isOpenLobbyCreateSnackbar ? this.showSnackbar() : null}

                <LobbyWrapper>

                    <h2> Lobby Name: {this.state.lobbyName}</h2>

                    {this.showPlayers()}

                    <view style={{margin: 40}}/>

                    <ButtonContainer2>
                        <Button variant="dark" size="sm" block onClick={this.leaveLobby}>
                            Leave Lobby
                        </Button>
                        {this.state.isLobbyLeader ?
                            <Button variant="dark" size="sm" block onClick={this.startGame} active>
                                Start Game
                            </Button> :
                            <Button variant="dark" size="sm" block onClick={this.startGame} disabled>
                                Start Game
                            </Button>}

                    </ButtonContainer2>

                </LobbyWrapper>


            </Container>
        );
    }
}

export default withRouter(LobbyPage);
