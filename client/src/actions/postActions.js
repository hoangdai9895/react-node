import axios from 'axios';
// import qs from 'qs';
import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST
} from './type'

// add post
export const addPost = postData => dispatch => {
    axios
        .post('/api/posts',postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err 
                // err.response.data
            })
        })
}

// Posts

export const getPosts = () => dispatch => {
    dispatch(setPostLoading())
    axios
        .get('/api/posts')
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
                // err.response.data
            })
        })
}

// Set loading state

export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// delete post
export const deletePost = (id) => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
                // err.response.data
            })
        })
}