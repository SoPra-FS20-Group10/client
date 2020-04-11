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

const StatsWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    padding: 5%;
    width: 90%;
    height: 100pt; 
    background: grey;
    float:left;
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

const ButtonContainer = styled.div`
    width: 33.3%;
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
            playerId: this.props.location.state.playerId,
            // example data for the stat overview
            stats: {id: 1, name: 'HOTCHILIEATER', wins: 1000, winPercentage: '59%', timePlayed: '370h'}

        }
        this.handleOpenModalName = this.handleOpenModalName.bind(this);
        this.handleCloseModalName = this.handleCloseModalName.bind(this);
        this.handleOpenModalPassword = this.handleOpenModalPassword.bind(this);
        this.handleCloseModalPassword = this.handleCloseModalPassword.bind(this);
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

                {/*TODO: Implement stats overview*/}
                <StatsWrapper>
                    <h1> Here are some stats</h1>
                </StatsWrapper>

                {/*TODO: Refine Chart view*/}
                <GraphWrapper>
                    <Chart></Chart>
                </GraphWrapper>

                {/*TODO: Implement match-history view*/}
                <MatchHistoryWrapper>
                    <h1> Here is the match history</h1>
                </MatchHistoryWrapper>


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
                    contentLabel="Inline Styles Modal Example"
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
                        <Button variant="dark" size="sm" block onClick={this.changeName()}>
                            Save Changes
                        </Button>
                    </ButtonContainer>
                </Modal>

                {/*Modal for Password-Popup*/}
                <Modal
                    isOpen={this.state.showModalPassword}
                    contentLabel="Inline Styles Modal Example"
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
                                    this.handleInputChange('tempUsername', e.target.value);
                                }}/>
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                            <InputField
                                placeholder="Repeat Password"
                                onChange={e => {
                                    this.handleInputChange('tempUsername', e.target.value);
                                }}/>
                        </InputFieldWrapper>
                    </CredentialsPopupWrapper>
                    <ButtonContainer>
                        <Button variant="dark" size="sm" block onClick={this.changePassword()}>
                            Save Changes
                        </Button>
                    </ButtonContainer>
                </Modal>

            </Container>
        );
    }

    changeName() {

    }

    changePassword() {

    }
}

export default withRouter(ProfilePage);