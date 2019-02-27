import { GET_ERRORS, SET_CURRENT_USER } from './type';
import axios from 'axios';
import qs from 'qs';

import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
// Register
export
const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', qs.stringify(userData),   {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then(res =>{
            console.log(res.data)
            history.push('/login')
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Login: user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', qs.stringify(userData)) 
        .then(res => {
            // save to local storage
            const { token } = res.data;
            // set token to local storage
            localStorage.setItem("jwtToken", token);
            //Set token to Auth headers
            setAuthToken(token);
            // decode token to get userdata
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    
}

//set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


// log user out
export const logoutUser  = () => dispatch => {
    // remove token from localstorage
    localStorage.removeItem('jwtToken');
    // remove auth headers from axios
    setAuthToken(false);
    //  set current user to {} which will also set isAuthorization to fale
    dispatch(setCurrentUser({}))
}