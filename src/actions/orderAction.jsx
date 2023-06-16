import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";
// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/orders/new`, order, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/orders/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/orders/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: UPDATE_ORDER_REQUEST });

    const { data } = await axios.put(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/orders/admin/${id}`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/orders/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: `${error.response.data.message || error.message}`,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};