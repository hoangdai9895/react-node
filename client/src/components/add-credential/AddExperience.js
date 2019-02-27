import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup  from '../common/textFiledGroup';
// import  TextAreaFieldGroup  from '../common/TextAreaFiledGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addExperience } from '../../actions/profileActions'


class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            title:"",
            location:"",
            from:"",
            to:"",
            current:false,
            description:"",
            errors:{},
            disabled:false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }


    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(expData, this.props.history)

    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
  render() {
    const  { errors } = this.state;



    return (
      <div className='add-experience'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to='/dashboard' className='btn btn-light'>Go back</Link>
                    <h1 className="display-4 text-center">Add Experience</h1>
                    <h1 className="lead text-center">Add any job or position that you have had  in the past or curretn</h1>
                    <small className="d-block pb-3">
                        * = required field
                    </small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder = "* Company"
                            name='company'
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder = "* Title"
                            name='title'
                            value={this.state.title}
                            onChange={this.onChange}
                            error={errors.title}
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder = "* Location"
                            name='location'
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                        ></TextFieldGroup>

                        <TextFieldGroup
                         placeholder = "* 11"
                            type = "date"
                            name='from'
                            value={this.state.from}
                            onChange={this.onChange}
                            error={errors.from}
                        ></TextFieldGroup>

                        <TextFieldGroup
                         placeholder = "* 11"
                            type = "date"
                            name='to'
                            value={this.state.to}
                            onChange={this.onChange}
                            error={errors.to}
                            disabled={this.state.disabled ? 'disabled' : ''}
                        ></TextFieldGroup>

                        <div className="form-check mg-4">
                            <input type="checkbox"
                                className='form-check-input'
                                name='current'
                                value={this.state.current}
                                checked={this.state.current}
                                onChange={this.onCheck}
                                id='current'
                            />
                            <label htmlFor="current" className='form-check-label'>
                                Current job
                            </label>
                        </div>
                        <TextFieldGroup
                            placeholder="Job Description"
                            type = "description"
                            name='description'
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                            info="Tell us more about the position"
                        ></TextFieldGroup>
                                                                                                                                                                                                                                                         
                            <input type="submit" className="btn btn-block btn-primary mt-4" value='submit'/>          
                    

                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience)) ;