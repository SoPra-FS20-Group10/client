import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';

import { withRouter } from 'react-router-dom';
import Header from "../../views/Header";





class Profile extends React.Component {
    constructor() {
        super();

    }







    render() {
        return (

            <div>
                <Header height={"100"} />
            <BaseContainer>



               <h1>This is the profile page!</h1>
            </BaseContainer>

            </div>
        );
    }
}

export default withRouter(Profile);