import React from "react";

import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Lobby from "../shared/models/Lobby";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  
 
`;

const LobbyContainer = styled.div`



`;





class LobbyList extends React.Component {
    constructor() {
        super();

    }




    render() {
        return (

            <Container>

               <h2> LOBBY LIST </h2>



                    <Lobby id={1}>
                        Lobby1
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby id={2}>
                        Lobby2
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby id={3}>
                        Lobby3
                    </Lobby>
                    <view style={{margin: 40}}/>
                    <Lobby id={4}>
                        Lobby4
                    </Lobby>


            </Container>
        );
    }
}

export default withRouter(LobbyList);
