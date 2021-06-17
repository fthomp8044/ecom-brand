import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
 } from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo },
        } = getState()
//taken in the token 
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
//user is the params of the userInfo data(email,username,password)
        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type:CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')



    } catch(error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo },
        } = getState()
//taken in the token 
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
//user is the params of the userInfo data(email,username,password)
        const {data} = await axios.get(
            `/api/orders/${id}/`,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo },
        } = getState()
//taken in the token 
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
//user is the params of the userInfo data(email,username,password)
        const {data} = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:ORDER_LIST_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo },
        } = getState()
//taken in the token 
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
//user is the params of the userInfo data(email,username,password)
        const {data} = await axios.get(
            `/api/orders/`,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:ORDER_LIST_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:ORDER_LIST_MY_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo },
        } = getState()
//taken in the token 
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
//user is the params of the userInfo data(email,username,password)
        const {data} = await axios.get(
            `/api/orders/myorders/`,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:ORDER_LIST_MY_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type:ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}
