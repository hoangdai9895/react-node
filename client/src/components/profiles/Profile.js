import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProflies } from '../../actions/profileActions'
import ProfileItem from './ProfileItem';

 class Profile extends Component {

    componentDidMount = () => {
      this.props.getProflies();
    }
    

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if(profiles === null || loading ) {
        profileItems = <Spinner></Spinner>
    } else {
        if(profiles.length > 0) {
            profileItems = profiles.map((profile, key) => (
                <ProfileItem
             
                    key={profile._id}
                    profile={profile}
                ></ProfileItem>
            ))
        } else {
            profileItems = <h4>No profiles found</h4>
        }
    }


    return (
      <div className='profiles'>
      <div className="container">
      <div className="row">
      <div className="col-md-12">
        <h1 className="display-4 text-center">Deverloper Profiles</h1>
        <p className="lead text-center">
        Browse and connect with deverlopers</p>
        {profileItems}
      </div></div>
      </div>
        
      </div>
    )
  }
}
Profile.propTypes = {
    getProflies: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    // profiles: state.profiles,
})

export default connect(mapStateToProps,  {getProflies})(Profile)
