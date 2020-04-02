import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';


const Chat = styled.div`
width: 507px;
height: 718px;
left: 65px;
top: 299px;
float: left;
padding: 15px;
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

                <Chat>

                    <h3>GLOBAL CHAT</h3>

                </Chat>


            </Container>
        );
    }
}

export default withRouter(MainPage);
