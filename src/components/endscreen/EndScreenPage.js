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

import subtleClick from '../../sounds/subtle_click.wav'

const Container = styled(BaseContainer)`
    color: white;
    text-align: center;
    margin: 0;
`;

const ChatWrapper = styled.div`
    border-radius: 4pt;
    border-radius: 4pt;
    margin-top: 10%;
    margin-left: 5%;
    padding: 5%;
    width: 25%;
    height: 400pt; 
    background: grey;
    float:left;
`;

const PlayerWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 10%;
    margin-left: 5%;
    
    // width: 60%;
    margin-right: 5%;
    width: 90%;
    
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


class EndScreenPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: null,
            gameId: localStorage.getItem("currentGame"),
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            deleteGame: null,
        }

        this.leaveGame = this.leaveGame.bind(this);
        this.fetchPlayers = this.fetchPlayers.bind(this);
        this.fetchPlayers();

    }

    // comparator for sorting players by score
    compare(a, b) {
        if (a.score > b.score) {
            return -1;
        }
        if (a.score < b.score) {
            return 1;
        }
        return 0;
    }

    componentDidMount() {
        this.fetchPlayers();
        try {
            this.timerID = setInterval(async () => {
                    this.fetchPlayers();
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        if (this.state.players) {
            this.deleteGame();
        }
    }

    async deleteGame() {
        await api.delete("/games/" + this.state.gameId);
    }

    async fetchPlayers() {
        try {
            const response = await api.get("/games/" + this.state.gameId + "/players");
            this.setState({players: response.data.sort(this.compare)})
            console.log(this.state.gameId);

        } catch (error) {
            console.log(error);
        }
    }


    showPlayers() {
        if (this.state.players) {
            console.log(this.state.players);
            return (
                <table className="table" id='leaderboard'>
                    <tbody block>
                    {this.renderTableData()}
                    </tbody>
                </table>
            );
        } else {
            return (
                <h1> Waiting For Player Fetching</h1>
            );
        }
    }

    async leaveGame() {
        this.playSound(new Audio(subtleClick));
        let deleteGame = null;
        if (this.state.players.length === 1){
            deleteGame = this.state.gameId;
        }
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token")
        });

        try {
            // Log out user in backend
            await api.delete("/games/" + localStorage.getItem("currentGame") + "/players/" + localStorage.getItem("current"), {data: requestBody});
            localStorage.removeItem("currentGame");

                this.props.history.push(
                {
                    pathname: `/game/overview/`,
                    state: {
                        playerId: this.state.playerId,
                        playerName: this.state.playerName,
                        deleteGame: deleteGame,
                    }
                });
            window.location.reload();

        } catch (error) {
            console.log(error);
        }

    }



    /*
    this.props.history.push(
        {
            pathname: `/game/overview/`,
            state: {
                playerId: localStorage.getItem("current"),
                playerName: localStorage.getItem("name")
            }
        });
}


*/


    renderTableData() {
        return this.state.players.map((data, index) => {
                const {id, username, status, score} = data //destructuring
                if (index == 0) {
                    return (
                        <tr className='winner' key={id}>
                            <td>{id}</td>
                            <td>{username}</td>
                            <td>{status}</td>
                            <td>{score}</td>
                        </tr>

                    )
                } else if (index % 2 == 0) {
                    return (
                        <tr className='light' key={id}>
                            <td>{id}</td>
                            <td>{username}</td>
                            <td>{status}</td>
                            <td>{score}</td>
                        </tr>
                    )
                } else {
                    return (
                        <tr className='dark' key={id}>
                            <td>{id}</td>
                            <td>{username}</td>
                            <td>{status}</td>
                            <td>{score}</td>
                        </tr>
                    )
                }
            }
        )
    }

    playSound(sfx) {
        sfx.play();
        console.log('Started SFX')
        sfx.onended = function () {
            sfx.remove() //Remove when played.
            console.log('Ended SFX')
        };
    }

    render() {
        return (
            <Container>
                {/*TODO: Add real chat*/}
                {/*<ChatWrapper>*/}
                {/*    <h2>This would be the chat</h2>*/}
                {/*</ChatWrapper>*/}

                <PlayerWrapper>
                    <h2> Game Finished!</h2>

                    {this.showPlayers()}

                    <view style={{margin: 40}}/>

                    <ButtonContainer2>
                        <Button variant="dark" size="sm" block onClick={this.leaveGame}>
                            Leave Lobby
                        </Button>
                    </ButtonContainer2>
                </PlayerWrapper>
            </Container>
        );
    }
}

export default withRouter(EndScreenPage);
