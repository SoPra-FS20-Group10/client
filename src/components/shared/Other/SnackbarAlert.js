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
                     style={{
                         // These style attributes make text unselectable on most browsers & versions
                         userSelect: 'none',
                         webkitTouchCallout: 'none',
                         webkitUserSelect: 'none',
                         khtmlUserSelect: 'none',
                         mozUserSelect: 'none',
                         msUserSelect: 'none'
                     }}
    >
        <Alert severity={props.type}>
            {props.message}
        </Alert>
    </Snackbar>);
}
