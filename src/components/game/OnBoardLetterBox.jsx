import React from 'react'
import styled from "styled-components";

const style = {
    border: '1px dashed gray',
    backgroundColor: 'black',
    padding: "3pt",
    cursor: 'move',
    float: 'left',
    width: "23pt",
    height:"23pt",
    textAlign:"center",
    fontSize:"11pt",

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

const OnBoardLetterBox = (props) => {

    return (
        <div style={{ ...style }}>
           {props.piece.text}
           <Points>
            {props.piece.score}
           </Points>
        </div>
    )
}
export default OnBoardLetterBox
