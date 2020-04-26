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
import Piece from "../shared/models/Piece";
import PieceBag from "./PieceBag";


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
            pieceBag: null,

        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.isDropped = this.isDropped.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.testPutStone = this.testPutStone.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.getPlayerStones = this.getPlayerStones.bind(this);
        this.initBoard=this.initBoard.bind(this);
        this.initPieceBag=this.initPieceBag.bind(this);
        this.getPieceById=this.getPieceById.bind(this);

    }


    componentDidMount() {
        try {
            setInterval(async () => {
                this.getPlayers();

            }, 5000);
        } catch (e) {
            console.log(e);
        }
        this.getPlayerStones();
        this.initPieceBag();
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
            id++;}

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
            let piece = new Piece({id:id,text:PIECE.Y.text, score:PIECE.Y.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.Z.text, score: PIECE.Z.score})
            pieceBag.push(piece);
        }

        this.setState({

            pieceBag:pieceBag,

        }, () => {
            console.log(this.state)});
    }

    getPieceById(id){

        return this.state.pieceBag[id];

    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    async getPlayerStones(){
        try{
            let response = await api.get("/games/"+ this.state.gameId + "/players/"+localStorage.getItem("current") +"/bag");
            let playerStonesList = response.data;
            let playerStonesBag = [];
            let pieceBag = this.state.pieceBag;


            playerStonesList.map((stone, index) => {
                let piece =this.getPieceById(stone.id);

                playerStonesBag[index] = {piece: {id:piece.id, score:piece.score, text:piece.text}}
            });
            this.setState({
                boxes: playerStonesBag,
            });

        }catch(error){
            console.log(error);
        }
    }

    removeStone(){
        console.log(this.state.boxes);

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

// Update board state when letter is dropped
    handleDrop(i, j, item) {

        //get current letters
        let currentPieces = this.state.boxes;
        currentPieces.map((letter, index) => {

            if(letter.piece.text === item.piece.text){
                currentPieces.splice(index,1);
            }
        });

        this.setState({
            boxes:currentPieces,
        });

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

        }
    }

    async getBoard() {

        let response = await api.get("/games/" + this.state.gameId);

        let board = response.data;
        let newBoard = this.oneDimToTwoDim(board);
        this.initBoard(newBoard);

        this.setState({

        });


    }

    async testPutStone() {
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token"),
            stoneIds: [136]
        });
        try {
            await api.put("/games/" + this.state.gameId + "/players/"+localStorage.getItem("current")+"/exchange", requestBody);

        }catch(error){
            alert("Could not put the pieces.");
        }
    }


    initBoard(board){

        // create board
        let newBoard = this.state.board;

        board.map((col, i) => {
            board.map((tile, j) => {
                let letter = new Piece(tile);

                if(letter.text == null) {
                    newBoard[i][j].piece = null;
                }else {
                    newBoard[i][j].piece = {text: letter.text, id: letter.id, score: letter.score};
                }
            });
        });

        this.setState({
            board:newBoard,
        })

    }


    oneDimToTwoDim(board){
        let newBoard = new Array(15);

        // Loop to create 2D array using 1D array
        for (let i = 0; i < newBoard.length; i++) {
            newBoard[i] = new Array(15);
        }
        board.map((tile, index) => {
            let column = index % 15;
            let row = Math.floor(index/15);
            newBoard[row][column] = tile;
        });
        return newBoard;
    }

    async endTurn(){
        // end turn, push all changes to the backend and draw stones
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
                                        <Button variant="dark" size="sm" block onClick={this.endTurn}>
                                            End Turn
                                        </Button>
                                        <Button variant="dark" size="sm" block onClick={this.handleOpenModal}>
                                            Swap
                                        </Button>
                                        <Button variant="dark" size="sm" block onClick={this.getBoard}>
                                            Test Button to get Board
                                        </Button>
                                        <Button variant="dark" size="sm" block onClick={this.testPutStone}>
                                            Test Button to get Bag
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