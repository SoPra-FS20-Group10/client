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

const NameWrapper = styled.div`
    margin-top: 2%;
    margin-bottom: 1em;
    margin-left: 5%;
    padding: 2%;
    background: grey;
    float:left;
    text-align:left;
`;

const StatsWrapper = styled.div`
    margin-left: 5%;
    padding: 2%;
    width: 90%;
    background: grey;
    float:left;
    text-align:left;
`;

const GraphWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    padding: 5%;
    width: 60%;
    height: 500pt;
    background: grey;
    float:left;
    color: white;
     
`;

const MatchHistoryWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    width: 25%;
    height: 500pt;
    background: grey;
    float:left;
`;

const Container = styled(BaseContainer)`
    color: white;
    text-align: center;
    width:100%;
    margin:auto;
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

// TODO: Functionality behind changing credentials
// TODO: Fix scaling of charts (when resizing page)
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // some example data for the profile page
            // playerId: this.props.location.state.playerId,
            userId: Number(localStorage.getItem("current")),
            userName: localStorage.getItem("name"),

            overallScore: null,
            playedGames: null,
            playtime: null,
            winPercentage: null,
            wonGames: null,


            // example data for the stat overview
            stats: {id: 1, name: 'HOTCHILIEATER', wins: 1000, winPercentage: '59%', timePlayed: '370h'},

            tempPwA: null,
            tempPwB: null,
            tempUsername: null,

        }
        this.fetchUser();
        this.handleOpenModalName = this.handleOpenModalName.bind(this);
        this.handleCloseModalName = this.handleCloseModalName.bind(this);
        this.handleOpenModalPassword = this.handleOpenModalPassword.bind(this);
        this.handleCloseModalPassword = this.handleCloseModalPassword.bind(this);

        this.changePassword = this.changePassword.bind(this);
        this.changeName = this.changeName.bind(this);

    }

    async componentDidMount() {

        try {
            setInterval(async () => {
                this.fetchUser();
            }, 10000);
        } catch(e) {
            console.log(e);
        }
    }
    async fetchUser(){
        try {

            const response = await api.get("/users/" + this.state.userId);
            console.log(response)

            this.setState({userName: response.data.username})
            this.setState({overallScore: response.data.overallScore})
            this.setState({playedGames: response.data.playedGames})
            this.setState({playtime: response.data.playtime})
            this.setState({winPercentage: response.data.winPercentage})
            this.setState({wonGames: response.data.wonGames})

            console.log(this)

            // this.countLobbyPlayers();
        }
        catch(error){
            alert(error);
        }
    }


    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    handleOpenModalName() {
        this.setState({showModalName: true});
    }

    handleCloseModalName() {
        this.setState({showModalName: false});
    }

    handleOpenModalPassword() {
        this.setState({showModalPassword: true});
    }

    handleCloseModalPassword() {
        this.setState({showModalPassword: false});
    }

    render() {
        return (
            <Container>
                {/*Navigation Bar*/}
                <div className="bg-image"></div>
                <NavigationBar  playerId={this.state.playerId}/>

                {/*Username*/}
                <NameWrapper>{this.state.userName}'s Profile</NameWrapper>

                {/*TODO: Implement stats overview*/}
                <StatsWrapper>
                    <Row>
                        <Col>Overall Score</Col>
                        <Col>{this.state.overallScore} </Col>
                    </Row>

                    <Row>
                        <Col># Played Games</Col>
                        <Col>{this.state.playedGames} </Col>
                    </Row>

                    <Row>
                        <Col>Playtime</Col>
                        <Col>{this.state.playtime} </Col>
                    </Row>

                    <Row>
                        <Col>Win-%</Col>
                        <Col>{this.state.winPercentage} </Col>
                    </Row>

                    <Row>
                        <Col># Won Games</Col>
                        <Col>{this.state.wonGames} </Col>
                    </Row>
                </StatsWrapper>

                {/*/!*TODO: Refine Chart view*!/*/}
                {/*<GraphWrapper>*/}
                {/*    <Chart></Chart>*/}
                {/*</GraphWrapper>*/}

                {/*/!*TODO: Implement match-history view*!/*/}
                {/*<MatchHistoryWrapper>*/}
                {/*    <h1> Here is the match history</h1>*/}
                {/*</MatchHistoryWrapper>*/}


                {/*Buttons for editing credentials*/}
                <ButtonContainer3>
                    <Button variant="dark" size="lg" onClick={this.handleOpenModalName}>
                        Change Name
                    </Button> {' '}
                    <Button variant="dark" size="lg" onClick={this.handleOpenModalPassword}>
                        Change Password
                    </Button>

                </ButtonContainer3>

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
        }catch(error){
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
        }catch(error){
            alert(error);
        }
    }
}

export default withRouter(ProfilePage);