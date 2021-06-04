import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

} from '../constants/userConstants'
import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
// this sends our password and username and gets back a token
        const {data} = await axios.post(
            '/api/users/login/',
            {'username':email, 'password': password},
            config
        )

//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })
//set data in the local storage when you login in
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}

//---------------LOGOUT USER------------------//


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type:USER_LOGOUT })
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}

//---------------REGISTER USER------------------//

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
// this sends our password and username and gets back a token
        const {data} = await axios.post(
            '/api/users/register/',
            {'name': name, 'email': email, 'password': password},
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })
//login the user as soon as soon as the user has register for an account
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })
//set data in the local storage when you login in
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}


//--------------- USER DETAILS------------------//


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(
            `/api/users/${id}/`,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}
// takes in user object data (username, email, password)
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo }
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
            `/api/users/profile/update/`,
            user,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}

// ---------------------Admin List User-------------------------//

export const listUsers = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })
// NEED to be logged in
        const {
            userLogin: { userInfo }
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
            `/api/users/`,
            config
        )
//if the post request above is successful i dispatch and send payload to the reducer
        dispatch({
            type:USER_LIST_SUCCESS,
            payload: data
        })


    } catch(error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        )

        dispatch({
            type:USER_DELETE_SUCCESS,
            payload: data
        })


    } catch(error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
         })
    }
}

