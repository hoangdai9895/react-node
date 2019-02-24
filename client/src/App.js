import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : "bui hải yến"
    }
  }
  render() {
    return (
      <Router>
      <div className="App">
        <NavBar></NavBar>
        <Route exact path = '/' component ={Landing}></Route>
        <div className='container'>
          <Route exact path = '/register' component ={Register}></Route>
          <Route exact path = '/login' component ={Login}></Route>
        </div>
        <Footer></Footer>
      </div>
      </Router>
    );
  }
}

export default App;
