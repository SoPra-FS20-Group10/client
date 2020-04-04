import React from "react";

import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import Lobby from "./Lobby";
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
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding               : "0pt",
        width                 : "55%"
    }
};

class LobbyList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            LobbyID: null,
            showModal: false
        }

        this.createLobby=this.createLobby.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    createLobby(){

        const requestBody = JSON.stringify({
            username: this.state.username,
            lobbyPassword: this.state.lobbyPassword
        });

        // TODO: POST created Lobby to Backend
        // POST

    }

    handleInputChange(){

    }

    render() {
        return (

            <Container>



               <h2> LOBBY LIST </h2>



                    <Lobby lobbyId={1} history={this.props.history}>
                        Lobby1
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby lobbyId={2} history={this.props.history}>
                        Lobby2
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby lobbyId={3} history={this.props.history}>
                        Lobby3
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby lobbyId={4} history={this.props.history}>
                        Lobby4
                    </Lobby>
                <view style={{margin: 40}}/>

                <ButtonContainer2>
                    <Button variant="dark" size="sm" block onClick={this.handleOpenModal}>
                        Create new Lobby
                    </Button>
                </ButtonContainer2>


                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Inline Styles Modal Example"
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

export default withRouter(LobbyList);