import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';

import { withRouter } from 'react-router-dom';





class Profile extends React.Component {
    constructor() {
        super();

    }







    render() {
        return (
            <BaseContainer>
               <h1>This is the profile page!</h1>
            </BaseContainer>
        );
    }
}

export default withRouter(Profile);