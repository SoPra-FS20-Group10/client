import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyRoom from "../lobby/LobbyPage";
import Form from "react-bootstrap/Form";

/**
 * LobbylistEntry Model
 */


const ButtonContainer = styled.div`


`;

const LobbyContainer = styled.div`

float:left;
width: 100%;
background-color: rgb(90, 93, 99, 0.55);
margin-top: 10pt;
margin-bottom: 10pt;
`;


const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size:12pt;
  float: left;
  margin-left: 20%;
`;


class LeaderboardEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            index: this.props.index,
            history: this.props.history
        };
        this.goToProfilePage = this.goToProfilePage.bind(this)
    }

    componentDidMount() {
        this.setState({
            data: this.props.data,
            index: this.props.index,
            history: this.props.history
        })
    }

    goToProfilePage(){
        console.log(this.state.data.id)
        this.state.history.push({
            pathname: `/game/profile/${this.state.data.id}`,
            state: {
                playerId: this.state.data.id
            }
        });
    }
    render() {
        if (this.state.index % 2 == 0) {
            return (
                // <tr  class='text-white' key={id}>
                <tr className='dark' key={this.state.data.id} onClick={this.goToProfilePage}>
                    <td>{this.state.data.id}</td>
                    <td>{this.state.data.username}</td>
                    <td>{this.state.data.wonGames}</td>
                    <td>{this.state.data.winPercentage}</td>
                    <td>{this.state.data.overallScore}</td>
                    <td>{this.state.data.playtime}</td>
                </tr>

            )
        } else {
            return (
                <tr className='light' key={this.state.data.id} onClick={this.goToProfilePage}>
                    <td>{this.state.data.id}</td>
                    <td>{this.state.data.username}</td>
                    <td>{this.state.data.wonGames}</td>
                    <td>{this.state.data.winPercentage}</td>
                    <td>{this.state.data.overallScore}</td>
                    <td>{this.state.data.playtime}</td>
                </tr>
            )
        }
    }

}

export default LeaderboardEntry;

