import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants'
import axios from 'axios'


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
            '/api/user/login/'
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
            ? error.response.data.detailS
            : error.message,
         })
    }
}