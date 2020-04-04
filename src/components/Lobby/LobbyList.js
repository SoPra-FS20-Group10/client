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





class LobbyList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            LobbyID: null
        }
    }




    render() {
        return (

            <Container>

               <h2> LOBBY LIST </h2>

                    <Lobby lobbyId={1} history={this.props.history}>
                        Lobby1
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby lobbyId={2} history={this.props.history}>
                        Lobby2
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby lobbyId={3} history={this.props.history}>
                        Lobby3
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby lobbyId={4} history={this.props.history}>
                        Lobby4
                    </Lobby>


            </Container>
        );
    }
}

export default withRouter(LobbyList);
