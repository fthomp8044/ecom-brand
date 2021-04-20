import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// getState is like useState 
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
// this dispatch removes the item we have in payload that matches id.
export const removeFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:id,
    })
// updating the localstorage with the deleted product taken off
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}