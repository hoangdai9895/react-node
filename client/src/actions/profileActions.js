import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './type';
// import qs from 'qs';

// get current profile

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })

        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}


//profile loading

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


//clear profile 

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

// create profile and update
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// delete account $ prolife

export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can not be un done')) {
        axios
            .delete('/api/profile')
            .then(res => {
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}


// add exprience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(err => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education', eduData)
        .then(err => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}



// delete experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`api/profile/experience/${id}`, id)
        .then(res => 
            dispatch({
                type:GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// delete education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`api/profile/education/${id}`, id)
        .then(res => 
            dispatch({
                type:GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}