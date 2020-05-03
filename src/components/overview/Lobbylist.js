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

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;


`;

const LobbyContainer = styled.div`

`;


const MyInputLabel = styled.div`

    margin-top: 10pt;
    margin-bottom: 10pt;
    text-align: center;
`;


const ButtonContainer = styled.div`
    padding-top: 10pt;
`;

const ButtonContainer2 = styled.div`
    width: 50%;
    margin:auto;
`;

const ButtonContainer3 = styled.div`

    float:left;
`;

const LobbyCreationWrapper = styled.div`
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

const TopBar = styled.div`

  background-color: grey;

`;

const ListContainer = styled.div`

  overflow-y: scroll;
  max-height:310pt;

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
            allLobbies: null
        }


        this.createLobby = this.createLobby.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.showLobbies = this.showLobbies.bind(this);
        this.fetchLobbies = this.fetchLobbies.bind(this);
    }

    async componentDidMount() {
        this.fetchLobbies();
        try {
            setInterval(async () => {
                this.fetchLobbies();
                this.setState({state: this.state});
            }, 1000);
        } catch (e) {
            console.log(e);
        }
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
            this.setState({allLobbies: response.data})
            // return response.data;
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

    // TODO: Find method to not render this at 60Hz
    showLobbies() {
        // this.fetchLobbies();

        if (this.state.allLobbies) {

            let lobbies = this.state.allLobbies;

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

    render() {
        return (

            <Container>


                <h2> LOBBY LIST </h2>
                <ListContainer>
                    {this.showLobbies()}
                </ListContainer>
                <view style={{margin: 40}}/>

                <ButtonContainer2>
                    <Button variant="dark" size="sm" block onClick={this.handleOpenModal}>
                        Create new Lobby
                    </Button>
                </ButtonContainer2>


                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >

                    <LobbyCreationWrapper>

                        <CloseButton onClick={this.handleCloseModal}/>

                        <Title>
                            <Label>CREATE LOBBY</Label>
                        </Title>

                        <MyInputLabel> LOBBY NAME</MyInputLabel>

                        <InputFieldWrapper>
                            <InputField
                                placeholder="Name"
                                onChange={e => {
                                    this.handleInputChange('lobbyName', e.target.value);
                                }}/>
                        </InputFieldWrapper>
                        <MyInputLabel>PASSWORD</MyInputLabel>


                        <InputFieldWrapper>
                            <InputField
                                placeholder="Password"
                                onChange={e => {
                                    this.handleInputChange('lobbyPassword', e.target.value);
                                }}/>
                        </InputFieldWrapper>

                    </LobbyCreationWrapper>


                    <ButtonContainer>
                        <Button variant="dark" size="sm" block onClick={this.createLobby}>
                            Create Lobby
                        </Button>
                    </ButtonContainer>
                </Modal>

            </Container>


        );
    }
}

export default withRouter(Lobbylist);
