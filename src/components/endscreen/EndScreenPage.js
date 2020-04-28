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


class EndScreenPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: null,
            gameId: localStorage.getItem("currentGame"),
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name")
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

    async componentDidMount() {
        try {
            setInterval(async () => {
                this.fetchPlayers();
            }, 5000);
        } catch (e) {
            console.log(e);
        }
    }

    async fetchPlayers() {
        try {
            const response = await api.get("/games/" + this.state.gameId + "/players");
            this.setState({players: response.data.sort(this.compare)})
        } catch (error) {
            alert(error);
        }
    }


    showPlayers() {
        if (this.state.players) {
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

        const requestBody = JSON.stringify({
            token: localStorage.getItem("token")
        });

        console.log({data: requestBody})
        try {
            // Log out user in backend
            await api.delete("/games/" + this.state.gameId + "/players/" + localStorage.getItem("current"),
                {data: requestBody});
            this.props.history.push(
                {
                    pathname: `/game/overview/`,
                    state: {
                        playerId: this.state.playerId,
                        playerName: this.state.playerName
                    }
                });
        } catch (error) {
            alert(error);
        }
    }

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

    render() {
        return (
            <Container>
                <ChatWrapper>
                    <h2>This would be the chat</h2>
                </ChatWrapper>

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