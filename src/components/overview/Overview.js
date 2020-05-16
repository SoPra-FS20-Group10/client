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
import Form from "react-bootstrap/Form";
import FakePiece from "../game/FakePiece";
import Modal from "react-modal";
import ListGroup from "react-bootstrap/ListGroup";


// TODO: WORK IN PROGRESS!
// Chat title

function Title() {
    return <p className="title">Lobby Chat</p>
}

const customStyles = {
        content: {

            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginTop:"300pt",
            transform: 'translate(-50%, -50%)',
            padding: "10pt",
            overflow: "scroll",
            height: "500pt",

            color: 'white',
            background: 'rgba(77, 77, 77, 0.5)'
        },
        bottom: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 36
        },
        elementtosticktobottom: {
            position: 'absolute',
            bottom: 0,
        }

    }
;
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
            message: "",
            showRules: false,
        };
        this.logoutUser = this.logoutUser.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.showSnackbar = this.showSnackbar.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.handleOpenRules=this.handleOpenRules.bind(this);
        this.handleCloseRules=this.handleCloseRules.bind(this);
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

    handleOpenRules() {
        this.setState({showRules: true});
    }

    handleCloseRules() {
        this.playSound(new Audio(subtleClick));
        this.setState({showRules: false});
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
                <Button variant="outline-light" size="lg" onClick={this.handleOpenRules}>
                    Open Rules
                </Button>
                <Modal
                    isOpen={this.state.showRules}
                    contentLabel="Inline Styles Modal GameBoard"
                    style={customStyles}
                >
                    <h1>Scrabble Rules</h1>

                    <ListGroup>
                        <ListGroup.Item variant="primary">The first player combines two or more of his or her letters to form a word and places it on the board to read either across or down with one letter on the center square. Diagonal words are not allowed.</ListGroup.Item>
                        <ListGroup.Item variant="primary">Complete your turn by counting and announcing your score for that turn. Then draw as many new letters as you played; always keep seven letters on your rack, as long as there are enough tiles left in the bag.</ListGroup.Item>
                        <ListGroup.Item variant="primary">Play passes to the left. The second player, and then each in turn, adds one or more letters to those already played to form new words. All letters played on a turn must be placed in one row across or down the board, to form at least one complete word. If, at the same time, they touch others letters in adjacent rows, those must also form complete words, crossword fashion, with all such letters. The player gets full credit for all words formed or modified on his or her turn.
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">New words may be formed by:
                            <ListGroup>
                                <ListGroup.Item variant="primary">Adding one or more letters to a word or letters already on the board.</ListGroup.Item>
                                <ListGroup.Item variant="primary">Placing a word at right angles to a word already on the board. The new word must use one of the letters already on the board or must add a letter to it. (See Turns 2, 3 and 4 below.)</ListGroup.Item>
                                <ListGroup.Item variant="primary">Placing a complete word parallel to a word already played so that adjacent letters also form complete words. (See Turn 5 in the Scoring Examples section below.)</ListGroup.Item>
                              </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">No tile may be shifted or replaced after it has been played and scored.
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">Blanks: The two blank tiles may be used as any letters. When playing a blank, you must state which letter it represents. It remains that letter for the rest of the game.
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">You may use a turn to exchange all, some, or none of the letters. To do this, place your discarded letter(s) facedown. Draw the same number of letters from the pool, then mix your discarded letter(s) into the pool. This ends your turn.
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">
                        Any play may be challenged before the next player starts a turn. If the play challenged is unacceptable, the challenged player takes back his or her tiles and loses that turn. If the play challenged is acceptable, the challenger loses his or her next turn. Consult the dictionary for challenges only. All words made in one play are challenged simultaneously. If any word is unacceptable, then the entire play is unacceptable. Only one turn is lost on any challenge.
                    </ListGroup.Item>
                        <ListGroup.Item variant="primary">The game ends when all letters have been drawn and one player uses his or her last letter; or when all possible plays have been made.
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="danger" size="sm" onClick={this.handleCloseRules}>
                        Close
                    </Button>


                </Modal>

            </Container>
        );
    }
}

export default withRouter(Overview);
