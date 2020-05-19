import React from 'react';
import {withRouter} from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import subtleClick from "../sounds/subtle_click.wav";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    goToMainPage = () => {
        this.playSound(new Audio(subtleClick));
        this.props.history.push({
            pathname: '/game/overview',
            state: {
                playerId: this.props.playerId
            }
        });
    }

    goToLeaderboard = () => {
        this.playSound(new Audio(subtleClick));
        this.props.history.push({
            pathname: '/game/leaderboard',
            state: {
                playerId: this.props.playerId
            }
        });
    }

    goToProfile = () => {
        this.playSound(new Audio(subtleClick));
        this.props.history.push({
            pathname: `/game/profile/${this.props.playerId}`,
            state: {
                playerId: this.props.playerId
            }
        });
    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value: newValue})
        console.log(newValue)
        switch (newValue) {
            case 0:
                this.goToMainPage()
                break
            case 1:
                this.goToLeaderboard()
                break
            case 2:
                this.goToProfile()
                break
        }
    };
    
    render() {
        return (
            <Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Overview"/>
                    <Tab label="Leaderboard"/>
                    <Tab label="Profile"/>
                </Tabs>
            </Paper>
        );
    }
}

export default withRouter(NavigationBar);
