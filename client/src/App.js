import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRouter';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credential/AddExperience';
import AddEducation from './components/add-credential/AddEducation';

// check for token
if(localStorage.jwtToken) {
  //  set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthorization
  store.dispatch(setCurrentUser(decoded));
  // check for expiredtoken
  const currentTime = Date.now()/ 1000;
  if(decoded.exp < currentTime) {
    //  logout user 
    store.dispatch(logoutUser());
    // todo: clear current use
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : "bui hải yến"
    }
  }
  render() {
    return (
      <Provider store={ store }>
        <Router>
        <div className="App">
          <NavBar></NavBar>
          <Route exact path = '/' component ={Landing}></Route>
          <div className='container'>
            <Route exact path = '/register' component ={Register}></Route>
            <Route exact path = '/login' component ={Login}></Route>
            <Switch>
              <PrivateRoute exact path ='/dashboard' component ={Dashboard}></PrivateRoute>
            </Switch>

            <Switch>
              <PrivateRoute exact path ='/create-profile' component ={CreateProfile}></PrivateRoute>
            </Switch>

            <Switch>
              <PrivateRoute exact path ='/edit-profile' component ={EditProfile}></PrivateRoute>
            </Switch>

            <Switch>
              <PrivateRoute exact path ='/add-experience' component ={AddExperience}></PrivateRoute>
            </Switch>

            <Switch>
              <PrivateRoute exact path ='/add-education' component ={AddEducation}></PrivateRoute>
            </Switch>


           
          </div>
          <Footer></Footer>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
