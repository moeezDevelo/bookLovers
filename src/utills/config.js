import { store } from '../Redux/index';
export const getUser = () => {
    return (store.getState().Auth.user)
}
export const getTracks = () => {
    return (store.getState().trackPlayer)
}