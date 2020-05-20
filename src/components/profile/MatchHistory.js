
import * as React from "react";
import {Spinner} from '../../views/design/Spinner';


import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let getTimeMeasure = (milli) => {
    let timeInMs = Date.now();
    let delta = timeInMs - milli;

    let seconds = delta / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;

    let days = Math.floor(hours / 24);
    hours = Math.floor(hours - days * 24);
    minutes = Math.floor(minutes - hours * 60 - days * 24 * 60);
    seconds = Math.floor(seconds - minutes * 60 - hours * 60 * 60 - days * 24 * 60 * 60);

    // console.log(days + ":" + hours + ":" + minutes + ":" + seconds)
    // return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

    if (days > 0) {
        if (days == 1) {
            return ' ' + days + ' day ago';
        } else {
            return ' ' + days + ' days ago';
        }
    } else if (hours > 0) {
        if (hours == 1) {
            return ' ' + hours + ' hour ago';
        } else {
            return ' ' + hours + ' hours ago';
        }
    } else if (minutes > 0) {
        if (minutes == 1) {
            return ' ' + minutes + ' minute ago';
        } else {
            return ' ' + minutes + ' minutes ago';
        }
    } else if (seconds > 0) {
        if (seconds == 1) {
            return ' ' + seconds + ' second ago';
        } else {
            return ' ' + seconds + ' seconds ago';
        }
    }
}


const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});


const MatchHistory = ({matches, times}) => {
    const classes = useStyles();

    if (matches == []) {
        return (
            <div>

            </div>
        );
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Score</TableCell>
                        <TableCell align="right">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.map((matchdata, index) => (
                        <TableRow key={matchdata}>
                            <TableCell component="th" scope="row">
                                {matchdata}
                            </TableCell>
                            <TableCell align="right">
                                {times ?
                                    getTimeMeasure(times[index]) :
                                    <Spinner/>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default MatchHistory