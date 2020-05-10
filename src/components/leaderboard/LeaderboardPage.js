import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";
import {api} from "../../helpers/api";
import LeaderboardEntry from "./LeaderboardEntry";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import subtleClick from "../../sounds/subtle_click.wav";

const ButtonContainer = styled.div`
  width: 33.3%;
  float:left;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width:100%;
  margin:auto;
  
  // These style attributes make text unselectable on most browsers & versions
  user-select: none;
  -webkit-touch-callout: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none;
  -moz-user-select: none; 
  -ms-user-select: none;
`;


const LeaderboardWrapper = styled.div`
    border-radius: 4pt;
    margin-top: 10%;
    padding-bottom:4pt;
    margin: 10%;
    background: rgba(77, 77, 77, 0.5);
    float:center;
    padding-bottom:4pt;
`;

// TODO: All time, last month, last year....
// TODO: Make list sortable by enties
class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // just some example data for the leaderboard
            sortBy: 'Overall Score',
            playerId: this.props.location.state.playerId,
            players: [],
            data: [
                {id: 1, name: 'HOTCHILIEATER', wins: 1000, winPercentage: '59%', timePlayed: '370h'},
                {id: 2, name: 'Kortay', wins: 800, winPercentage: '54%', timePlayed: '320h'},
                {id: 3, name: 'xSchnipi', wins: 500, winPercentage: '62%', timePlayed: '240h'},
                {id: 4, name: 'M3TIS', wins: 420, winPercentage: '53%', timePlayed: '200h'}
            ]
        }
        this.getUserData = this.getUserData.bind(this);
    }

    componentDidMount() {
        this.getUserData();
        try {
            setInterval(async () => {
                this.getUserData();
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    changeSortingComparator(comparator) {
        this.playSound(new Audio(subtleClick));
        this.setState({sortBy: `${comparator}`})
    }

    compareWins(a, b) {
        if (a.wins > b.wins) {
            return -1;
        }
        if (a.wins < b.wins) {
            return 1;
        }
        return 0;
    }

    compareWinPercentage(a, b) {
        if (a.winPercentage > b.winPercentage) {
            return -1;
        }
        if (a.winPercentage < b.winPercentage) {
            return 1;
        }
        return 0;
    }

    compareOverallScore(a, b) {
        if (a.overallScore > b.overallScore) {
            return -1;
        }
        if (a.overallScore < b.overallScore) {
            return 1;
        }
        return 0;
    }

    compareTimePlayed(a, b) {
        if (a.timePlayed > b.timePlayed) {
            return -1;
        }
        if (a.timePlayed < b.timePlayed) {
            return 1;
        }
        return 0;
    }

    async getUserData() {
        let response = await api.get("/users");
        if(this.state.sortBy == 'Wins'){
            this.setState({players: response.data.sort(this.compareWins)});
        }else if(this.state.sortBy == 'Win %'){
            this.setState({players: response.data.sort(this.compareWinPercentage)});
        }else if(this.state.sortBy == 'Overall Score'){
            this.setState({players: response.data.sort(this.compareOverallScore)});
        }else if(this.state.sortBy == 'Time Played'){
            this.setState({players: response.data.sort(this.compareTimePlayed)});
        }
    }

    renderTableHeader() {
        let header = ['#', 'Name', 'Wins', 'Win %', 'Overall Score', 'Time Played']
        // let header = Object.keys(this.state.data[0])
        return header.map((key, index) => {
            return <th class='text-white' key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.players.map((data, index) => {
                return (
                    <LeaderboardEntry data={data} index={index} history={this.props.history}></LeaderboardEntry>
                )
            }
        )
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
                {/*Navigation Bar*/}
                <div className="bg-image"></div>
                <NavigationBar playerId={localStorage.getItem("current")}/>

                {/*leaderboard*/}
                <div>
                    <LeaderboardWrapper responsive>
                        <h1 >Leaderboard</h1>
                        {/*dropdown menu for selecting what stat to sort by*/}
                        <DropdownButton style={{float: 'left', margin: 'auto'}} id="dropdown-item-button" title={this.state.sortBy}>
                            <Dropdown.Item as="button"
                                           onClick={() => this.changeSortingComparator('Wins')}>Wins</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => this.changeSortingComparator('Win %')}>Win
                                %</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => this.changeSortingComparator('Overall Score')}>Overall
                                Score</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => this.changeSortingComparator('Time Played')}>Time
                                Played</Dropdown.Item>
                        </DropdownButton>


                        {/*rendering users*/}
                        <table class="table" id='leaderboard'>
                            <tbody block>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </LeaderboardWrapper>
                </div>


            </Container>
        );
    }
}

export default withRouter(LeaderboardPage);
