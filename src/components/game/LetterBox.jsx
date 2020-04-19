import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from "./ItemTypes";
import PIECE from "../shared/Other/Pieces";
import styled from "styled-components";
const style = {
    border: '1px dashed gray',
    backgroundColor: 'black',
    padding: "3pt",
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
    width: "27pt",
    height:"27pt",
    textAlign:"center",
    fontsize:"35pt"
};

const Points = styled.div`
    margin: 0pt;
    top: 9pt;
    right: -2pt;
    font-size: 8pt;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
    float: right;
`;

const LetterBox = ({piece, isDropped}) => {
    const [{opacity}, drag] = useDrag({
        item: {piece, type: ItemTypes.PIECE},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    console.log(piece);

    return (
        <div ref={drag} style={{...style, opacity}}>
            {isDropped ? <s>{piece.text}</s> : piece.text}
            <Points>{piece.score}</Points>
        </div>
    )
};
export default LetterBox
