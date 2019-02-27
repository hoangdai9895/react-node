import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from  '../../actions/profileActions'
import Spinner from '../common/Spinner'
import  { Link } from 'react-router-dom';

import ProfileAction from './ProfileAciton';

import Experience from './Experience'
import Education from './Education';

class Dashboard extends Component {

componentDidMount() { 
    this.props.getCurrentProfile();
}
onDeleteClick(e) {
  console.log('delete account');
  this.props.deleteAccount();
}
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile
    let dashboardContent;
    if( profile== null || loading) {
      dashboardContent = <Spinner></Spinner>
    } else {
      // dashboardContent = <h1>Hello</h1>
      // check if logged user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
             <p className="lead text-muted">Welcome <Link to={`/proflie/${profile.handle}`}>{user.name}</Link> </p>
             <ProfileAction></ProfileAction>
             <Experience 
               experience = {profile.experience}
             ></Experience>
             <Education
                education = {profile.education}
             >
             </Education>
             {/* todo: exp and edu */}
             <div style={{ marginBottom: '60px'}}>
              <button className='btn btn-danger' onClick={this.onDeleteClick.bind(this)}>Delete my Account</button>
             </div>
          </div>
          
        )
      } else {
        // user is logged in but
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-info btn-lg '>Create Profile</Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  // deleteAcount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
