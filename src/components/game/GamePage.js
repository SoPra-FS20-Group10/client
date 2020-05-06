import React from 'react';
import styled from 'styled-components';
import {api} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {DndProvider} from "react-dnd";
import Backend, {NativeTypes} from "react-dnd-html5-backend"
import ScoreBoard from "./ScoreBoard";
import Modal from "react-modal";
import Grid from "@material-ui/core/Grid";
import Square from "./Square";
import LetterBox from "./LetterBox";
import ItemTypes from "./ItemTypes";
import PIECE from "../shared/Other/Pieces";
import TILES from "../shared/Other/Tiles";
import FakePiece from "./FakePiece";
import Form from "react-bootstrap/Form";
import Piece from "../shared/models/Piece";
import CompletedWords from "./CompletedWords";
import PieceCounter from "./PieceCounter";
import {Scrollbars} from 'react-custom-scrollbars';
import {Alert, SnackbarAlert} from "../shared/Other/SnackbarAlert";
import Tooltip from "@material-ui/core/Tooltip";
import 'react-spring';
import {turnAnimation} from "./TurnAnimation";
import {Transition, animated} from 'react-spring/renderprops'
import "./styles/turn.css"

// const Container = styled(BaseContainer)`
//     color: white;
//     text-align: center;
//     width:100%;
//     padding:0;
// `;

const BoardWrapper = styled.div`
    border-radius: 4pt;
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
    border-radius: 4pt;

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
    display: flex;
    justify-content: space-between;
    flex: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-right: 2em;
    padding-bottom: 1em;
`;

const DeckWrapper = styled.div`
    border-radius: 4pt;
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
        },
        bottom: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 36
        },
        elementtosticktobottom: {
            position: 'absolute',
            bottom: 0,
        }

    }
;


class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenGameStartSnackbar: false,
            isOpenExchangePieceSnackbar: false,
            isOpenTurnStartSnackbar: false,
            isOpenTurnEndSnackbar: false,
            isOpenInvalidMoveSnackbar:false,
            myTurn: false,
            placedLetters: [],
            placedLettersCoordinates: [],
            currentPlayer: null,
            players: null,
            showModal: false,
            // TODO: Replace placeholder
            // playerId: this.props.location.state.playerId,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            stones: null,
            gameStatus: null,
            words: null,
            showMainPage: true,
            showLeaderboard: false,
            showProfile: false,
            placedFirstLetter: false,
            check: [false, false, false, false, false, false, false],
            checkBoxes: [{checked: false}, {checked: true}, {checked: false},
                {checked: false}, {checked: false}, {checked: false}, {checked: false}],
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
            pieceBag: null,
            show:true,

        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.isDropped = this.isDropped.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.testPutStone = this.testPutStone.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.getPlayerStones = this.getPlayerStones.bind(this);
        this.initBoard = this.initBoard.bind(this);
        this.initPieceBag = this.initPieceBag.bind(this);
        this.getPieceById = this.getPieceById.bind(this);
        this.handleCloseModalAbort = this.handleCloseModalAbort.bind(this);
        this.handleCloseModalExchange = this.handleCloseModalExchange.bind(this);
        this.exchangePieces = this.exchangePieces.bind(this);
        this.placeLetter = this.placeLetter.bind(this);
        this.endTurn = this.endTurn.bind(this);
        this.getCurrentPlayer = this.getCurrentPlayer.bind(this);
        this.showScoreBoard = this.showScoreBoard.bind(this);
        this.endGameShortcut = this.endGameShortcut.bind(this);
        this.checkFirstLetterSet = this.checkFirstLetterSet.bind(this);
        this.handleOpenGameStartSnackbar=this.handleOpenGameStartSnackbar.bind(this);
        this.handleCloseSnackbars=this.handleCloseSnackbars.bind(this);
        this.showSnackbar=this.showSnackbar.bind(this);
        this.closeSnackbar=this.closeSnackbar.bind(this);
        this.checkTurn=this.checkTurn.bind(this);
        this.showPlayerTurn=this.showPlayerTurn.bind(this);
    }


    componentDidMount() {
        this.getPlayers();
        this.getBoard();
        this.getPlayerStones();
        this.getGameInfo();
        this.checkFirstLetterSet();
        this.handleOpenGameStartSnackbar();
        try {
            setInterval(async () => {
                this.checkTurn();
                this.getPlayers();
                // this.getCurrentPlayer();
                this.getGameInfo();
                this.checkFirstLetterSet();
                if (this.state.gameStatus == "ENDED") {
                    this.goToEndscreen();
                }
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    checkTurn() {

        // show snackbar if not yet shown
        if (this.state.currentPlayer === Number(localStorage.getItem("current")) && !this.state.myTurn) {
            this.setState({
               myTurn:true
            });
            return true;
        } else if (this.state.currentPlayer !== Number(localStorage.getItem("current")) && this.state.myTurn){
            this.setState({
                myTurn: false,
            });
    }
    }

    showPlayerTurn(){
        if(this.state.myTurn){
            let toggle = e => this.checkTurn()? this.setState(state => ({ show: !state.show })):null;
                return (
                    <div className="reveals-main">
                        <Transition
                            native
                            items={this.state.show}
                            from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
                            enter={[{ height: 'auto' }]}
                            leave={{ height: 0 }}>
                            {show =>
                                show && (props => <animated.div style={props}>YOUR TURN</animated.div>)
                            }
                        </Transition>
                    </div>)
        }
        else{
            return(<div></div>)
        }
    }


    checkFirstLetterSet(){
        let isSet = false;
        let board = this.state.board;
        board.map((col, i) => {
            col.map((stone, j) => {
                if(stone.piece != null){
                    isSet = true;
                }
            });
        });
        this.setState({
           placedFirstLetter: isSet,
        });
        return isSet;
    }

    goToEndscreen() {
        this.props.history.push({
            pathname: '/game/endscreen',
            state: {
                playerId: this.props.playerId
            }
        });
    }

    // Initializing a bag with all the letters (lookup)
    initPieceBag() {

        let pieceBag = [];
        let id = 0;
        for (let i = 0; i < 10; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.B.text, score: PIECE.B.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.C.text, score: PIECE.C.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.D.text, score: PIECE.D.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 13; i++) {
            let piece = new Piece({id: id, text: PIECE.E.text, score: PIECE.E.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.F.text, score: PIECE.F.score});
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 4; i++) {
            let piece = new Piece({id: id, text: PIECE.G.text, score: PIECE.G.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.H.text, score: PIECE.H.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 10; i++) {
            let piece = new Piece({id: id, text: PIECE.I.text, score: PIECE.I.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.J.text, score: PIECE.J.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.K.text, score: PIECE.K.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.L.text, score: PIECE.L.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.M.text, score: PIECE.M.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 7; i++) {
            let piece = new Piece({id: id, text: PIECE.N.text, score: PIECE.N.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 9; i++) {
            let piece = new Piece({id: id, text: PIECE.O.text, score: PIECE.O.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.P.text, score: PIECE.P.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.Q.text, score: PIECE.Q.score})
            pieceBag.push(piece);
            id++;
        }
        for (let i = 0; i < 7; i++) {
            let piece = new Piece({id: id, text: PIECE.R.text, score: PIECE.R.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.S.text, score: PIECE.S.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 7; i++) {
            let piece = new Piece({id: id, text: PIECE.T.text, score: PIECE.T.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.U.text, score: PIECE.U.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.V.text, score: PIECE.V.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.W.text, score: PIECE.W.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.X.text, score: PIECE.X.score})
            pieceBag.push(piece);
            id++;
        }
        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.Y.text, score: PIECE.Y.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.Z.text, score: PIECE.Z.score})
            pieceBag.push(piece);
        }

        this.setState({
            pieceBag: pieceBag,

        }, () => {
            console.log(this.state);
        });
    }

    getPieceById(id) {
        return this.state.pieceBag[id];

    }

    showScoreBoard() {

        return (<ScoreBoard gameId={this.state.gameId} currentPlayerId={this.state.currentPlayer}/>)

    }

    async getCurrentPlayer() {

        let response = await api.get("/games/" + localStorage.getItem("currentGame"));

        let currentPlayer = response.data.currentPlayerId;
        console.log(currentPlayer);
        this.setState({
            currentPlayer: currentPlayer,
        });
        console.log(this.state);

    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModalAbort() {
        this.setState({showModal: false, check: [false, false, false, false, false, false, false]});
    }

    // TODO: Remove shortcut after presentation
    async endGameShortcut() {
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
        });

        console.log(requestBody);
        try {
            await api.patch("/games/" + localStorage.getItem("currentGame") , requestBody);
        } catch (error) {
            console.log(error);
        }
    }

    async getPlayerStones() {
        try {
            let response = await api.get("/games/" + this.state.gameId + "/players/" + localStorage.getItem("current") + "/bag");
            let playerStonesList = response.data;
            let playerStonesBag = [];

            playerStonesList.map((stone, index) => {

                playerStonesBag[index] = {piece: {id: stone.id, score: stone.value, text: stone.symbol.toUpperCase()}}
            });
            this.setState({
                boxes: playerStonesBag,
            });

        } catch (error) {
            console.log(error);
        }
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
        return this.state.droppedBoxNames.indexOf(piece.text) > -1;
    }

    placeLetter(piece, index) {


        let placedLetters = this.state.placedLetters;
        let placedLettersCoordinates = this.state.placedLettersCoordinates;

        placedLetters.push(piece.id);
        placedLettersCoordinates.push(index);

        this.setState({
            placedLetters: placedLetters,
            placedLettersCoordinates: placedLettersCoordinates
        });

    }

    // Helper function to get 1d Array index from 2d Array indexes
    toOneDimension(i, j) {
        return i * 15 + (j % 15);
    }


// Update board state when letter is dropped
    handleDrop(i, j, item) {
        if (this.state.currentPlayer == this.state.playerId) {
            //get current letters the user had in his bag (1d Array)
            let currentPieces = this.state.boxes;
            currentPieces.map((letter, index) => {

                if (letter.piece.id === item.piece.id) {
                    // The 1d index for the backend
                    let indexInOneDimension = this.toOneDimension(i, j);
                    this.placeLetter(letter.piece, indexInOneDimension);

                    currentPieces.splice(index, 1);
                }
            });

            this.setState({
                boxes: currentPieces,
            });

            let newArray = this.state.board;
            let row = newArray[i];
            let letterBox = row[j];
            letterBox.piece = item.piece;
            this.setState({
                board: newArray,
            });
        }
    }

    async getPlayers() {
        try {
            let response = await api.get("/games/" + this.state.gameId + "/players/");

            let players = response.data;

            this.setState({
                players: players,
            })
        } catch (error) {

        }
    }

    async getBoard() {

        let response = await api.get("/games/" + this.state.gameId);
        let board = response.data.board;
        let newBoard = this.oneDimToTwoDim(board);

        this.initBoard(newBoard);
        this.setState({});

    }

    async getGameInfo() {
        let response = await api.get("/games/" + this.state.gameId);

        // Calls that are only made when a new turn begins
        if (response.data.currentPlayerId != this.state.currentPlayer) {

            let board = response.data.board;
            let newBoard = this.oneDimToTwoDim(board);
            this.initBoard(newBoard);
            this.setState({});

            this.getPlayerStones();
            // this.getBoard();
        }

        this.setState({
            words: response.data.words, currentPlayer: response.data.currentPlayerId, stones: response.data.stones,
            gameStatus: response.data.status
        });
    }

    //TODO: Still needed?
    async testPutStone() {
        console.log(localStorage.getItem("current"));
        console.log(this.state.currentPlayer);
        console.log(this.state.currentPlayer === localStorage.getItem("current"));
    }


    initBoard(board) {

        // create board
        let updatedBoard = this.state.board;

        board.map((col, i) => {
            col.map((stone, j) => {
                if (stone.stoneSymbol == null) {
                    updatedBoard[i][j].piece = null;
                } else {
                    updatedBoard[i][j].piece = {text: stone.stoneSymbol.toUpperCase(), score: stone.value};
                }
            });
        });

        this.setState({
            board: updatedBoard,
        });

    }


    oneDimToTwoDim(board) {
        let newBoard = new Array(15);

        // Loop to create 2D array using 1D array
        for (let i = 0; i < newBoard.length; i++) {
            newBoard[i] = new Array(15);
        }
        board.map((tile, index) => {
            let column = index % 15;
            let row = Math.floor(index / 15);
            newBoard[row][column] = tile;
        });
        return newBoard;
    }

    handleChange(key, event) {
        let s = this.state.check;
        s[key] = event.target.checked;
        this.setState({check: s});
        // console.log(this.state.check)
    }

    async exchangePieces() {
        let exchangeIndices = [];
        let stoneIds = [];
        for (let i = 0; i < this.state.check.length; i++) {
            if (this.state.check[i]) {
                exchangeIndices.push({index: i, id: this.state.boxes[i].piece.id});
                stoneIds.push(this.state.boxes[i].piece.id)
            }
        }

        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
            stoneIds: stoneIds
        });
        try {
            await api.put("/games/" + this.state.gameId + "/players/" + this.state.playerId + "/exchange", requestBody);
            this.setState({isOpenExchangePieceSnackbar: true});
            this.endTurn();
        } catch (error) {
            alert("Could not exchange the pieces.");
        }

        await this.getPlayerStones();
    }


    async endTurn() {
        // end turn, push all changes to the backend and draw stones


        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
            stoneIds: this.state.placedLetters,
            coordinates: this.state.placedLettersCoordinates
        });

        try {
            await api.put("/games/" + localStorage.getItem("currentGame") + "/players/" + localStorage.getItem("current"), requestBody);

        } catch (error) {
            this.setState({
                isOpenInvalidMoveSnackbar:true
            })
            console.log(error);
            this.getBoard();
            this.getPlayerStones();
        }
    }

    async handleCloseModalExchange() {
        this.exchangePieces();
        this.getPlayerStones();
        this.setState({showModal: false, check: [false, false, false, false, false, false, false]});
    }

    handleOpenGameStartSnackbar(){
            this.setState({
                isOpenGameStartSnackbar: true,
            })
    }
    /*
    handleOpenGameStartSnackbar(){
        this.setState({
            isOpenExchangePieceSnackbar: true,
        })
    }
    handleOpenGameStartSnackbar(){
        this.setState({
            isOpenTurnStartSnackbar: true,
        })
    }
    handleOpenGameStartSnackbar(){
        this.setState({
            isOpenTurnEndSnackbar: true,
        })
    }
    handleOpenGameStartSnackbar(){
        this.setState({
            isOpenInvalidMoveSnackbar: true,
        })
    }
    */
    handleCloseSnackbars(){
        this.setState({
            isOpenGameStartSnackbar: false,
            isOpenExchangePieceSnackbar: false,
            isOpenTurnStartSnackbar: false,
            isOpenTurnEndSnackbar: false,
            isOpenInvalidMoveSnackbar:false
        })
    }


    showSnackbar(message, type){

        return SnackbarAlert({close:this.closeSnackbar, type:type ,message: message});

    }
    closeSnackbar(){
        this.handleCloseSnackbars();
    }

    render() {

        const {board} = this.state;

        return (
            <Container>

                {this.state.isOpenGameStartSnackbar? this.showSnackbar("Game started", "info"): null}
                {this.state.isOpenExchangePieceSnackbar? this.showSnackbar("Pieces exchanged - your turn ends", "info"): null}

                {this.state.isOpenTurnEndSnackbar? this.showSnackbar("Your turn is over", "info"): null}
                {this.state.isOpenInvalidMoveSnackbar? this.showSnackbar("Your move was invalid", "error"): null}

                <Row className="justify-content-md-center">
                    <Col className="py-2 px-0" md="auto">
                        <SideWrapper>
                            <div style={{
                                // These style attributes make text unselectable on most browsers & versions
                                userSelect: 'none',
                                webkitTouchCallout: 'none',
                                webkitUserSelect: 'none',
                                khtmlUserSelect: 'none',
                                mozUserSelect: 'none',
                                msUserSelect: 'none'
                            }}>
                                Remaining Stones
                            </div>
                            <Row>
                                <Col>
                                    <PieceCounter style={{
                                        // These style attributes make text unselectable on most browsers & versions
                                        userSelect: 'none',
                                        webkitTouchCallout: 'none',
                                        webkitUserSelect: 'none',
                                        khtmlUserSelect: 'none',
                                        mozUserSelect: 'none',
                                        msUserSelect: 'none'
                                    }} piecesLeft={this.state.stones}/>
                                </Col>
                            </Row>

                            <div style={{
                                // These style attributes make text unselectable on most browsers & versions
                                userSelect: 'none',
                                webkitTouchCallout: 'none',
                                webkitUserSelect: 'none',
                                khtmlUserSelect: 'none',
                                mozUserSelect: 'none',
                                msUserSelect: 'none'
                            }}>
                                Played Words
                            </div>

                            <Scrollbars
                                // This will activate auto-height
                                autoHeight
                                autoHeightMin={550}
                                autoHeightMax={590}
                                renderTrackVertical={this.renderTrackVertical}

                                renderThumbVertical={this.renderThumbVertical}
                                style={{overflow: 'hidden'}}
                            >
                                {/*<CompletedWords gameId={this.state.gameId}/>*/}
                                <CompletedWords style={{
                                    // These style attributes make text unselectable on most browsers & versions
                                    userSelect: 'none',
                                    webkitTouchCallout: 'none',
                                    webkitUserSelect: 'none',
                                    khtmlUserSelect: 'none',
                                    mozUserSelect: 'none',
                                    msUserSelect: 'none'
                                }} words={this.state.words}/>
                            </Scrollbars>

                        </SideWrapper>
                    </Col>

                    <Col className="p-2" md="auto">
                        <BoardWrapper style={{
                            // These style attributes make text unselectable on most browsers & versions
                            userSelect: 'none',
                            webkitTouchCallout: 'none',
                            webkitUserSelect: 'none',
                            khtmlUserSelect: 'none',
                            mozUserSelect: 'none',
                            msUserSelect: 'none'
                        }}>
                            <DndProvider backend={Backend}>
                                <div>
                                    <Grid container className="flex-grow-1" spacing={0}>

                                        {board.map((row, i) => (
                                            <Grid item xs={12} key={i} container justify="center" spacing={0}>
                                                {row.map((col, j) => (
                                                    <Grid key={j} item>
                                                        <Square props={col} row={i} column={j} placedFirstLetter={this.state.placedFirstLetter}
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
                            <div style={{
                                // These style attributes make text unselectable on most browsers & versions
                                userSelect: 'none',
                                webkitTouchCallout: 'none',
                                webkitUserSelect: 'none',
                                khtmlUserSelect: 'none',
                                mozUserSelect: 'none',
                                msUserSelect: 'none'
                            }}>
                                Scoreboard
                            </div>
                            <ScoreBoard style={{
                                // These style attributes make text unselectable on most browsers & versions
                                userSelect: 'none',
                                webkitTouchCallout: 'none',
                                webkitUserSelect: 'none',
                                khtmlUserSelect: 'none',
                                mozUserSelect: 'none',
                                msUserSelect: 'none'
                            }} currentPlayerId={this.state.currentPlayer} players={this.state.players}/>

                            {/*TODO: Remove shortcut after presentation*/}
                            <Tooltip title="End Game prematurely">
                                <Button variant="success" size="sm" block onClick={this.endGameShortcut} style={{marginTop:"20pt"}}>
                                    End Game
                                </Button>
                            </Tooltip>


                            <Tooltip title="Reset your placed letters">
                                <Button variant="dark" size="sm" block onClick={() => { this.getBoard(); this.getPlayerStones();}}
                                        disabled={!(this.state.currentPlayer === Number(localStorage.getItem("current")))}>
                                    Reset
                                </Button>
                            </Tooltip>

                                <Tooltip title="Swap letters (ends your turn)">
                                    <Button variant="dark" size="sm" block onClick={this.handleOpenModal}
                                            disabled={this.state.placedLetters.length !== 0 || !(this.state.currentPlayer === Number(localStorage.getItem("current")))}>
                                        Swap
                                    </Button>
                                </Tooltip>


                                <view style={{margin: 4}}/>
                            <Tooltip title="End your turn">
                                <Button variant="dark" size="sm" block onClick={this.endTurn}
                                        disabled={!(this.state.currentPlayer === Number(localStorage.getItem("current")))}>
                                    End Turn
                                </Button>
                            </Tooltip>

                            {this.showPlayerTurn()}
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
                                    onChange={this.handleChange.bind(this, index)}
                                    style={{
                                        position: "relative",
                                        left: "-21pt",
                                        top: "28pt"
                                    }}/>
                            </Form.Group>
                        ))}

                    </Form>
                    <Button variant="success" size="sm" onClick={this.handleCloseModalExchange}>
                        Exchange
                    </Button>
                    <view style={{margin: 140}}/>
                    <Button variant="danger" size="sm" onClick={this.handleCloseModalAbort}>
                        Cancel
                    </Button>

                </Modal>
            </Container>
        );
    }
}

export default withRouter(GamePage);
