import React, {Component} from "react";
import styled from "styled-components";

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

export default function drawTile(tile) {
    return (
        <TileWrapper style={{
            backgroundColor: tile.color,
            fontSize: 7,
            fontStyle: 'b',


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
            {tile.text}
        </TileWrapper>
    );
}