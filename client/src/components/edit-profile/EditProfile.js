import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFiledGroup';
import TextAreaFieldGroup from '../common/TextAreaFiledGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile, getCurrentProfile } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
import isEmpty from "../../validation/is-empty";
import CreateProfile from '../create-profile/CreateProfile';
import { Link } from 'react-router-dom'

 class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: true,
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            errors:{} 
        }

        this.onChange =  this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,

            location: this.state.location,
            status: this.state.status,

            skills: this.state.skills,
            githubusername: this.state.githubusername,

            bio: this.state.bio,

            twitter: this.state.twitter,

            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }

        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');

            //if proflie field  does not exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.facebook= !isEmpty(profile.social.facebook ) ? profile.social.facebook : '';
            profile.youtube= !isEmpty(profile.social.youtube ) ? profile.social.youtube : '';
            profile.instagram= !isEmpty(profile.social.instagram ) ? profile.social.instagram : '';
            profile.twitter= !isEmpty(profile.social.twitter ) ? profile.social.twitter : '';
            profile.linkedin= !isEmpty(profile.social.linkedin ) ? profile.social.linkedin : '';

            // set component filed state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                instagram: profile.instagram,
                youtube: profile.youtube,
            })
        }

    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

  render() {
      
      const  { errors, displaySocialInputs } = this.state;

        // select options for status
      const options = [
          { label: '* Select Professional Status', value: 0},
          { label: 'Developer', value: 'Deverloper'},
          { label: 'Junior Developer', value: 'Junior Deverloper'},
          { label: 'Senior Developer', value: 'Senior Deverloper'},
          { label: 'Manager', value: 'Manager'},
          { label: 'Student or Learning', value: 'Student or Learning'},
          { label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
          { label: 'Intern', value: 'Intern'},
          { label: 'Other', value: 'Other'}
        ];

    let socialInputs;
    if(displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder = "Twitter profile URL"
                    name='twitter'
                    icon='fab fa-twitter'
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                ></InputGroup>

                <InputGroup
                    placeholder = "Facebook profile URL"
                    name='facebook'
                    icon='fab fa-facebook'
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                ></InputGroup>

                <InputGroup
                    placeholder = "Youtube Chanel URL"
                    name='youtube'
                    icon='fab fa-youtube'
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                ></InputGroup>

                <InputGroup
                    placeholder = "Instagram page URL"
                    name='instagram'
                    icon='fab fa-instagram'
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                ></InputGroup>

                <InputGroup
                    placeholder = "Linkedin profile URL"
                    name='linkedin'
                    icon='fab fa-linkedin'
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                ></InputGroup>

            </div>
        )
    } else {

    }

    return (
      <div className='create-profile'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <Link to='/dashboard' className='btn btn-light'>Go back</Link>
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                   
                    <small className="d-block pb-3">* =  reuquired filed</small>

                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info='A unique handle for your profile URL. Your full name, comany name, nickname'
                        ></TextFieldGroup>

                        <SelectListGroup
                            placeholder="* Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            error={errors.status}
                            options = {options}
                            info='Give us an idea where you arr at in yuour career'
                        ></SelectListGroup>

                        <TextFieldGroup
                            placeholder="* Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info='Could be your own company or one you work for'
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder="* Skilss"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                            info='Please use comma separated values(eg. HTML,CSS,JAvascript,PHP)'
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder="* Locaiton"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info='City or state suggested (eg. Boston, Na)'
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder="* Github Username"
                            name="githubusername"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={errors.githubusername}
                            info='If you want your latest repos and a Github link, include your username'
                        ></TextFieldGroup>

                        <TextAreaFieldGroup
                            placeholder="* Short bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info='Tell us a little about yourself'
                        ></TextAreaFieldGroup>

                        {/* <div className="mb-3">
                            <button 
                            onClick = {() => {
                                this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                }))
                            }}
                            className="btn btn-light">
                            Add Social Network Links
                            </button>
                            <span className="text-muted">Optional</span>
                        </div> */}
                        {
                            socialInputs
                        }
                        <input type="submit" value='submit' className='btn btn-info btn-block mt-4'/>
                    </form>


                </div>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propsTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile} )(withRouter(EditProfile))