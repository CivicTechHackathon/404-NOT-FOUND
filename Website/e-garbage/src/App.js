import React, { Component } from 'react';
import './App.css';
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import Dashboard from "./components/User/Dashboard";
import Form from "./components/User/Form";
import SignUp1 from "./components/Vender/SignUp";
import SignIn1 from "./components/Vender/SignIn";
import Dashboard1 from "./components/Vender/Dashboard";


const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router history={customHistory}>
        <div>
          <Navbar />
          
          {/* <Home /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/User/SignUp" component={SignUp} />
          <Route exact path="/User/SignIn" component={SignIn} />
          <Route path="/User/Dashboard" component={Dashboard} />
          <Route path="/User/Form" component={Form} />
          <Route exact path="/Vender/SignUp" component={SignUp1} />
          <Route exact path="/Vender/SignIn" component={SignIn1} />
          <Route path="/Vender/Dashboard" component={Dashboard1} />
            {/*<Route path="/Meetings" component={Meetings} />
          <Route path="/Requests" component={Requests} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Picture" component={Picture} />
          <Route path="/Data" component={Data} /> */}
          {/* <Route path="/" Component={} />*/}
        </div> 
      </Router>
    </Provider>
    );
  }
}

export default App;
