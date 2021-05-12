import { CART_ADD_ITEM, 
        CART_REMOVE_ITEM, 
        CART_SAVE_SHIPPING_ADDRESS,
        CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'


export const cartReducer = (state = {cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            // check if product exist. (payload is the product data. x.product and item.product is the product._id)
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            // Replace the matching item with the new item which is existItem
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
// filter out the items in cartItems. The action.payload is the id of the product I want to remove. Filter keeps the products that match the id
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}