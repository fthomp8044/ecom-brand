import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

// getState is like useState 
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
<<<<<<< HEAD
=======

>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
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
<<<<<<< HEAD
=======

>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
}
// this dispatch removes the item we have in payload that matches id.
export const removeFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:id,
    })
// updating the localstorage with the deleted product taken off
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
<<<<<<< HEAD
}
=======

}

>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
export const saveShippingAddress = (data) => async (dispatch) => {
    
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))

}

export const savePaymentMethod = (data) => async (dispatch) => {
<<<<<<< HEAD

=======
    
>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))

<<<<<<< HEAD
} 
=======
}
>>>>>>> 8ed703b5daa57c2a27b843dc28b12cc0fab7857f
