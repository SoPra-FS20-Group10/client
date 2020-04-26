import React from "react";
import PIECE from "../shared/Other/Pieces";
import Piece from "../shared/models/Piece";

class PieceBag extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            pieceBag: null,
        };
        this.initPieceBag = this.initPieceBag.bind(this);

    }

    componentDidMount() {
        this.initPieceBag();
        console.log("Mounted");
    }

    initPieceBag() {

        let pieceBag = [];
        let id = 0;
        for (let i = 0; i < 10; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 13; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 4; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 10; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }
        {
        let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
        id++;
    }
        {
        let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
        id++;}

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 7; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 9; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }
        {
        let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
        id++;
    }
        for (let i = 0; i < 7; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 7; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 5; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }

        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }
        {
        let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
        id++;
    }
        for (let i = 0; i < 3; i++) {
            let piece = new Piece({id:id,text:PIECE.A.text, score:PIECE.A.score})
            pieceBag.push(piece);
            id++;
        }
        {
            let piece = new Piece({id: id, text: PIECE.A.text, score: PIECE.A.score})
            pieceBag.push(piece);
        }

        console.log(pieceBag);

        this.setState({

            pieceBag:pieceBag,

        })
        console.log(this.state);
    }

    getPieceById(id){

        return this.state.pieceBag[id];

    }


}

export default PieceBag;
