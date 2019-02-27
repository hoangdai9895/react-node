import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
// import classname from 'classname';
import TextFieldGroup from '../common/textFiledGroup'



class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
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
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user);
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProp.errors) {
            this.setState({ errors: nextProp.errors })
        }
    }

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { errors } = this.state;
        // console.log(this.props)


        return ( <div className = "login" >
            <div className = "container" >
            <div className = "row" >
            <div className = "col-md-8 m-auto" >
            <h1 className = "display-4 text-center" > Log In </h1> <p className = "lead text-center" > Sign in to your DevConnector account </p> <form onSubmit = { this.onSubmit } >
            <TextFieldGroup placeholder = "Email Address"
            name = "email"
            type = "email"
            value = { this.state.email }
            error = { errors.email }
            onChange = { this.onChange } >
            </TextFieldGroup>

            <TextFieldGroup placeholder = "Password"
            name = "password"
            type = "password"
            value = { this.state.password }
            error = { errors.password }
            onChange = { this.onChange } >
            </TextFieldGroup>

            <input type = "submit"
            className = "btn btn-info btn-block mt-4" />
            </form> </div> </div> </div> </div>

        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(Login);