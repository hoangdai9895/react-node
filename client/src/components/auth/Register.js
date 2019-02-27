import React, { Component } from 'react';

// import qs from 'qs';
// import classname from 'classname';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/textFiledGroup'
class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2
            }
            // console.log(JSON.stringify(newUser))

        // let data = qs.stringify(newUser);

        this.props.registerUser(newUser, this.props.history);
        // axios
        //     .post('/api/users/register', data,   {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //         }
        //     })
        //     .then(res => console.log(res.data))
        //     .catch(err => this.setState({errors: err.response.data}))

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        //   console.log(this.state.data)
        const { errors } = this.state;

        return ( 
        
        <div className = "register" >

            <div className = "container" >
            < div className = "row" >
            <div className = "col-md-8 m-auto" >
            <h1 className = "display-4 text-center" > Sign Up </h1> <p className = "lead text-center" > Create your DevConnector account </p> 
            <form noValidate onSubmit = { this.onSubmit } >
            <TextFieldGroup placeholder = "Name"
            name = "name"
            type = "name"
            value = { this.state.name }
            error = { errors.name }
            onChange = { this.onChange } >
            </TextFieldGroup>

            <TextFieldGroup placeholder = "Email"
            name = "email"
            type = "email"
            value = { this.state.email }
            error = { errors.email }
            onChange = { this.onChange }
            info = "This site uses Gravatar so if you want a profile image, use a Gravatar email" >
            </TextFieldGroup>

            <TextFieldGroup placeholder = "Password"
            name = "password"
            type = "password"
            value = { this.state.password }
            error = { errors.password }
            onChange = { this.onChange } >
            </TextFieldGroup>

            <TextFieldGroup placeholder = "Confirm password"
            name = "password2"
            type = "password"
            value = { this.state.password2 }
            error = { errors.password2 }
            onChange = { this.onChange } >
            </TextFieldGroup>

            <input type = "submit"
            className = "btn btn-info btn-block mt-4" />
            </form> </div > </div> </
            div > </div>

        )
    }
}

Register.propType = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

// export default Register