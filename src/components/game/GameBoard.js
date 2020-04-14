import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Line} from "react-chartjs-2";
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles";

const Tile = styled.div`
    margin: 2pt;
    width: 25pt;
    height: 25pt;
    
    background: white;
    color: black;
    justify-content:center;
    align-items: center;
    display: flex;
`;

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
            ]
        }
    }

    render() {
        const { board } = this.state;


        return(
            <Grid container className="flex-grow-1" spacing={0}>

                {board.map((row, i) => (
                    <Grid item xs={12}>
                        <Grid key={i} container justify="center" spacing={0}>
                            {row.map((col, j) =>  (
                                <Grid key={col} item>
                                    <Tile >{col}</Tile>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default withRouter(GameBoard);