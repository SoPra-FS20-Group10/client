import React, { Component } from "react";
import Header from "./views/Header";
import AppRouter from "./components/shared/routers/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */


const bgimage = styled.div`
   
    filter: blur(8px);
    -webkit-filter: blur(8px);

    /* Full height */
    height: 100%;
    background-image: url("background.png");
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

class App extends Component {
  render() {
    return (

        <div>

        <AppRouter />
        </div>


    );
  }
}

export default App;
