import React from "react";

import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

import { ChatList } from 'react-chat-elements'
import { ChatItem } from 'react-chat-elements'

// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageBox } from 'react-chat-elements';
import Input from "@material-ui/core/Input";


class ChatWindow extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: null
        };
    }


    async componentDidMount() {

    }



    render() {
        return (

<div>

    <ChatList
        className='chat-list'
        dataSource={[
            {
                avatar: 'https://facebook.github.io/react/img/logo.svg',
                alt: 'Reactjs',
                title: 'Facebook',
                subtitle: 'What are you doing?',
                date: new Date(),
                unread: 0,
            }
            ]} />
    <Input
        placeholder="Type here..."
        multiline={true}
        rightButtons={
            <Button
                color='white'
                backgroundColor='black'
                text='Send'/>
        }/>


</div>
        );
    }
}

export default withRouter(ChatWindow);
