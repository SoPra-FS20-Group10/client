import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import ChatWindow from "./ChatWindow";
import LobbyList from "./Lobbylist";
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";
import {CloseButton} from "react-bootstrap";

// TODO: WORK IN PROGRESS!

const ChatWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 10%;
    margin-left: 5%;
    padding: 5%;
    width: 25%;
    height: 400pt; 
    background: grey;
    float:left;
`;

const LobbyWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 10%;
    margin-left: 5%;
    width: 60%;
    height: 400pt; 
    background: rgba(77, 77, 77, 0.5);
    float:left;
`;


const Container = styled(BaseContainer)`
    border-radius: 4pt;
    color: white;
    text-align: center;
`;



class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        };

        this.logoutUser = this.logoutUser.bind(this);
    }


    async logoutUser() {
        const requestBody = JSON.stringify({
            token: localStorage.getItem("token")
        });


        // Try to logout
        try {
            await api.patch("/users/" + localStorage.getItem("current"), requestBody);
            //remove local storage items & redirect to login
            localStorage.removeItem("current");
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            window.location.reload();


        }catch(error){
            alert(error);
        }
    }

    render() {
        return (
            <Container>


                <CloseButton onClick={this.logoutUser} style={{color: "white"}}/>
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

export default withRouter(Overview);
