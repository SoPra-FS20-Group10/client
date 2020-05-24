import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Header from "../../views/Header";
import NavigationBar from "../../views/NavigationBar";
import {api} from "../../helpers/api";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import subtleClick from "../../sounds/subtle_click.wav";
import Typography from "@material-ui/core/Typography";
import NameLengthChecker from "../shared/Other/NameLengthChecker";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import LeaderboardTable from "./LeaderboardTable";

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
    float:center;
`;

const TitleWrapper = styled.div`
    border-radius: 4pt;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15em;
    flex-flow: column wrap;
    
`;

const useStyleDropdown = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .btn-primary:focus': {
                backgroundColor: '#8064A2',
                borderColor: '#8064A2'
            }
        },
    }),
);


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
            this.timerID = setInterval(async () => {
                this.getUserData();
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    changeSortingComparator(comparator) {
        this.playSound(new Audio(subtleClick));
        this.setState({sortBy: `${comparator}`})
    }

    compareWins(a, b) {
        if (a.wonGames > b.wonGames) {
            return -1;
        }
        if (a.wonGames < b.wonGames) {
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

    comparePlayedGames(a, b) {
        if (a.playedGames > b.playedGames) {
            return -1;
        }
        if (a.playedGames < b.playedGames) {
            return 1;
        }
        return 0;
    }

    async getUserData() {
        let response = await api.get("/users");
        if (this.state.sortBy == 'Won Games') {
            this.setState({players: response.data.sort(this.compareWins)});
        } else if (this.state.sortBy == 'Overall Score') {
            this.setState({players: response.data.sort(this.compareOverallScore)});
        } else if (this.state.sortBy == 'Played Games') {
            this.setState({players: response.data.sort(this.comparePlayedGames)});
        }
    }

    renderTableHeader() {
        let header = ['Position', 'Name', 'Overall Score', 'Played Games', 'Won Games']
        // let header = Object.keys(this.state.data[0])

        return header.map((key, index) => {
            return <th class='text-white' key={index}>{key.toUpperCase()}</th>
        })
    }


    renderTable = (props = this.props.history) => {
        function goToProfilePage (id){
            props.push({
                    pathname: `/game/profile/${id}`,
                    state: {
                        playerId: id
                    }
            });
        }

        return(
            <LeaderboardTable data={this.state.players} func={goToProfilePage}/>
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
                <NavigationBar history={this.props} value={1} playerId={localStorage.getItem("current")}/>

                {/*Title*/}
                <TitleWrapper>
                    <Typography variant="h1" component="h2" style={{paddingTop:'0.3em'}}>
                        Leaderboard
                    </Typography>

                    <Typography variant="subtitle1" component="h3">
                        You can click on an Entry to go to the Persons Profile Page
                    </Typography>

                    <DropdownButton className={useStyleDropdown} style={{float: 'left', margin: 'auto'}} id="dropdown-item-button"
                                    title={this.state.sortBy}>
                        <Dropdown.Item as="button" onClick={() => this.changeSortingComparator('Overall Score')}>
                            Overall Score
                        </Dropdown.Item>

                        <Dropdown.Item as="button" onClick={() => this.changeSortingComparator('Played Games')}>
                            Played Games
                        </Dropdown.Item>

                        <Dropdown.Item as="button" onClick={() => this.changeSortingComparator('Won Games')}>
                            Won Games
                        </Dropdown.Item>
                    </DropdownButton>
                </TitleWrapper>

                {/*leaderboard*/}
                <LeaderboardWrapper>
                    {this.renderTable()}
                </LeaderboardWrapper>
            </Container>
        );
    }
}

export default withRouter(LeaderboardPage);
