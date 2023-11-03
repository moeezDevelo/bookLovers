
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import Reducers from './Reducers/index';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist:['Auth']
}
const persistedReducer = persistReducer(persistConfig, Reducers)

    let store = createStore(persistedReducer,{}, applyMiddleware(ReduxThunk))
    let persistor = persistStore(store)
    export { store, persistor }

// const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
// export default store;