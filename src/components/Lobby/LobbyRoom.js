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
    constructor(props) {
        super(props);

        this.state = {
            lobbyName: this.props.location.state.lobbyName,
            lobbyId: this.props.location.state.lobbyId,
            lobbyPassword: this.props.location.state.lobbyPassword
        }
    }

    componentDidMount() {


        console.log(this);
    }


    render() {
        return (

            <Container>

                <h2> Lobby Name: {this.state.lobbyName}</h2>

                <h2> Lobby ID:  {this.state.lobbyId}  </h2>
                <div> Note: This is currently always set to 4. The Backend should return a free Lobby ID/Slot</div>

                <h3> Lobby Password: {this.state.lobbyPassword}</h3>

            </Container>
        );
    }
}

export default withRouter(LobbyRoom);
