import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import ChatWindow from "../Overview/ChatWindow";
import LobbyList from "../Overview/LobbyList";

// TODO: WORK IN PROGRESS!

const ChatWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
padding: 5%;
width: 25%;
height: 400pt; 
background: grey;
float:left;
`;

const LobbyWrapper = styled.div`

margin-top: 10%;
margin-left: 5%;
width: 60%;
height: 400pt; 
background: rgba(255, 0, 0, 0.2);
float:left;
`;


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
 
`;



class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }


/*
    async componentDidMount() {
        try {
            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }
*/
    render() {
        return (
            <Container>

                <h2>MAIN MENU </h2>

                <ChatWrapper>
                    <h2>This would be the chat</h2>
                </ChatWrapper>

                <LobbyWrapper>
                    <LobbyList/>
                </LobbyWrapper>



            </Container>
        );
    }
}

export default withRouter(MainPage);
