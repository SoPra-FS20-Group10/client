import React from "react";

import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LobbylistEntry from "../overview/LobbylistEntry";
import Modal from "react-modal";
import {CloseButton} from "react-bootstrap";
import LobbyList from "../overview/Lobbylist";
import PlayerBar from "./PlayerBar";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  margin: 0;
  
 
`;

const LobbyContainer = styled.div`

`;

const ChatWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
padding: 5%;
width: 25%;
height: 400pt; 
background: grey;
float:left;
`;

const LobbyWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
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
            minPlayerCounter: 1,
            isLobbyLeader: false
        };

        this.leaveLobby=this.leaveLobby.bind(this);
        this.fetchLobbyPlayers=this.fetchLobbyPlayers.bind(this);
        this.startGame=this.startGame.bind(this);
        this.countLobbyPlayers=this.countLobbyPlayers.bind(this);
        this.checkLobbyLeader=this.checkLobbyLeader.bind(this);
        this.allPlayersReady=this.allPlayersReady.bind(this);
        this.goToBoard=this.goToBoard.bind(this);
        this.checkStartGame=this.checkStartGame.bind(this);
        this.checkInLobby=this.checkInLobby.bind(this);

    }



    async componentDidMount() {

        try {
            setInterval(async () => {
                this.fetchLobbyPlayers();
                this.checkLobbyLeader();
                this.checkStartGame();
                this.checkInLobby();
            }, 500);
        } catch(e) {
            console.log(e);
        }
    }

    async fetchLobbyPlayers(){

        try {

            const response = await api.get("/games/" + this.state.lobbyId + "/players");
            this.setState({lobbyPlayers: response.data})
            this.countLobbyPlayers();
        }
        catch(error){
            console.log(error);
        }
    }

    countLobbyPlayers(){

        let nrPlayers = this.state.lobbyPlayers.length;
        this.setState({
            lobbyPlayerNumber: nrPlayers
        })
    }

    checkInLobby(){
        if (this.state.lobbyPlayers) {
            console.log(this.state.lobbyPlayers);
            console.log(localStorage.getItem("current"));
            let isInLobby = false;
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

    showPlayers(){

        if (this.state.lobbyPlayers) {
            let lobbyPlayers = this.state.lobbyPlayers;
            let listPlayers = lobbyPlayers.map((player) =>
                <PlayerBar playerId={player.id} playerName={player.username} readyStatus={player.status} isLobbyLeader={this.state.isLobbyLeader} lobbyId={this.state.lobbyId}/>
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

    async leaveLobby(){

        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
        });
        const headers = {
            'Authorization': null,
        };
        try {
            // Log out user in backend
            await api.delete("/games/" + this.state.lobbyId + "/players/" + localStorage.getItem("current"), {data: requestBody});
            this.props.history.push(
                {
                    pathname: `/game/overview/`,
                    state: {
                        playerId: this.state.playerId,
                        playerName: this.state.playerName
                    }
                });
        }
        catch(error){
            console.log(error);
        }
    }

    checkLobbyLeader(){

        if(this.state.ownerId) {

            this.setState({
                isLobbyLeader: true
            })
        }
    }

    async startGame(){

        let allReady = this.allPlayersReady();
        if (this.state.lobbyPlayerNumber > this.state.maxPlayerCounter){
            alert("Too many people in lobby");
        }
        if (this.state.lobbyPlayerNumber < this.state.minPlayerCounter){
            alert("Not enoguh people in Lobby (at least" + this.state.minPlayerCounter + "required)");
        }
        else if (!allReady){
            alert("Not all players are ready!");
        }

        // If all conditions to start a game are met, start the game and tell the backend.
        else{
            const requestBody = JSON.stringify({
                token: localStorage.getItem("token"),
            });
            try{
                console.log(this.state.lobbyId);
                // Start game in backend
                await api.put("/games/" + this.state.lobbyId, requestBody);

               this.goToBoard();

            }catch(error){
                console.log(error);
            }
        }
    }

    allPlayersReady (){

        let allReady = true;
        this.state.lobbyPlayers.map((player) => {

            if(player.status !== "READY"){
                allReady = false;
            }
        });
        return allReady;
    }

    // Redirect player to the board
    async goToBoard(){
        // Redirect to board

        localStorage.setItem("currentGame", this.state.lobbyId);

        this.props.history.push(
            {
                pathname: `/game/board/`,
                gameId: this.state.lobbyId
            });
    }

    // Check if the game had started, if yes --> redirect the player to the board

    async checkStartGame(){

        let response = await api.get("/games");
        let currentGames = response.data;
        currentGames.map((game) =>{
           if(game.id === this.state.lobbyId){
               if (game.status === "RUNNING"){
                   this.goToBoard();
               }
           }
        }
        );
    }


    render() {



        return (

            <Container>

                <ChatWrapper>
                    <h2>This would be the chat</h2>
                </ChatWrapper>

                <LobbyWrapper>

                    <h2> Lobby Name: {this.state.lobbyName}</h2>

                    {this.showPlayers()}

                    <view style={{margin: 40}}/>

                    <ButtonContainer2>
                        <Button variant="dark" size="sm" block onClick={this.leaveLobby}>
                            Leave Lobby
                        </Button>
                        {this.state.isLobbyLeader?<Button variant="dark" size="sm" block onClick={this.startGame} active>
                            Start Game
                        </Button>:
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
