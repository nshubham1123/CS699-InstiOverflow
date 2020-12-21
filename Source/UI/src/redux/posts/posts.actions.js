/** 
 * @module redux/posts
 */


import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import {
    GET_POSTS,
    GET_POST,
    GET_TOP_POSTS,
    GET_TAG_POSTS,
    POST_ERROR,
    DELETE_POST,
    ADD_POST
} from './posts.types';

/**
 * Get All posts
 * @method  getPosts
 */
// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

/**
 * Get specific post
 * @method  getPost
 * @param {integer} id -Id of question
 */
// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
          console.log("postData",res.data);
        dispatch({
            type: GET_POST,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

/**
 * Get all questions of a course
 * @method  getTopPosts
 * @param {string} courseId -Id of course
 */
//GET TOP POSTS
export const getTopPosts = (courseId) => async dispatch => {
    try {
        console.log("courseId is ",courseId);
        const res = await axios.get(`/api/posts/top/${courseId}`);
        console.log("aaa",res.data);

        dispatch({
            type: GET_TOP_POSTS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//GET TOP POSTS OF COURSES
// export const getTopPosts = () => async dispatch => {
//     try {
//         const res = await axios.get('/api/posts/top');
//         console.log("aaa",res.data);

//         dispatch({
//             type: GET_TOP_POSTS,
//             payload: res.data.data
//         });
//     } catch (err) {
//         dispatch(setAlert(err.response.data.message, 'danger'));

//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };

//GET TAG POSTS

/**
 * Get quesions of a Tag
 * @method  getTagPosts
 * @param {string} tagName -tagName
 * @param {string} courseId-courseId of the course
 */
export const getTagPosts = (tagName,courseId) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/tag/${tagName}/${courseId}`);

        dispatch({
            type: GET_TAG_POSTS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


/**
 * Add Post
 * @method  addPost
 * @param {object} formdata-contains all the data title,data and body
 */
// Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        console.log("form Data is",formData)
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data.data
        });

        dispatch(setAlert(res.data.message, 'success'));

        dispatch(getPosts());
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

/**
 * Delete post
 * @method  deletePost
 * @param {integer} id -Id of question
 */
// Delete post
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};