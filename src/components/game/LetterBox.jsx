import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from "./ItemTypes";
import PIECE from "../shared/Other/Pieces";
const style = {
    border: '1px dashed gray',
    backgroundColor: 'black',
    padding: "4pt",
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
    width: "27pt",
    height:"27pt",
    textAlign:"center",
    fontsize:"35pt"
};

const LetterBox = ({ name, isDropped }) => {
    const [{ opacity }, drag] = useDrag({
        item: { name, type:ItemTypes.PIECE },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    return (
        <div ref={drag} style={{ ...style, opacity }}>
            {isDropped ? <s>{name}</s> : name}
        </div>
    )
}
export default LetterBox
