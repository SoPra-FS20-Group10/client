import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";


export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SnackbarAlert(props){
    return(<Snackbar open={true} autoHideDuration={6000}
                     onClose={props.close}
                     anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
        <Alert severity={props.type}>
            {props.message}
        </Alert>
    </Snackbar>);
}
