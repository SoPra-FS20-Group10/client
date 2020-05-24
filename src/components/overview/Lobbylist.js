import React from "react";

import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import LobbylistEntry from "./LobbylistEntry";
import Modal from 'react-modal';
import {InputLabel} from "@material-ui/core";

import Button from 'react-bootstrap/Button'
import {CloseButton} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import subtleClick from "../../sounds/subtle_click.wav";
import {logChatPromiseExecution} from "stream-chat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";


const LobbyContainer = styled.div`

`;


const ButtonContainer2 = styled.div`
    // width: 50%;
    margin:auto;
`;


const ListContainer = styled.div`
    overflow-y: scroll;
    padding: 1em;
    width: 100%;

`;


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0pt",
        width: "20%"
    }
};

const useStylesPopup = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

class Lobbylist extends React.Component {
    constructor(props) {
        super(props);

        // Simulates Player ID

        this.state = {
            lobbyID: null,
            showModal: false,
            lobbyPassword: "",
            lobbyName: null,
            playerId: localStorage.getItem("current"),
            playerName: localStorage.getItem("name"),
            allLobbies: null,
            isOpenLobbyCreateSnackbar: null,
        }


        this.createLobby = this.createLobby.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.showLobbies = this.showLobbies.bind(this);
        this.fetchLobbies = this.fetchLobbies.bind(this);
        this.handleCloseLobbyCreateSnackbar = this.handleCloseLobbyCreateSnackbar.bind(this);
        this.handleOpenLobbyCreateSnackBar = this.handleOpenLobbyCreateSnackBar.bind(this);
    }

    componentDidMount() {
        this.fetchLobbies();
        try {
            this.timerID = setInterval(async () => {
                this.fetchLobbies();
                this.setState({state: this.state});
            }, 300);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    // Get all lobbies

    async fetchLobbies() {
        // TODO: POST created LobbylistEntry to Backend
        // POST --> Return Free LobbylistEntry ID
        try {
            const response = await api.get("/games/");
            // All games (waiting, running & ended)
            let allLobbies = response.data;

            // Initializing list for games that have status 'WAITING' i.e. that are in the lobby phase
            let waitingLobbies = []

            // Go through all games and only add games with status 'WAITING' to waitingLobbies
            let index = 0;
            while (index < allLobbies.length) {
                if (allLobbies[index]["status"] == "WAITING") {
                    waitingLobbies[waitingLobbies.length] = allLobbies[index]
                }
                index++;
            }

            this.setState({allLobbies: waitingLobbies})
            return response.data;
        } catch (error) {
            alert(error);
        }
    }

    async createLobby() {

        const requestBody = JSON.stringify({
            ownerId: this.state.playerId,
            name: this.state.lobbyName,
            password: this.state.lobbyPassword
        });


        // TODO: POST created LobbylistEntry to Backend
        // POST --> Return Free LobbylistEntry ID
        try {

            const response = await api.post("/games", requestBody);

            const lobbyId = response.data;


            // TODO: Backend should return a free lobby id. For now, this is just random.
            this.setState({lobbyId: 4});
            this.props.history.push(
                {
                    pathname: `/game/lobby/${lobbyId}`,
                    state: {
                        lobbyId: lobbyId,
                        lobbyName: this.state.lobbyName,
                        lobbyPassword: this.state.lobbyPassword,
                        playerName: this.state.playerName,
                        playerId: this.state.playerId,
                        ownerId: this.state.playerId
                    }
                });


        } catch (error) {
            console.log(error);
            alert(error);
        }

    }

    handleOpenLobbyCreateSnackBar() {
        this.setState({
            isOpenLobbyCreateSnackbar: true,
        })
    }

    handleCloseLobbyCreateSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            isOpenLobbyCreateSnackbar: false,
        })
    }

    showLobbies() {
        if (this.state.allLobbies) {

            let lobbies = this.state.allLobbies;

            // remove games that are running / ended from list of lobbies which are to be shown
            for (var i = 0; i < lobbies.length; i++) {
                if (lobbies[0]['status'] == 'ENDED') {
                    if (i > -1) {
                        lobbies.splice(i, 1);
                    }
                }
            }

            let listLobbies = lobbies.map((lobby) =>

                <LobbylistEntry lobbyName={lobby.name} lobbyId={lobby.id} playerName={this.state.playerName}
                                playerId={this.state.playerId} history={this.props.history}/>


            );

            return (
                <LobbyContainer>
                    {listLobbies}

                </LobbyContainer>
            );
        } else {


            return (
                <h1> Waiting For Lobby Fetching</h1>
            );
        }
    }


    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
    }

    render() {
        return (

            <div style={{height: '100%'}}>
                <Grid container style={{height: '100%'}}>
                    <Snackbar open={this.state.isOpenLobbyCreateSnackbar} autoHideDuration={6000}
                              onClose={this.handleCloseLobbyCreateSnackbar}>
                        <Alert onClose={this.handleCloseLobbyCreateSnackbar} severity="success">
                            This is a success message!
                        </Alert>
                    </Snackbar>

                    {/*<h2> LOBBY LIST </h2>*/}
                    <ListContainer style={{height: '90%'}}>
                        {this.showLobbies()}
                    </ListContainer>

                    <ButtonContainer2>
                        <Button variant="dark" size="sm" block
                                onClick={() => {
                                    this.playSound(new Audio(subtleClick));
                                    this.handleOpenModal();
                                }}
                        >
                            Create new Lobby
                        </Button>

                    </ButtonContainer2>
                </Grid>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >
                    <Paper elevation={3} style={{padding: '1em'}}>
                        <form className={useStylesPopup} noValidate autoComplete="off">
                            <div>
                                <Typography variant="body1" component="h2">
                                    Create Lobby
                                </Typography>

                                <Divider orientation="horizontal"/>
                                <Typography variant="body1" component="h2" style={{marginTop: '1em'}}>
                                    Choose a Name for your Lobby
                                </Typography>
                                <div>

                                    <TextField
                                        label="Lobby Name"
                                        type="name"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        // value={this.state.tempPwA}

                                        onChange={e => {
                                            this.handleInputChange('lobbyName', e.target.value);
                                        }}
                                    />
                                </div>

                                <Divider orientation="horizontal"/>
                                <Typography variant="body1" component="h2" style={{marginTop: '1em'}}>
                                    (Optional) Choose a Password for your Lobby
                                </Typography>
                                <div>
                                    <TextField
                                        label="Lobby Password"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        // value={this.state.tempPwB}

                                        onChange={e => {
                                            this.handleInputChange('lobbyPassword', e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <IconButton aria-label="delete">
                                    <ArrowBackIcon
                                        onClick={() => {
                                            this.playSound(new Audio(subtleClick));
                                            this.handleCloseModal();
                                        }}
                                    />
                                </IconButton>

                                <IconButton
                                    style={{float: 'right'}}
                                    disabled={this.state.lobbyName == null || !!this.state.lobbyName.match(/^[\s]*$/i)}
                                    onClick={() => {
                                        this.playSound(new Audio(subtleClick));
                                        this.createLobby();
                                    }}
                                >
                                    <CheckCircleOutlineIcon/>
                                </IconButton>
                            </div>
                        </form>
                    </Paper>
                </Modal>


                {/*<Modal*/}
                {/*    isOpen={this.state.showModal}*/}
                {/*    contentLabel="Inline Styles Modal GameBoard"*/}
                {/*    style={customStyles}*/}
                {/*>*/}

                {/*    <LobbyCreationWrapper>*/}

                {/*        <CloseButton onClick={() => {*/}
                {/*            this.playSound(new Audio(subtleClick));*/}
                {/*            this.handleCloseModal();*/}
                {/*        }}/>*/}

                {/*        <Title>*/}
                {/*            <Label>CREATE LOBBY</Label>*/}
                {/*        </Title>*/}

                {/*        <MyInputLabel> LOBBY NAME</MyInputLabel>*/}

                {/*        <InputFieldWrapper>*/}
                {/*            <InputField*/}
                {/*                placeholder="Name"*/}
                {/*                onChange={e => {*/}
                {/*                    this.handleInputChange('lobbyName', e.target.value);*/}
                {/*                }}/>*/}
                {/*        </InputFieldWrapper>*/}
                {/*        <MyInputLabel>PASSWORD</MyInputLabel>*/}


                {/*        <InputFieldWrapper>*/}
                {/*            <InputField*/}
                {/*                placeholder="Password"*/}
                {/*                onChange={e => {*/}
                {/*                    this.handleInputChange('lobbyPassword', e.target.value);*/}
                {/*                }}/>*/}
                {/*        </InputFieldWrapper>*/}

                {/*    </LobbyCreationWrapper>*/}


                {/*    <ButtonContainer>*/}


                {/*        <Button variant="dark" size="sm" block onClick={() => {*/}
                {/*            this.playSound(new Audio(subtleClick));*/}
                {/*            this.createLobby();*/}
                {/*        }}>*/}
                {/*            Create Lobby*/}
                {/*        </Button>*/}
                {/*    </ButtonContainer>*/}
                {/*</Modal>*/}

            </div>


        );
    }
}

export default withRouter(Lobbylist);
