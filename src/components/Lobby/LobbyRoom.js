import React from "react";

import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Lobby from "./Lobby";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
 
`;

const LobbyContainer = styled.div`



`;





class LobbyRoom extends React.Component {
    constructor() {
        super();
        this.state={
            lobbyID: null
        }
    }

    componentDidMount() {
        this.setState({
            lobbyID: this.props.lobbyID
        })
    }


    render() {
        return (

            <Container>

                <h2> Lobby ROom </h2>



            </Container>
        );
    }
}

export default withRouter(LobbyRoom);
