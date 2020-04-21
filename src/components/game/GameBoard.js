import React, {useState, useCallback, Component} from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Square from './Square'
import LetterBox from './LetterBox'
import ItemTypes from './ItemTypes'
import update from 'immutability-helper'
import TILES from "../shared/Other/Tiles";
import PIECE from "../shared/Other/Pieces";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import Col from "react-bootstrap/Col";
import {CloseButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";

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

const DeckWrapper = styled.div`
    margin-top:8pt;
    padding: 8pt;
    height: 52pt;
    
    background: rgba(77, 77, 77, 0.5);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;



class GameBoard extends React.Component {

    constructor(props) {

        super(props);
        this.handleDrop=this.handleDrop.bind(this);
        this.isDropped=this.isDropped.bind(this);
        this.drawTile=this.drawTile.bind(this);
        this.state = {
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
                { piece: PIECE.W},
                { piece: PIECE.E},
                { piece: PIECE.S},
                { piece: PIECE.Q},
                { piece: PIECE.C},
                { piece: PIECE.G},
                { piece: PIECE.F},

            ],
            droppedBoxNames: [],
            board: [
            [{piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.ST}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DW}, {piece: null, type: TILES.NT}],
            [{piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.DL}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.NT}, {piece: null, type: TILES.TW}],
        ],

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
                justifyContent:'center',
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
                        justifyContent:'center',
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
    handleDrop(i,j , item) {

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


    render() {

        const { board } = this.state;

        return (
            <div>
                <Grid container className="flex-grow-1" spacing={0}>

                    {board.map((row, i) => (
                        <Grid item xs={12}>
                            <Grid key={i} container justify="center" spacing={0}>
                                {row.map((col, j) =>  (
                                    <Grid key={col} item>
                                        <Square props={col} row={i} column={j} onDrop={(item) => this.handleDrop(i, j, item)}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>


                <DeckWrapper>

                    <div style={{overflow: 'hidden', clear: 'both', margin:"auto"}}>
                        {this.state.boxes.map(({ piece}, index) => (
                            <LetterBox
                                piece={piece}
                                isDropped={this.isDropped(piece, index)}
                                key={index}
                            />
                        ))}
                    </div>
                </DeckWrapper>
            </div>
        )


    }
}


export default withRouter(GameBoard);
