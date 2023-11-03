import { CART,CARTITEM,REMOVECARTITEM } from '../Types';
export const cartCount = () => {
    return {
        type: CART,
    }
};
export const setCartItem = payload => {
    return {
        type: CARTITEM,
        payload: payload
    }
};
export const removeCartItem = payload => {
    return {
        type: REMOVECARTITEM,
        payload: payload
    }
};