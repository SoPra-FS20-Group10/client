import React from 'react'
import { useDrop } from 'react-dnd'
import styled from "styled-components";
import ItemTypes from "./ItemTypes";
import OnBoardLetterBox from "./OnBoardLetterBox";
const style = {
    backgroundColor: "grey",
    fontSize: 7,
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
        return (props.props.type.text)
    }
}
function canDropLetter(props){return props.props.piece == null;}

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



    const isActive = isOver && canDrop;
    let backgroundColor = props.props.type.color;
    if (isActive) {
        backgroundColor = props.props.type.color
    } else if (canDrop) {

        backgroundColor = props.props.type.color
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            {isActive ?

                <div>

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
                        Drop Here
                    </PieceWrapper>
                    </div>
                : <div>

                    {showSquare(props)}

                </div>

            }

        </div>






    )
}
export default Square
