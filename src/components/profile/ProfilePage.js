import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';

import {withRouter} from 'react-router-dom';
import LobbyList from "../overview/Lobbylist";
import Button from "react-bootstrap/Button";
import Chart from "./Chart";
import NavigationBar from "../../views/NavigationBar";
import {CloseButton} from "react-bootstrap";
import Modal from "react-modal";
import {api} from "../../helpers/api";
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

const NameWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 5em;
    margin-bottom: 1em;
    margin-left: 5%;
    padding: 2%;
    float:center;
    text-align:center;
`;

const StatsWrapper = styled.div`
    border-radius: 4pt;
    width: 100%;
    float:center;
    text-align:center;
`;

const GraphWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 5%;
    width: 60%;
    // height: 500pt;
    float:left;
    color: white;
     
`;

const MatchHistoryWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 5%;
    margin-left: 5%;
    width: 35%;
    // height: 500pt;
    background: grey;
    float:left;
`;

const Container = styled(BaseContainer)`
    color: white;
    text-align: center;
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
//
// const ButtonContainer = styled.div`
//     width: 33.3%;
// `;

const ButtonContainer = styled.div`
    padding-top: 10pt;
`;


const ButtonContainer3 = styled.div`
    margin-top: 2%;
    margin-left: 5%;
    float:left;
    width: 100%;
    align-items:left;
    justify-items: left;
`;

const CredentialsPopupWrapper = styled.div`
    background-color: white;
`;

const Title = styled.div`
    background-color: grey;

`;

const Label = styled.label`
  color: black;
  text-transform: uppercase;
  font-size:16pt;
  background-color: grey;
   margin-left: 5%;
`;

const InputField = styled.input`
  &::placeholder {
    color: grey;
  }
  height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 20px;
  background: rgba(77, 77, 77, 0.2);
  color: grey;

  margin: 0 auto;

`;

const InputFieldWrapper = styled.div`
     margin-top: 10pt;
    margin-bottom: 10pt;
    text-align: center;

`;


const LobbyCreationWrapper = styled.div`
    background-color: white;
`;

const MyInputLabel = styled.div`

    margin-top: 10pt;
    margin-bottom: 10pt;
    text-align: center;
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
        width: "55%"
    }
};


const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
    },
}));

// TODO: Functionality behind changing credentials
// TODO: Fix scaling of charts (when resizing page)
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // some example data for the profile page
            // playerId: this.props.location.state.playerId,
            userId: parseInt(window.location.href.split('/').pop(), 10),
            userName: null,

            overallScore: null,
            playedGames: null,
            playtime: null,
            winPercentage: null,
            wonGames: null,
            matchesScore: [],
            matchesTime: [],


            // example data for the stat overview
            stats: {id: 1, name: 'HOTCHILIEATER', wins: 1000, winPercentage: '59%', timePlayed: '370h'},

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
            }, 500);
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
            console.log(response)

            this.setState({userName: response.data.username})
            this.setState({overallScore: response.data.overallScore})
            this.setState({playedGames: response.data.playedGames})
            this.setState({playtime: response.data.playtime})
            this.setState({winPercentage: response.data.winPercentage})
            this.setState({wonGames: response.data.wonGames})
            this.setState({matchesScore: response.data.historyList})
            this.setState({matchesTime: response.data.historyTimeList})
        } catch (error) {
            alert(error);
        }
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    handleOpenModalName() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalName: true});
    }

    handleCloseModalName() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalName: false});
    }

    handleOpenModalPassword() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalPassword: true});
    }

    handleCloseModalPassword() {
        this.playSound(new Audio(subtleClick));
        this.setState({showModalPassword: false});
    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
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
                    <Typography variant="h1" component="h2">
                        Profile of {this.state.userName}
                    </Typography>
                </NameWrapper>

                {/*TODO: Implement stats overview*/}
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

                    {/*<Row>*/}
                    {/*    <Col># Played Games</Col>*/}
                    {/*    <Col>{this.state.playedGames} </Col>*/}
                    {/*</Row>*/}

                    {/*<Row>*/}
                    {/*    <Col>Playtime</Col>*/}
                    {/*    <Col>{this.state.playtime} </Col>*/}
                    {/*</Row>*/}

                    {/*<Row>*/}
                    {/*    <Col>Win-%</Col>*/}
                    {/*    <Col>{this.state.winPercentage} </Col>*/}
                    {/*</Row>*/}

                    {/*<Row>*/}
                    {/*    <Col># Won Games</Col>*/}
                    {/*    <Col>{this.state.wonGames} </Col>*/}
                    {/*</Row>*/}
                </StatsWrapper>

                {/*/!*TODO: Refine Chart view*!/*/}

                <GraphWrapper>
                    <Paper elevation={3}>
                        <div style={{margin: '5pt'}}>
                            <Chart matches={this.state.matchesScore}/>
                        </div>
                    </Paper>
                </GraphWrapper>


                {/*TODO: Implement match-history view*/}
                <MatchHistoryWrapper>
                    <MatchHistory matches={this.state.matchesScore} times={this.state.matchesTime}/>
                </MatchHistoryWrapper>


                {/*Buttons for editing credentials*/}


                {isUser ?
                    <ButtonContainer3>

                        <Button variant="dark" size="lg" onClick={this.handleOpenModalName}>
                            Change Name
                        </Button> {' '}
                        <Button variant="dark" size="lg" onClick={this.handleOpenModalPassword}>
                            Change Password
                        </Button>

                    </ButtonContainer3>
                    : null}

                {/*Modal for Name-Popup*/}
                <Modal
                    isOpen={this.state.showModalName}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >
                    <CredentialsPopupWrapper>
                        <CloseButton onClick={this.handleCloseModalName}/>
                        <Title>
                            <Label>Change Username</Label>
                        </Title>
                        {/*<MyInputLabel> LOBBY NAME</MyInputLabel>*/}
                        <InputFieldWrapper>
                            <InputField
                                placeholder="New Username"
                                onChange={e => {
                                    this.handleInputChange('tempUsername', e.target.value);
                                }}/>
                        </InputFieldWrapper>
                    </CredentialsPopupWrapper>
                    <ButtonContainer>
                        <Button
                            disabled={!this.state.tempUsername}
                            variant="dark" size="sm" block onClick={this.changeName}>
                            Save Changes
                        </Button>
                    </ButtonContainer>
                </Modal>

                {/*Modal for Password-Popup*/}
                <Modal
                    isOpen={this.state.showModalPassword}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >
                    <CredentialsPopupWrapper>
                        <CloseButton onClick={this.handleCloseModalPassword}/>
                        <Title>
                            <Label>Change Password</Label>
                        </Title>
                        <InputFieldWrapper>
                            <InputField
                                placeholder="New Password"
                                onChange={e => {
                                    this.handleInputChange('tempPwA', e.target.value);
                                }}/>
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                            <InputField
                                placeholder="Repeat Password"
                                onChange={e => {
                                    this.handleInputChange('tempPwB', e.target.value);
                                }}/>
                        </InputFieldWrapper>
                    </CredentialsPopupWrapper>
                    <ButtonContainer>
                        <Button
                            disabled={this.state.tempPwA != this.state.tempPwB || this.state.tempPwA == null}
                            variant="dark" size="sm" block onClick={this.changePassword}>
                            Save Changes
                        </Button>
                    </ButtonContainer>

                </Modal>

            </Container>
        );
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
            alert(error);
        }
    }


    async changePassword() {
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
            alert(error);
        }
    }
}

export default withRouter(ProfilePage);