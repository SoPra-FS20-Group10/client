import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(pos: number, name: string, score: number, played: number, won: number, id: number) {
    return { pos, name, score, played, won, id };
}

const LeaderboardTable = ({data, func}) => {
    const classes = useStyles();

    let rows = [];

    data.map((player, index) => {
        rows[rows.length] = createData(index+1, player.username, player.overallScore, player.playedGames, player.wonGames, player.id)
    });

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Position</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Overall Score</TableCell>
                        <TableCell align="center">Played Games</TableCell>
                        <TableCell align="center">Won Games</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} onClick={() => func(row.id)}>
                            <TableCell align="center"  component="th" scope="row">{row.pos}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.score}</TableCell>
                            <TableCell align="center">{row.played}</TableCell>
                            <TableCell align="center">{row.won}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LeaderboardTable;