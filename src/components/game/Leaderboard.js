import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';

import { withRouter } from 'react-router-dom';





class Leaderboard extends React.Component {
    constructor() {
        super();

    }


    render() {
        return (
            <BaseContainer>
                <h1>This is the Leaderboard page!</h1>
            </BaseContainer>
        );
    }
}

export default withRouter(Leaderboard);