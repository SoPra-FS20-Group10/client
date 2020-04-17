import React from 'react'

const style = {
    border: '1px dashed gray',
    backgroundColor: 'black',
    padding: "4pt",
    cursor: 'move',
    float: 'left',
    width: "27pt",
    height:"27pt",
    textAlign:"center",
    fontSize:"11pt",

};

const OnBoardLetterBox = ({ name}) => {

    return (
        <div style={{ ...style }}>
           {name}
        </div>
    )
}
export default OnBoardLetterBox
