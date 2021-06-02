import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from '../constants/orderConstants'
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

    } catch(error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}