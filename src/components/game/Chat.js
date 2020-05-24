import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React from "react";
import "./styles/chat.css"
import subtleClick from "../../sounds/subtle_click.wav";
import {api} from "../../helpers/api";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            message: ""
        };
        this.handleChangeChat = this.handleChangeChat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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
            let response = await api.put("/chat", requestBody);
        } catch (error) {
            console.log(error);
        }

    }


    async getMessages() {
        try {
            let response = await api.get("/chat");
            this.setState({
                messages: response.data
            });
        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount(){
        // this.setState({
        //     messages: this.props.messages,
        // })

        this.getMessages()


        this.scrollToBottom();

        this.timerID = setInterval(() => {

            this.getMessages()
            // this.setState({
            //     messages: this.props.messages,
            // })

        }, 500);
    }

    handleChangeChat(e) {

        this.setState({
            message: e.target.value
        })
    }

    scrollToBottom = () => {
        // this.messagesEnd.scrollIntoView(true, { behavior: "smooth" , block: "end"});
    }

    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }


    componentWillUnmount() {
        clearInterval(this.timerID);
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

    render() {
        return (
            <Paper style={{height: 'auto', padding: '1em'}}>
                <Typography variant="subtitle1" component="h2">
                    Lobby Chat
                </Typography>
                <div style={{overflow: 'auto', height: '20em'}}>
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

                        <div style={{float: "left", clear: "both"}}
                             ref={(el) => {
                                 this.messagesEnd = el;
                             }}>
                        </div>
                    </ul>

                </div>

                <div>
                    <form
                        // onSubmit={this.handleSubmit}
                    >
                        <TextField
                            fullWidth
                            margin="normal"
                            id="standard-basic"
                            onChange={this.handleChangeChat}
                            value={this.state.message}
                            placeholder="Type your message and hit ENTER"
                            variant="outlined"
                        />
                    </form>
                </div>
            </Paper>)
    }
}


export default Chat;