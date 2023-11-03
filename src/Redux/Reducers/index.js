import Auth from './Auth';
import config from './config';
import Cart from './Cart';
import Comments from './Comments';
import trackPlayer from './trackPlayer';
import Explore from './Explore'
import Notification from './Notification'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    config: config,
    Cart: Cart,
    Comments: Comments,
    trackPlayer: trackPlayer,
    Explore: Explore,
    Notification: Notification
});
