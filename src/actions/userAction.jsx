import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,


} from "../constants/userConstants";

import axios from 'axios';


export const login = (email, password) => async (dispatch) => {

  try {

    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/login`,
      { email, password },
      config
    );


    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.name);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: `${error.response.data.message || error.message}` });
  }
};


// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });


    const { data } = await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/register`, userData).catch(err => console.log(err));

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/me `, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('sdfds', data);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: `${error.response.data.message || error.message}` });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/logout`);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: `${error}` });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } };

    const { data } = await axios.put(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};




export const getAllUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: `${error.response.data.message || error.message}` });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: `${error.response.data.message || error.message}` });
  }
};



// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/users/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}