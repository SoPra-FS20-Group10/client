import React, { Component } from "react";
import Header from "./views/Header";
import AppRouter from "./components/shared/routers/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (

      <div class ="bg-image">
        <Header height={"100"} />
        <AppRouter />
      </div>


    );
  }
}

export default App;
