import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';

import {withRouter} from 'react-router-dom';
import LobbyList from "../overview/Lobbylist";
import Chart from "./Chart";
import NavigationBar from "../../views/NavigationBar";
import {CloseButton} from "react-bootstrap";
import Modal from "react-modal";
import {api, handleError} from "../../helpers/api";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Paper from '@material-ui/core/Paper';
import subtleClick from "../../sounds/subtle_click.wav";
import MatchHistory from "./MatchHistory";
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import NameLengthChecker from "../shared/Other/NameLengthChecker";
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/ExitToApp';
import {ExitIcon} from "@livechat/ui-kit";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import {TextFields} from "@material-ui/icons";
import Button from '@material-ui/core/Button';

const NameWrapper = styled.div`
    border-radius: 4pt;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10em;
    flex-flow: column wrap;
    
`;

const StatsWrapper = styled.div`
    border-radius: 4pt;
    width: 100%;
    float:center;
    text-align:center;
`;

const GraphWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 3em;
    width: 60%;
    float:left;
    color: white;
     
`;

const MatchHistoryWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 3em;
    margin-left: 5%;
    width: 35%;
    float:left;
`;

const Container = styled(BaseContainer)`
    color: white;
    width:100%;
    margin:auto;
    
    // These style attributes make text unselectable on most browsers & versions
    user-select: none;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
`;


const ButtonContainer = styled.div`
    margin-top: 3em;
    float:left;
    width: 100%;
    align-items:left;
    justify-items: left;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        border: 'none'
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

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: parseInt(window.location.href.split('/').pop(), 10),
            userName: null,
            overallScore: null,
            playedGames: null,
            wonGames: null,
            matchesScore: [],
            matchesTime: [],
            modalErrorMsg: null,
            tempPwA: null,
            tempPwB: null,
            tempUsername: null,

        }

        this.handleOpenModalName = this.handleOpenModalName.bind(this);
        this.handleCloseModalName = this.handleCloseModalName.bind(this);
        this.handleOpenModalPassword = this.handleOpenModalPassword.bind(this);
        this.handleCloseModalPassword = this.handleCloseModalPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        this.fetchUser();
        try {
            this.timerID = setInterval(() => {
                if (parseInt(window.location.href.split('/').pop(), 10) != this.state.userId) {
                    this.setState({userId: parseInt(window.location.href.split('/').pop(), 10)})
                }
                this.fetchUser();
            }, 2000);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    async fetchUser() {
        try {
            const response = await api.get("/users/" + this.state.userId);

            this.setState({
                userName: response.data.username,
                overallScore: response.data.overallScore,
                playedGames: response.data.playedGames,
                playtime: response.data.playtime,
                winPercentage: response.data.winPercentage,
                wonGames: response.data.wonGames,
                matchesScore: response.data.historyList.reverse(),
                matchesTime: response.data.historyTimeList.reverse(),
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleInputChange(key, value) {
        this.setState({[key]: value.split(" ").join("")});
    }

    handleOpenModalName() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalName: true});
    }

    handleCloseModalName() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalName: false, tempUsername: null, modalErrorMsg: null});
    }

    handleOpenModalPassword() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalPassword: true});
    }

    handleCloseModalPassword() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalPassword: false, tempPwA: null, tempPwB: null, modalErrorMsg: null});
    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
    }


    async changeName() {
        const requestBody = JSON.stringify({
            id: Number(localStorage.getItem("current")),
            username: this.state.tempUsername,
            password: null,
            birthday: null
        });

        try {
            await api.put("/users/" + Number(localStorage.getItem("current")), requestBody);
            this.fetchUser();
            this.handleCloseModalName();
        } catch (error) {
            this.setState({modalErrorMsg: error.response.data.message})
            console.log(this.state.modalErrorMsg)
        }
    }


    async changePassword() {
        if (this.state.tempPwA != this.state.tempPwB) {
            this.setState({modalErrorMsg: "Passwords don't match!"})
            return
        }
        const requestBody = JSON.stringify({
            id: Number(localStorage.getItem("current")),
            username: null,
            password: this.state.tempPwA,
            birthday: null
        });

        try {
            await api.put("/users/" + Number(localStorage.getItem("current")), requestBody);
            this.fetchUser();
            this.handleCloseModalPassword();
        } catch (error) {
            this.setState({modalErrorMsg: error.response.data.message})
        }
    }

    render() {
        // boolean that is true if player is on his / her own profile
        const isUser = this.state.userId == localStorage.getItem("current");

        return (
            <Container>
                {/*Navigation Bar*/}
                <div className="bg-image"></div>
                <NavigationBar history={this.props} value={2} playerId={localStorage.getItem("current")}/>

                {/*Username*/}
                <NameWrapper>
                    <Typography variant="h5" component="h2">
                        This is the Profile of
                    </Typography>

                    <Typography variant="h1" component="h3">
                        {NameLengthChecker(this.state.userName)}
                    </Typography>
                </NameWrapper>

                {/*Stat Overview*/}
                <StatsWrapper>
                    <Paper elevation={3}>
                        <Grid container alignItems="center" style={{justifyContent: 'space-evenly'}}>
                            <div style={{
                                display: 'flex',
                                padding: '2em',
                                flexDirection: 'row',
                                flexFlow: 'column wrap'
                            }}>
                                <div>Overall Score</div>
                                <div>{this.state.overallScore}</div>
                            </div>

                            <Divider orientation="vertical" flexItem/>

                            <div style={{
                                display: 'flex',
                                padding: '2em',
                                flexDirection: 'row',
                                flexFlow: 'column wrap'
                            }}>
                                <div>Played Games</div>
                                <div>{this.state.playedGames}</div>
                            </div>

                            <Divider orientation="vertical" flexItem/>

                            <div style={{
                                display: 'flex',
                                padding: '2em',
                                flexDirection: 'row',
                                flexFlow: 'column wrap'
                            }}>
                                <div>Won Games</div>
                                <div>{this.state.wonGames}</div>
                            </div>
                        </Grid>
                    </Paper>
                </StatsWrapper>

                {/*Graph*/}
                <GraphWrapper>
                    <Paper elevation={3}>
                        <div>
                            <Chart matches={this.state.matchesScore}/>
                        </div>
                    </Paper>
                </GraphWrapper>

                {/*Match History*/}
                <MatchHistoryWrapper>
                    <MatchHistory matches={this.state.matchesScore} times={this.state.matchesTime}/>
                </MatchHistoryWrapper>


                {/*Buttons for editing credentials*/}
                {isUser ?
                    <ButtonContainer>
                        <Button color="secondary" variant="contained" size="lg" onClick={this.handleOpenModalName}
                        style={{marginRight: '2em'}}>
                            Change Name
                        </Button>

                        <Button color="secondary" variant="contained" size="lg" onClick={this.handleOpenModalPassword}>
                            Change Password
                        </Button>
                    </ButtonContainer>
                    : null}

                {/*Modal for Name-Popup*/}
                <Modal
                    isOpen={this.state.showModalName}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >
                    <Paper elevation={3} style={{padding: '1em'}}>
                        <form className={useStylesPopup} noValidate autoComplete="off">
                            <div>
                                <Typography variant="body1" component="h2">
                                    Choose new username
                                </Typography>
                                <TextField
                                    label="New Username"
                                    type="name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.tempUsername}
                                    error={this.state.modalErrorMsg != null
                                    && !this.state.modalErrorMsg !== 'Username exists already, please choose another one.'
                                    }
                                    helperText={this.state.modalErrorMsg != null
                                    && !this.state.modalErrorMsg !== 'Username exists already, please choose another one.'
                                        ? 'Username is already taken' : null
                                    }

                                    onChange={e => {
                                        this.handleInputChange('tempUsername', e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <IconButton aria-label="delete">
                                    <ArrowBackIcon
                                        onClick={this.handleCloseModalName}
                                    />
                                </IconButton>

                                <IconButton
                                    style={{float: 'right'}}
                                    disabled={!this.state.tempUsername || !!this.state.tempUsername.match(/^[\s]*$/i)}
                                    onClick={this.changeName}
                                >
                                    <CheckCircleOutlineIcon/>
                                </IconButton>
                            </div>
                        </form>
                    </Paper>
                </Modal>


                {/*Modal for Password-Popup*/}
                <Modal
                    isOpen={this.state.showModalPassword}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >
                    <Paper elevation={3} style={{padding: '1em'}}>
                        <form className={useStylesPopup} noValidate autoComplete="off">
                            <div>
                                <Typography variant="body1" component="h2">
                                    Choose new password
                                </Typography>

                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.tempPwA}

                                    error={this.state.modalErrorMsg != null
                                    && !this.state.modalErrorMsg !== "Passwords don't match!"
                                    }

                                    onChange={e => {
                                        this.handleInputChange('tempPwA', e.target.value);
                                    }}
                                />

                                <TextField
                                    label="Repeat Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.tempPwB}

                                    error={this.state.modalErrorMsg != null
                                    && !this.state.modalErrorMsg !== "Passwords don't match!"
                                    }
                                    helperText={this.state.modalErrorMsg != null
                                    && !this.state.modalErrorMsg !== "Passwords don't match!"
                                        ? "Passwords don't match!" : null
                                    }

                                    onChange={e => {
                                        this.handleInputChange('tempPwB', e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <IconButton aria-label="delete">
                                    <ArrowBackIcon
                                        onClick={this.handleCloseModalPassword}
                                    />
                                </IconButton>

                                <IconButton
                                    style={{float: 'right'}}
                                    disabled={this.state.tempPwA == null || this.state.tempPwB == null || !!this.state.tempPwA.match(/^[\s]*$/i) || !!this.state.tempPwB.match(/^[\s]*$/i)}
                                    onClick={this.changePassword}
                                >
                                    <CheckCircleOutlineIcon/>
                                </IconButton>
                            </div>
                        </form>
                    </Paper>
                </Modal>
            </Container>
        );
    }
}

export default withRouter(ProfilePage);