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
import Tile from "./Tile";
import TILE_TYPE from "../shared/Other/TileTypes";

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [
                [TILE_TYPE.TW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TW],
                [TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.TW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.ST, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TW],
                [TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT],
                [TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DW, TILE_TYPE.NT],
                [TILE_TYPE.TW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TW, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.DL, TILE_TYPE.NT, TILE_TYPE.NT, TILE_TYPE.TW],

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
                                    {Tile(col)}
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