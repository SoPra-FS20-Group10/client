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
import NameLengthChecker from "../shared/Other/NameLengthChecker";


const ScoreBoardWrapper = styled.div`
    border-radius: 4pt;
    padding-top:10pt;
    padding-bottom:10pt;
    
    margin: 0pt;
    width: 100%;
    
    // background: rgba(77, 77, 77, 0.9);
    
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Score = styled.label`
    padding-bottom: 5pt;
    margin: 0pt;
    width: 100%;
    font-size: 10px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Username = styled.label`
    padding-top: 5pt;
    margin: 0pt;
    width: 100%;
    font-size: 20px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HighlightWrapper = styled.div`
    border-radius: 4pt;
    padding-left: 1.5em;
    padding-right: 1.5em;
    border: 1px solid black;
   
`;


const UsernameHighlighted = styled.label`
    padding-top: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 20px;
    
    // background: rgba(150, 150, 150, 0.9);
    
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ScoreHighlighted = styled.label`
    padding-bottom: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 10px;
    
    // background: rgba(150, 150, 150, 0.9);
    
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// TODO: Sort playerlist by score
class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerId: this.props.currentPlayerId,
            players: this.props.players
        };
    }

    componentDidMount() {
        this.setState({
            currentPlayerId: this.props.currentPlayerId,
            players: this.props.players
        })

        this.timerID = setInterval(() => {
            this.setState({
                currentPlayerId: this.props.currentPlayerId,
                players: this.props.players
            })
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // async componentDidMount() {
    //     try {
    //         setInterval(async () => {
    //             this.fetchPlayers();
    //             console.log(this.state);
    //         }, 500);
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     console.log(this.state);
    //
    // }
    //
    // async fetchPlayers() {
    //     try {
    //         let response = await api.get("/games/" + this.state.gameId + "/players/");
    //         let players = response.data;
    //         this.setState({
    //             players: players,
    //         })
    //
    //     }catch(error){
    //         console.log(error);
    //     }
    // }


    render() {
        return (
            <ScoreBoardWrapper  style={{
                // These style attributes make text unselectable on most browsers & versions
                userSelect: 'none',
                webkitTouchCallout: 'none',
                webkitUserSelect: 'none',
                khtmlUserSelect: 'none',
                mozUserSelect: 'none',
                msUserSelect: 'none'
            }}>
                {(!this.state.players || !this.state.currentPlayerId )? (
                    <Spinner/>
                ) : (
                    <div>
                        {this.state.players.map(player => {
                            return (
                                <div>
                                    {this.state.currentPlayerId == player.id ? (
                                    <HighlightWrapper key={player.id} >
                                        <Row >
                                            <UsernameHighlighted> {NameLengthChecker(player.username)}</UsernameHighlighted>
                                        </Row>
                                        <Row className='text-center'>
                                            <ScoreHighlighted>Points: {player.score}</ScoreHighlighted>
                                        </Row>
                                    </HighlightWrapper>
                                ) : (
                                    <div key={player.id}>
                                        <Row>
                                            <Username> {NameLengthChecker(player.username)}</Username>
                                        </Row>
                                        <Row className='text-center'>
                                            <Score>Points: {player.score}</Score>
                                        </Row>
                                    </div>
                                )}
                                </div>
                            )
                                ;
                        })}</div>
                )}
            </ScoreBoardWrapper>
        );
    }

}

export default ScoreBoard;
