import { CART, CARTITEM, REMOVECARTITEM } from '../Types';
const intialState = {
    cart: 0,
    cartItem: [],
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case CART: {
            return {
                ...state,
                cart: state.cart + 1,
            }
        }
        case CARTITEM: {
            var newMyCart = [...state.cartItem];
            const index = newMyCart.findIndex(item => item.id == action.payload.id)
            if (index < 0) {
                newMyCart.push({ ...action.payload, quantity: 1 })
            }
            else {
                newMyCart[index].quantity += 1;
            }
            return {
                ...state,
                cartItem: newMyCart
            }
        }
        case REMOVECARTITEM: {
            var newMyCart = [...state.cartItem];
            newMyCart = newMyCart.filter(item => item.id != action.payload.id)
            return {
                ...state,
                cartItem: newMyCart,
                cart: state.cart - action.payload.quantity,
            }
        }
        
        default:
            return state

    }
}
export default reducer;