import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup  from '../common/textFiledGroup';
import  TextAreaFieldGroup  from '../common/TextAreaFiledGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEducation } from '../../actions/profileActions'


class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school: '',
            degree:"",
            fieldofstudy:"",
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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addEducation(eduData, this.props.history)

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
      <div className='add-education'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to='/dashboard' className='btn btn-light'>Go back</Link>
                    <h1 className="display-4 text-center">Add Education</h1>
                    <h1 className="lead text-center">Add any school that you have attended</h1>
                    <small className="d-block pb-3">
                        * = required field
                    </small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder = "* School"
                            name='school'
                            value={this.state.school}
                            onChange={this.onChange}
                            error={errors.school}
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder = "* Degree or Certification"
                            name='degree'
                            value={this.state.degree}
                            onChange={this.onChange}
                            error={errors.degree}
                        ></TextFieldGroup>

                        <TextFieldGroup
                            placeholder = "* Field of study"
                            name='fieldofstudy'
                            value={this.state.fieldofstudy}
                            onChange={this.onChange}
                            error={errors.fieldofstudy}
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
                            placeholder="Program Description"
                            type = "description"
                            name='description'
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                            info="Tell us about program that you were in"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation)) ;