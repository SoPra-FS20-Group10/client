import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

const ScoreBoardEntryWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 100%;
    
    background: rgba(77, 77, 77, 0.7);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ScoreBoardWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 100%;
    
    background: rgba(77, 77, 77, 0.7);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Score = styled.label`
    padding-bottom: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 10px;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Username = styled.label`
    padding-top: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 20px;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;


class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            readyStatus: this.props.readyStatus,
            playerId: this.props.playerId,
            playerName: this.props.playerName,
        };

    }


    async componentDidMount() {
        try {
            setInterval(async () => {
                this.fetchPlayers();
            }, 500);
        } catch (e) {
            console.log(e);
        }

    }

    async fetchPlayers() {
        // TODO: Remove test-setup
        let mode = "teing";
        if (mode == "testing") {
            this.setState({
                players: [
                    {username: "User1", score: 10},
                    {username: "User2", score: 6},
                    {username: "User3", score: 4},
                    {username: "User4", score: 2}
                ]
            })
        } else {
            try {
                const response = await api.get("/games/" + localStorage.getItem("currentGame") + "/players");
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.setState({players: response.data})
            } catch (error) {
                alert(error);
            }
        }
    }


    render() {
        return (
            <Container>

                {!this.state.players ? (
                    <Spinner/>
                ) : (
                    <div>
                        {this.state.players.map(player => {
                            return (
                                <div key={player.id}>
                                    <Row>
                                        <Username> {player.username}</Username>
                                    </Row>
                                    <Row className='text-center'>
                                        <Score>Points: {player.score}</Score>
                                    </Row>

                                </div>


                            );
                        })}</div>
                )}
            </Container>
        );
    }

}

export default ScoreBoard;
