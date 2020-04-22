import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "../profile/ProfilePage";
import Leaderboard from "../leaderboard/LeaderboardPage";
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";
import GameBoard from "./GameBoard";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {DndProvider} from "react-dnd";
import Backend, {NativeTypes} from "react-dnd-html5-backend"
import ScoreBoard from "./ScoreBoard";
import Modal from "react-modal";
import {CloseButton} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Square from "./Square";
import LetterBox from "./LetterBox";
import ItemTypes from "./ItemTypes";
import PIECE from "../shared/Other/Pieces";
import TILES from "../shared/Other/Tiles";
import FakePiece from "./FakePiece";
import Form from "react-bootstrap/Form";


// const Container = styled(BaseContainer)`
//     color: white;
//     text-align: center;
//     width:100%;
//     padding:0;
// `;

const BoardWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 500pt;
    height: 550pt;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormGroup = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 500pt;
    height: 550pt;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SideWrapper = styled.div`
    
    padding: 1em;
    width: 150pt;
    height: 100%;
    
    background: rgba(77, 77, 77, 0.5);
    position:relative;
    
    color: white;
    align-items: center;
    justify-content: center;
`;

const PlayerButtons = styled.div`
    
    position: absolute;
    bottom: -470pt;
`;

const DeckWrapper = styled.div`
    margin-top:8pt;
    padding: 1em;
    height: 52pt;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PieceWrapper = styled.div`
    margin: 2pt;
    width: 27pt;
    height: 27pt;
    
    background: white;
    color: black;
    justify-content:center;
    align-items: center;
    display: flex;
`;

const TileWrapper = styled.div`
    margin: 2pt;
    width: 27pt;
    height: 27pt;
   
    background: white;
    color: black;
    justify-content:center;
    align-items: center;
    display: flex;
`;


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "10pt",
        overflow: "none",
        height: "60pt",

        color: 'white',
        background: 'rgba(77, 77, 77, 0.5)'
    }
};

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


            players: null,
            showModal: false,
            // TODO: Replace placeholder
            // playerId: this.props.location.state.playerId,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            showMainPage: true,
            showLeaderboard: false,
            showProfile: false,
            gameId: localStorage.getItem("currentGame"),
            dustbins: [
                {accepts: [ItemTypes.TILE], lastDroppedItem: null},
                {accepts: [ItemTypes.TILE], lastDroppedItem: null},
                {
                    accepts: [ItemTypes.TILE, ItemTypes.GLASS, NativeTypes.URL],
                    lastDroppedItem: null,
                },
                {accepts: [ItemTypes.TILE, NativeTypes.FILE], lastDroppedItem: null},
            ],
            boxes: [
                {piece: PIECE.W},
                {piece: PIECE.E},
                {piece: PIECE.S},
                {piece: PIECE.Q},
                {piece: PIECE.C},
                {piece: PIECE.G},
                {piece: PIECE.F},

            ],
            droppedBoxNames: [],
            board: [
                [{piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.TL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DW
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DW
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.TL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.ST}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.TL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DW
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DW
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.TL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}],
                [{piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}, {
                    piece: null,
                    type: TILES.NT
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {
                    piece: null,
                    type: TILES.DL
                }, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}],
            ],

        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.isDropped = this.isDropped.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.getPlayers = this.getPlayers.bind(this);

    }


    componentDidMount() {
        try {
            setInterval(async () => {
                this.getPlayers();
            }, 5000);
        } catch (e) {
            console.log(e);
        }
    }


    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    drawTile(props) {

        return (
            <TileWrapper style={{
                backgroundColor: props.type.color,
                fontSize: 7,
                borderRadius: '2pt',
                margin: '2pt',
                width: '27pt',
                height: '27pt',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
            >
                {!props.piece ?
                    // if there is no letter on the tile, the tile itself will be rendered
                    <text>{props.type.text}</text> :
                    // if there is a letter on the tile, it will be rendered instead of the tile's text
                    <PieceWrapper style={{
                        backgroundColor: 'white',
                        fontSize: 10,
                        borderRadius: '2pt',
                        width: '20pt',
                        height: '20pt',
                        color: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                    >
                        {props.props.type.text}
                    </PieceWrapper>}


            </TileWrapper>
        );
    }

    isDropped(piece) {


        return this.state.droppedBoxNames.indexOf(piece.text) > -1
    }

// Update board state when letter is dropped
    handleDrop(i, j, item) {

        console.log(localStorage.getItem("current"));
        console.log(this.state.gameId);
        let newArray = this.state.board;
        let row = newArray[i];
        let letterBox = row[j];
        letterBox.piece = item.piece;
        this.setState({
            board: newArray,
        });


    }

    async getPlayers() {
        try {
            let response = await api.get("/games/" + this.state.gameId + "/players/");

            let players = response.data;

            this.setState({
                players: players,
            })

        } catch (error) {
            console.log(error);
        }


    }

    async getBoard() {

        let response = api.get("/games/" + this.state.gameId);
        console.log(this.state.gameId);
        console.log(response);

        let response2 = api.get("/games/" + this.state.gameId + "/players/" + localStorage.getItem("current"));
        console.log(response2);
    }

    render() {

        const {board} = this.state;


        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="py-2 px-0" md="auto">
                        <SideWrapper>
                            <div>Stones left: {10}</div>

                            <div>Played Words</div>
                        </SideWrapper>
                    </Col>

                    <Col className="p-2" md="auto">
                        <BoardWrapper>
                            <DndProvider backend={Backend}>
                                <div>
                                    <Grid container className="flex-grow-1" spacing={0}>

                                        {board.map((row, i) => (
                                            <Grid item xs={12} key={i} container justify="center" spacing={0}>
                                                {row.map((col, j) => (
                                                    <Grid key={j} item>
                                                        <Square props={col} row={i} column={j}
                                                                onDrop={(item) => this.handleDrop(i, j, item)}/>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ))}
                                    </Grid>


                                    <DeckWrapper>

                                        <div style={{overflow: 'hidden', clear: 'both', margin: "auto"}}>
                                            {this.state.boxes.map(({piece}, index) => (
                                                <LetterBox
                                                    piece={piece}
                                                    isDropped={this.isDropped(piece, index)}
                                                    key={index}
                                                />
                                            ))}
                                        </div>
                                    </DeckWrapper>
                                </div>
                            </DndProvider>
                        </BoardWrapper>

                    </Col>

                    <Col className="py-2 px-0" md="auto">
                        <SideWrapper>
                            <Row>
                                <Col className="py-2 px-0">
                                    <ScoreBoard gameId={this.state.gameId}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <PlayerButtons>
                                        <Button variant="dark" size="sm" block onClick={this.handleOpenModal}>
                                            Swap
                                        </Button>
                                        <Button variant="dark" size="sm" block onClick={this.getBoard}>
                                            Test Button to get Board
                                        </Button>
                                    </PlayerButtons>
                                </Col>
                            </Row>
                        </SideWrapper>
                    </Col>
                </Row>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >

                    <Form>
                        {this.state.boxes.map(({piece}, index) => (
                            <Form.Group style={{
                                float: "left"
                            }

                            }>
                                <FakePiece
                                    piece={piece}
                                    key={index}
                                />
                                <Form.Check
                                style={{

                                    position: "relative",
                                    left: "-21pt",
                                    top: "28pt"

                                }}/>
                            </Form.Group>
                        ))}

                    </Form>

                        <Button variant="success" size="sm"  onClick={this.handleCloseModal}>
                            Exchange
                        </Button>
                    <view style={{margin: 140}}/>
                        <Button variant="danger" size="sm"  onClick={this.handleCloseModal}>
                            Cancel
                        </Button>

                </Modal>
            </Container>
        );
    }
}

export default withRouter(GamePage);