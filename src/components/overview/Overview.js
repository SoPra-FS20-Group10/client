import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
// import {Button} from '../../views/design/Button';

import Button from 'react-bootstrap/Button'
import {withRouter} from 'react-router-dom';
import ChatWindow from "./ChatWindow";
import LobbyList from "./Lobbylist";
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";
import {CloseButton} from "react-bootstrap";
import {SnackbarAlert} from "../shared/Other/SnackbarAlert";
import "./styles/chat.css"

import subtleClick from '../../sounds/subtle_click.wav'


// TODO: WORK IN PROGRESS!
// Chat title

function Title() {
    return <p className="title">Lobby Chat</p>
}


const ChatWrapper = styled.div`

 border-radius: 4pt;
margin-top: 5%;
width: 25%;
height: 325pt; 
float:left;
`;


const LobbyWrapper = styled.div`
  
    margin-top: 5%;
    margin-left: 25%;
   
    margin-right: 5%;
    width: 70%;
    height: 400pt; 
    background: rgba(77, 77, 77, 0.5);
 
`;


const Container = styled(BaseContainer)`
  
  color: white;
  text-align: center;
  width: 100%
  max-width: none;
  margin-right: 2%;
  margin-left: 2%;
  overflow: hidden;

    // These style attributes make text unselectable on most browsers & versions
    user-select: none;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
`;


class Overview extends React.Component {
    audio = new Audio(subtleClick)
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            fromLogin: this.fromLogin(),
            messages: [],
            message: ""
        };
        this.logoutUser = this.logoutUser.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.showSnackbar = this.showSnackbar.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMessages = this.getMessages.bind(this);
        try {
            this.timerID = setInterval(async () => {
                this.getMessages();
            }, 500);
        } catch (e) {
            console.log(e);
        }
        console.log(this.props)
        if(this.props.history.location.state){
            this.deleteGame(this.props.history.location.state.deleteGame);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    async deleteGame(gameId) {
        try {
            console.log(gameId);
            await api.delete("/games/" + gameId);
        }catch(error){
            console.log(error);
        }
        }

    fromLogin() {
        if (localStorage.getItem("fromLogin") === "true") {

            localStorage.removeItem("fromLogin");
            console.log("removed");
            return true;
        }
        return false;
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
            localStorage.removeItem("currentGame");

            // TODO: Changed from reload to push("/login"), is that OK?
            // window.location.reload();
            this.props.history.push("/login")

        } catch (error) {
            console.log(error);
        }
    }


    handleCloseSnackbar() {
        this.setState({
            fromLogin: false,
        })
    }

    showSnackbar() {
        return SnackbarAlert({close: this.closeSnackbar, type: "good", message: "Logged in!"});
    }

    closeSnackbar() {
        this.handleCloseSnackbar();
    }

    // CHAT FUNCTIONALITY

    handleChange(e) {

        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        // play sound when sending message
        this.playSound(new Audio(subtleClick));

        e.preventDefault();
        this.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    async sendMessage(message) {

        try {
            const d = new Date();
            const n = d.getTime();
            const requestBody = JSON.stringify({
                username: localStorage.getItem("name"),
                time: n,
                message: message
            });
            let response = await api.put("/chat/", requestBody);
        } catch (error) {
            console.log(error);
        }

    }


    async getMessages() {
        try {
            let response = await api.get("chat/");
            this.setState({
                messages: response.data
            });
        } catch (error) {
            console.log(error);
        }

    }

    // Helper function to format date for the chat
    formatDate(date) {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        let formatedDate = hours + ":" + minutes;
        return formatedDate;
    }

     playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
    }


    render() {

        return (
            <Container>

                {this.state.fromLogin ? this.showSnackbar() : null}



                <ChatWrapper>
                    <Title/>
                    <ul className="message-list">
                        {this.state.messages.map((message, index) => {
                            let date = new Date(message.time);
                            let dateFormated = this.formatDate(date);
                            return (

                                <li className="message">
                                    <div>{message.username + " - " + dateFormated}</div>
                                    <div>{message.message}</div>


                                </li>
                            )
                        })}
                    </ul>
                    <form
                        onSubmit={this.handleSubmit}
                        className="send-message-form">
                        <input
                            onChange={this.handleChange}
                            value={this.state.message}
                            placeholder="Type your message and hit ENTER"
                            type="text"/>
                    </form>
                </ChatWrapper>


                <LobbyWrapper>

                    <LobbyList/>
                </LobbyWrapper>

                <Button type="button"  variant="danger" size="lg" onClick={ async (e) => {
                    await this.playSound(this.audio);
                    this.logoutUser();

                }} style={{color: "white", margin: "1em"}}>
                    Logout
                </Button>


            </Container>
        );
    }
}

export default withRouter(Overview);
