import React from 'react'
import { useDrop } from 'react-dnd'
import styled from "styled-components";
import ItemTypes from "./ItemTypes";
import OnBoardLetterBox from "./OnBoardLetterBox";
import Overlay from "react-bootstrap/Overlay";
const style = {
    backgroundColor: "grey",
    fontSize: 10,
    borderRadius: '2pt',
    margin: '2pt',
    width: '27pt',
    height: '27pt',
    color: 'white',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center',
};

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
function showSquare (props) {



    if (props.props.piece != null && props.props.piece != undefined){
        return (
            <OnBoardLetterBox
                piece={(props.props.piece)}
            />
        )
    }
    else{
        return (props.props.type.text);
    }
}
function canDropLetter(props){

    if(props.props.piece != null){
        return false;
    }
    else{
        if(props.placedFirstLetter === false){
            return props.row === 7 && props.column === 7;
        }
        return true;

    }



}

const Square = (props) => {


    const [{ isOver, canDrop}, drop] = useDrop({
        canDrop: () => canDropLetter(props),
        accept: [ItemTypes.PIECE],
        drop: props.onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });


    let backgroundColor = props.props.type.color;
    const isActive = isOver && canDrop;
    if (isActive) {
        backgroundColor = 'yellow'
    } else if (canDrop && !props.placedFirstLetter) {
        console.log("here");
        console.log(props.placedFirstLetter);
        backgroundColor = "darkgreen"
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            {isActive ?

                <div>

                    <PieceWrapper style={{
                        backgroundColor: 'transparent',
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
                        Drop Here
                    </PieceWrapper>
                    </div>
                : <div>

                    {showSquare(props)}

                </div>
/*<div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>

    </div>

 */
            }

        </div>






    )
}
export default Square
