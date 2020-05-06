import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";


export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SnackbarAlert(props){
    let alertType;
    if(props.type === "bad"){
        alertType = "error";
    }
    else if(props.type === "good"){
        alertType = "success"
    }
    else{
        alertType = "info"
    }

    return(<Snackbar open={true} autoHideDuration={6000}
                     onClose={props.close}
                     anchorOrigin={{ vertical: "top", horizontal: "center" }}

    >
        <Alert severity={alertType}>
            {props.message}
        </Alert>
    </Snackbar>);
}
